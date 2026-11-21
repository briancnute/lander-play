// Shared Moon/Mars rover physics. SI metres and seconds; each world supplies gravity and terrain.
/** Shared SI driving engine. Rocket speeds and airborne corrections are
 * deliberate game abilities, not historical rover hardware performance. */
export const ROVER_DESCENT=Object.freeze({lowerMps:3,slamMps:9,heldAcceleration:6});
const DEFAULT_ROVER_TUNING = Object.freeze({
    // NASA Apollo 15 press kit, printed p80 / PDF p84:
    // https://www.nasa.gov/wp-content/uploads/static/apollo50th/pdf/A15_PressKit.pdf
    // Dimension drawing: 90in wheelbase, 72in track,
    // 32in diameter and 9in tire width. The collision envelope also covers steering.
    bodyLengthM: 3.0988, bodyWidthM: 2.0574, collisionLengthM: 3.14, collisionWidthM: 2.44,
    wheelbaseM: 2.286, wheelTrackM: 1.8288, wheelRadiusM: .4064, rideHeightM: .55,
    // Game traversal: ordinary rover travel stays faster than scooter turbo.
    gravity: 1.62, speedMps: 44.704, reverseMps: 5, acceleration: 10, boostAcceleration: 14,
    brakeAcceleration: 16, rollingResistance: .3, steeringRadians: .48,
    steeringYawRate: .85, steeringResponse: 7, steeringReturnResponse: 32,
    boostMultiplier: 1.35, doubleBoostMultiplier: 1.7, boostSeconds: 4, doubleBoostSeconds: 2,
    rechargeSeconds: 6, tapSeconds: .22, doubleTapSeconds: .33,
    rocketMps: 111.76, rocketAcceleration: 32, rocketSeconds: 8, rocketRunoutDeceleration: 32,
    rocketMaxSeconds: 60, rocketFastRechargeSeconds: 2, rocketFastRechargeDistanceM: 6000,
    rocketMinTripM: 600, rocketApproachM: 300, rocketEdgeStartM: 400, rocketEdgeCutoffM: 250,
    maxAirPitchRadians: Math.PI / 15, airPitchRate: .24,
    airStrafeAcceleration: 3, airStrafeMps: 8, airTurnRate: .8, airBrakeTurnRate: 1.2, airDownAcceleration: ROVER_DESCENT.heldAcceleration,
    // Deliberate double-Brake descent: 250 -> 100 mph over four seconds.
    airBrakeSeconds: 4, airBrakeDeceleration: 16.764,
    // Fictional ground adhesion acts only while wheels already have support.
    adhesionAcceleration: 16.2, adhesionMaxSlope: .32, adhesionRangeM: 1.35, adhesionMicroRangeM: .32, adhesionMaxDropM: 2,
    adhesionLookSeconds: .18, adhesionMinLookM: 4, adhesionMaxLookM: 9,
});
export function createRoverPhysics(overrides = {}) {
    const LRV_TUNING = Object.freeze({ ...DEFAULT_ROVER_TUNING, ...overrides });
    function newLRVDriving() {
        return {
            speedMps: 0, boostLevel: 0, boostRemaining: 0, boostEnergy: 1, grounded: true, pitch: 0, roll: 0, airPitch: 0, airYawRate: 0,
            steeringAngle: 0, wheelSpin: 0, wheelHeights: [0, 0, 0, 0], wheelOffsets: [0, 0, 0, 0], contactHeight: 0, airTime: 0,
            clock: 0, gasWasDown: false, gasDownAt: 0, lastShortRelease: -Infinity, triggerPress: false,
            inputQueue: [], usesQueuedInput: false, lastInputTime: -Infinity, inputGas: false, inputReverse: false, inputBrake: false,
            inputRawBrake: false, inputAirBrakeEligible: undefined, inputTrickIntent: false, inputGrounded: undefined,
            airBrakeRemaining: 0, brakeWasDown: false, brakeDownAt: 0, lastBrakeRelease: -Infinity, brakePressEligible: false,
            parked: true, initialized: false, airYaw: 0, takeoffPitch: 0, takeoffRoll: 0,
            rocketAvailable: false, rocketBoost: false, rocketCoasting: false, rocketThrust: 0,
            boostDurationSeconds: LRV_TUNING.boostSeconds, rocketReadySeconds: LRV_TUNING.rocketSeconds, rechargeSeconds: LRV_TUNING.rechargeSeconds,
        };
    }
    /** The caller clears held controls and mutable pose velocity when changing mode,
     * vehicle, photo or map. No armed tap or boost survives this reset. */
    function resetLRVDriving(state) {
        const { pitch, roll, wheelSpin, wheelHeights, wheelOffsets, contactHeight, grounded, boostEnergy, rocketCoasting, rocketReadySeconds, rechargeSeconds } = state;
        Object.assign(state, newLRVDriving(), { pitch, roll, wheelSpin, wheelHeights: [...wheelHeights], wheelOffsets: [...wheelOffsets], contactHeight, grounded, boostEnergy, rocketCoasting, rocketReadySeconds, rechargeSeconds, takeoffPitch: pitch, takeoffRoll: roll });
    }
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const toward = (v, target, amount) => v < target ? Math.min(target, v + amount) : Math.max(target, v - amount);
    const angleDifference = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
    const burstDuration = (state) => state.rocketBoost ? state.boostDurationSeconds : state.boostLevel === 2 ? LRV_TUNING.doubleBoostSeconds : LRV_TUNING.boostSeconds;
    /** One reserve/timer contract for physics and the compact HUD. */
    function lrvTurboStatus(state) {
        const c = LRV_TUNING, energy = clamp(state.boostEnergy, 0, 1);
        if (state.boostLevel) {
            const duration = burstDuration(state), seconds = Math.max(0, Math.min(state.boostRemaining, energy * duration));
            if (seconds > 1e-9)
                return { phase: 'active', level: state.boostLevel, seconds, fraction: seconds / duration };
        }
        return energy >= 1 - 1e-9 ? { phase: 'ready', level: 0, seconds: state.rocketAvailable ? state.rocketReadySeconds : c.boostSeconds, fraction: 1 }
            : { phase: 'charging', level: 0, seconds: (1 - energy) * state.rechargeSeconds, fraction: energy };
    }
    /** Long expedition legs get a useful single burn, rather than repeated short
     * pulses across kilometres. Free Ride retains its ordinary fixed reserve.
     * The approach/edge cutoffs still stop the engine independently of this budget. */
    function lrvTravelTiming(k, travel) {
        const c = LRV_TUNING, target = travel?.target;
        const distance = target ? Math.hypot(target.x - k.x, target.z - k.z) : 0;
        if (!Number.isFinite(distance) || distance < c.rocketMinTripM)
            return { rocketSeconds: c.rocketSeconds, rechargeSeconds: c.rechargeSeconds };
        const far = clamp((distance - c.rocketMinTripM) / (c.rocketFastRechargeDistanceM - c.rocketMinTripM), 0, 1);
        return { rocketSeconds: clamp((distance - c.rocketApproachM) / c.rocketMps + 2, c.rocketSeconds, c.rocketMaxSeconds),
            rechargeSeconds: c.rechargeSeconds + (c.rocketFastRechargeSeconds - c.rechargeSeconds) * far };
    }
    function updateTravel(state, k, travel) {
        const access = lrvRocketAccess(k, travel), timing = lrvTravelTiming(k, travel);
        state.rocketAvailable = access.available;
        state.rocketReadySeconds = timing.rocketSeconds;
        state.rechargeSeconds = timing.rechargeSeconds;
        return access;
    }
    /** Opt-in travel context keeps ordinary turbo independent of route guidance.
     * A wider start threshold avoids changing boost type near an approach. */
    function lrvRocketAccess(k, travel) {
        if (!travel)
            return { available: false, approaching: true };
        const c = LRV_TUNING, b = travel.bounds;
        const edge = Math.min(k.x - b.west, b.east - k.x, -k.z - b.south, b.north + k.z);
        const distance = travel.target ? Math.hypot(travel.target.x - k.x, travel.target.z - k.z) : Infinity;
        return { available: distance >= c.rocketMinTripM && edge >= c.rocketEdgeStartM,
            approaching: distance <= c.rocketApproachM || edge <= c.rocketEdgeCutoffM };
    }
    function cancelBoost(state) { state.boostLevel = 0; state.boostRemaining = 0; state.rocketBoost = false; state.rocketThrust = 0; }
    function clearBrakeGesture(state) { state.lastBrakeRelease = -Infinity; state.brakePressEligible = false; }
    /** Capture edges independently of rendering. Short native taps must survive even
     * when down/up/down all arrive before the next physics frame. Repeats and extra
     * fingers leave the aggregate held state unchanged and cannot manufacture taps. */
    function queueLRVInput(state, input) {
        if (!Number.isFinite(input.time) || input.time < 0 || input.time < state.lastInputTime)
            return false;
        if (!state.usesQueuedInput) {
            // A pure caller may have already polled held Go before native capture begins.
            // Keep the physical hold, but never compare its simulation-clock tap timing
            // with DOM event time or turn the first native release into a phantom tap.
            state.inputGas = state.gasWasDown;
            state.lastShortRelease = -Infinity;
            state.triggerPress = true;
            state.inputRawBrake = state.brakeWasDown;
            clearBrakeGesture(state);
        }
        state.lastInputTime = input.time;
        state.usesQueuedInput = true;
        const rawBrake = input.rawBrake ?? input.brake, trickIntent = !!input.trickIntent;
        if (input.gas === state.inputGas && input.reverse === state.inputReverse && input.brake === state.inputBrake
            && rawBrake === state.inputRawBrake && input.airBrakeEligible === state.inputAirBrakeEligible
            && trickIntent === state.inputTrickIntent && input.grounded === state.inputGrounded)
            return false;
        state.inputGas = input.gas;
        state.inputReverse = input.reverse;
        state.inputBrake = input.brake;
        state.inputRawBrake = rawBrake;
        state.inputAirBrakeEligible = input.airBrakeEligible;
        state.inputTrickIntent = trickIntent;
        state.inputGrounded = input.grounded;
        if (state.inputQueue.length >= 64) {
            // Discard an overfull gesture history rather than interpreting a truncated
            // sequence as a fresh double tap. Remember only the current aggregate hold.
            state.inputQueue.length = 0;
            state.gasWasDown = input.gas;
            state.gasDownAt = input.time;
            state.lastShortRelease = -Infinity;
            state.triggerPress = true;
            cancelBoost(state);
            state.brakeWasDown = rawBrake;
            state.airBrakeRemaining = 0;
            clearBrakeGesture(state);
            return false;
        }
        state.inputQueue.push({ ...input });
        return true;
    }
    /** Only physical Brake edges count. Changing direction while Brake is held
     * may change its routed meaning, but cannot invent a release and second tap. */
    function airBrakeEdges(state, controls, grounded, time = state.clock) {
        let downSpeed = 0;
        const c = LRV_TUNING, held = controls.rawBrake ?? controls.brake;
        const trick = !!controls.trickIntent || (held && !!controls.steer);
        const eligible = !grounded && !trick && !controls.reverse && (controls.airBrakeEligible ?? true);
        const freshGo = controls.gas && !state.gasWasDown;
        if (grounded || trick || controls.reverse || freshGo) {
            state.airBrakeRemaining = 0;
            clearBrakeGesture(state);
        }
        else if (!eligible)
            clearBrakeGesture(state);
        if (held && !state.brakeWasDown) {
            state.brakeDownAt = time;
            state.brakePressEligible = eligible && !freshGo;
            if (eligible)
                downSpeed = ROVER_DESCENT.lowerMps;
            if (state.brakePressEligible && time - state.lastBrakeRelease <= c.doubleTapSeconds) {
                if (state.airBrakeRemaining <= 0) {
                    state.airBrakeRemaining = c.airBrakeSeconds;
                    cancelBoost(state);
                    downSpeed = ROVER_DESCENT.slamMps;
                }
                // A third tap or a held/repeated second press cannot renew the maneuver.
                state.brakePressEligible = false;
            }
            state.lastBrakeRelease = -Infinity;
        }
        else if (!held && state.brakeWasDown) {
            state.lastBrakeRelease = eligible && state.brakePressEligible && time - state.brakeDownAt <= c.tapSeconds ? time : -Infinity;
            state.brakePressEligible = false;
        }
        state.brakeWasDown = held;
        return downSpeed;
    }
    function boostEdges(state, controls, time = state.clock) {
        const c = LRV_TUNING, gas = controls.gas, blocked = controls.brake || controls.reverse;
        if (blocked) {
            cancelBoost(state);
            state.lastShortRelease = -Infinity;
            state.triggerPress = true;
        }
        if (gas && !state.gasWasDown) {
            state.gasDownAt = time;
            state.triggerPress = blocked;
            if (!blocked && time - state.lastShortRelease <= c.doubleTapSeconds) {
                if (state.boostLevel === 0 && state.boostEnergy >= 1 - 1e-9) {
                    state.boostLevel = 1;
                    state.rocketBoost = state.rocketAvailable;
                    state.boostDurationSeconds = state.rocketBoost ? state.rocketReadySeconds : c.boostSeconds;
                    state.boostRemaining = state.boostDurationSeconds;
                    if (state.rocketBoost)
                        state.rocketCoasting = true;
                }
                else if (state.boostLevel === 1 && !state.rocketBoost && state.boostEnergy > 0) {
                    state.boostLevel = 2;
                    state.boostRemaining = Math.min(state.boostRemaining, c.doubleBoostSeconds);
                }
                state.triggerPress = true;
            }
            state.lastShortRelease = -Infinity;
        }
        else if (!gas && state.gasWasDown) {
            state.lastShortRelease = !state.triggerPress && !blocked && time - state.gasDownAt <= c.tapSeconds ? time : -Infinity;
            state.triggerPress = false;
        }
        state.gasWasDown = gas;
    }
    function support(surface, x, z, heading) {
        const c = LRV_TUNING, f = { x: Math.sin(heading), z: Math.cos(heading) }, r = { x: Math.cos(heading), z: -Math.sin(heading) };
        const halfLength = c.wheelbaseM / 2, halfTrack = c.wheelTrackM / 2;
        const positions = [[-halfTrack, halfLength], [halfTrack, halfLength], [-halfTrack, -halfLength], [halfTrack, -halfLength]];
        const heights = positions.map(([u, v]) => surface.height(x + r.x * u + f.x * v, z + r.z * u + f.z * v));
        if (!heights.every(Number.isFinite))
            throw Error('LRV wheel contact requires finite terrain.');
        const mean = heights.reduce((sum, h) => sum + h, 0) / 4;
        const forwardSlope = (heights[0] + heights[1] - heights[2] - heights[3]) / (2 * c.wheelbaseM);
        const rightSlope = (heights[1] + heights[3] - heights[0] - heights[2]) / (2 * c.wheelTrackM);
        const residuals = heights.map((h, i) => h - mean - positions[i][0] * rightSlope - positions[i][1] * forwardSlope);
        // A non-planar four-point support uses suspension travel. Lift the chassis
        // only for relief beyond that travel, rather than driving a wheel underground.
        const lift = Math.max(0, ...residuals.map(h => h - .18));
        return { height: mean + lift + c.rideHeightM, pitch: Math.atan(forwardSlope), roll: Math.atan(rightSlope), forwardSlope, rightSlope, heights,
            offsets: residuals.map(h => clamp(h - lift, -.18, .18)) };
    }
    /** Swept oriented rectangle against solid boxes or convex footprints. The final orientation is used
     * at both endpoints; overlap resolution also catches turning into a flag. */
    function collideLRV(k, from, surface) {
        const c = LRV_TUNING, f = { x: Math.sin(k.heading), z: Math.cos(k.heading) }, r = { x: Math.cos(k.heading), z: -Math.sin(k.heading) };
        const axes = [{ x: 1, z: 0 }, { x: 0, z: 1 }, f, r], dx = k.x - from.x, dz = k.z - from.z;
        let earliest = Infinity, hit, normal = { x: 0, z: 0 }, overlapDepth = 0;
        for (const solid of surface.solids) {
            if (solid.y !== undefined && solid.hy !== undefined
                && (Math.min(k.y, from.y) - c.rideHeightM > solid.y + solid.hy || Math.max(k.y, from.y) + 1.4 < solid.y - solid.hy))
                continue;
            let enter = -Infinity, leave = Infinity, entryNormal = { x: 0, z: 0 }, inside = true, minDepth = Infinity, pushNormal = { x: 0, z: 0 }, valid = true;
            const solidAxes=solid.polygon?[...axes,...solid.polygon.map((p,i)=>{
                const q=solid.polygon[(i+1)%solid.polygon.length],dx=q.x-p.x,dz=q.z-p.z,length=Math.hypot(dx,dz)||1;
                return {x:-dz/length,z:dx/length};
            })]:axes;
            for (const axis of solidAxes) {
                let half = c.collisionLengthM / 2 * Math.abs(axis.x * f.x + axis.z * f.z) + c.collisionWidthM / 2 * Math.abs(axis.x * r.x + axis.z * r.z) + solid.hx * Math.abs(axis.x) + solid.hz * Math.abs(axis.z);
                let start = (from.x - solid.x) * axis.x + (from.z - solid.z) * axis.z;
                const delta = dx * axis.x + dz * axis.z;
                if(solid.polygon){
                    const projected=solid.polygon.map(p=>p.x*axis.x+p.z*axis.z),lo=Math.min(...projected),hi=Math.max(...projected);
                    half=c.collisionLengthM/2*Math.abs(axis.x*f.x+axis.z*f.z)+c.collisionWidthM/2*Math.abs(axis.x*r.x+axis.z*r.z)+(hi-lo)/2;
                    start=from.x*axis.x+from.z*axis.z-(hi+lo)/2;
                }
                if (Math.abs(start) >= half)
                    inside = false;
                const depth = half - Math.abs(start);
                if (depth < minDepth) {
                    minDepth = depth;
                    const sign = start >= 0 ? 1 : -1;
                    pushNormal = { x: axis.x * sign, z: axis.z * sign };
                }
                if (Math.abs(delta) < 1e-12) {
                    if (Math.abs(start) > half) {
                        valid = false;
                        break;
                    }
                }
                else {
                    const a = (-half - start) / delta, b = (half - start) / delta, t = Math.min(a, b);
                    if (t > enter) {
                        enter = t;
                        const sign = delta > 0 ? -1 : 1;
                        entryNormal = { x: axis.x * sign, z: axis.z * sign };
                    }
                    leave = Math.min(leave, Math.max(a, b));
                    if (enter > leave) {
                        valid = false;
                        break;
                    }
                }
            }
            if (!valid)
                continue;
            if (inside && minDepth > 0) {
                earliest = 0;
                hit = solid;
                normal = pushNormal;
                overlapDepth = minDepth;
                break;
            }
            if (enter >= -1e-8 && enter <= 1 && leave >= 0 && enter < earliest) {
                earliest = Math.max(0, enter);
                hit = solid;
                normal = entryNormal;
                overlapDepth = 0;
            }
        }
        if (!hit)
            return false;
        // Tiny separation keeps a held throttle resting at contact instead of cycling
        // through a visible millimetre-scale accelerate/collide gap every few frames.
        k.x = from.x + dx * earliest + normal.x * (overlapDepth + .00001);
        k.z = from.z + dz * earliest + normal.z * (overlapDepth + .00001);
        const inward = k.vx * normal.x + k.vz * normal.z;
        if (inward < 0) {
            k.vx -= inward * normal.x;
            k.vz -= inward * normal.z;
        }
        k.lastHit = hit.id ?? 'solid';
        return true;
    }
    /** Keep wheel lock within the useful yaw range before smoothing. Otherwise a
     * high-speed tap stores excess angle behind the yaw cap and keeps turning at
     * full rate after release. Neutral/countersteering responds faster than turn-in.
     * Airborne wheels use the same limit so touchdown cannot restore excess lock. */
    function updateSteering(state, k, steer, speed, dt) {
        const c = LRV_TUNING;
        const limit = Math.min(c.steeringRadians, Math.atan(c.steeringYawRate * c.wheelbaseM / Math.max(.001, Math.abs(speed))));
        state.steeringAngle = clamp(state.steeringAngle, -limit, limit);
        const target = steer * limit;
        const returning = target * state.steeringAngle < 0 || Math.abs(target) < Math.abs(state.steeringAngle);
        const response = returning ? c.steeringReturnResponse : c.steeringResponse;
        state.steeringAngle += (target - state.steeringAngle) * (1 - Math.exp(-dt * response));
        k.steer = state.steeringAngle;
    }
    function integrate(state, k, input, dt, surface) {
        const c = LRV_TUNING;
        if (k.grounded || input.trickIntent || input.reverse) {
            state.airBrakeRemaining = 0;
            clearBrakeGesture(state);
        }
        const airBrakeTime = Math.min(dt, state.airBrakeRemaining);
        if (airBrakeTime > 0)
            cancelBoost(state);
        const access = updateTravel(state, k, surface.rocketTravel);
        if (state.rocketBoost && access.approaching)
            cancelBoost(state);
        if (state.boostLevel) {
            state.boostRemaining = Math.max(0, state.boostRemaining - dt);
            state.boostEnergy = Math.max(0, state.boostEnergy - dt / burstDuration(state));
            if (state.boostRemaining === 0 || state.boostEnergy < 1e-9)
                cancelBoost(state);
        }
        else
            state.boostEnergy = Math.min(1, state.boostEnergy + dt / state.rechargeSeconds);
        state.rocketThrust = state.rocketBoost && input.gas && !input.brake && !input.reverse ? 1 : 0;
        if (state.rocketCoasting && !state.rocketBoost && k.grounded) {
            // Tires ease back toward cruise once supported. In flight the Moon's lack
            // of drag preserves horizontal momentum, including after an approach or
            // boundary engine cutoff; the player still owns steering and descent.
            const speed = Math.hypot(k.vx, k.vz);
            if (speed > c.speedMps) {
                const next = Math.max(c.speedMps, speed - c.rocketRunoutDeceleration * dt);
                k.vx *= next / speed;
                k.vz *= next / speed;
            }
            else
                state.rocketCoasting = false;
        }
        // Input +1 means screen-right. The chase view looks along local +Z, so
        // screen-right turns toward local -X: wheel/heading yaw must be negative.
        // Convert once here so steering animation, strafing and airborne turns agree.
        const steer = -clamp(Number.isFinite(input.steer) ? input.steer : 0, -1, 1);
        const oldSupport = support(surface, k.x, k.z, k.heading), wasGrounded = k.grounded;
        // Resuming after clearInput must preserve the displayed suspension attitude.
        // Explicit placement uses settleLRVDriving; only motion/parking needs resync.
        if (!state.initialized) {
            state.initialized = true;
            state.parked = k.grounded && Math.hypot(k.vx, k.vz) < .08;
        }
        const from = { x: k.x, y: k.y, z: k.z, vy: k.vy };
        let crestAcceleration = 0;
        if (wasGrounded) {
            const forward = k.vx * Math.sin(k.heading) + k.vz * Math.cos(k.heading);
            const brake = input.brake || (input.gas && input.reverse), gas = input.gas && !brake && !input.reverse, reverse = input.reverse && !brake;
            if (gas || reverse)
                state.parked = false;
            let speed = forward;
            if (state.parked && !gas && !reverse)
                speed = 0;
            else if (brake)
                speed = toward(speed, 0, c.brakeAcceleration * dt);
            else if (gas)
                speed = toward(speed, state.rocketBoost ? c.rocketMps : c.speedMps * (state.boostLevel === 2 ? c.doubleBoostMultiplier : state.boostLevel === 1 ? c.boostMultiplier : 1), (state.rocketBoost ? c.rocketAcceleration : state.boostLevel ? c.boostAcceleration : c.acceleration) * dt);
            else if (reverse)
                speed = toward(speed, -c.reverseMps, (speed > 0 ? c.brakeAcceleration : c.acceleration) * dt);
            else
                speed = toward(speed, 0, c.rollingResistance * dt);
            if (!state.parked && !brake)
                speed -= c.gravity * oldSupport.forwardSlope / (1 + oldSupport.forwardSlope ** 2) * dt;
            const poweredLimit = state.rocketBoost ? c.rocketMps : c.speedMps * (state.boostLevel === 2 ? c.doubleBoostMultiplier : state.boostLevel === 1 ? c.boostMultiplier : 1);
            // Expiring boost eases back toward ordinary speed; it must not remove several
            // metres/second in a single frame. Braking remains the deliberate quick stop.
            speed = clamp(speed, -c.reverseMps, Math.max(poweredLimit, forward));
            if ((brake || (!gas && !reverse)) && Math.abs(speed) < .08) {
                speed = 0;
                state.parked = true;
            }
            // Speed-dependent steering and a low yaw limit give the LRV a deliberate
            // wheel-driven turn; it cannot pivot in place like a scooter.
            updateSteering(state, k, steer, speed, dt);
            const yaw = clamp(Math.tan(state.steeringAngle) * speed / c.wheelbaseM, -c.steeringYawRate, c.steeringYawRate);
            k.heading += yaw * dt;
            k.vx = Math.sin(k.heading) * speed;
            k.vz = Math.cos(k.heading) * speed;
            if (state.parked)
                k.vy = 0;
            else {
                // The four-wheel support height has its own derivative. The chassis plane
                // angle is not that derivative on curved or triangulated terrain. Confusing
                // them produces many tiny false hops, particularly inside a crater bowl.
                const probe = .75, magnitude = Math.abs(speed), dx = Math.sin(k.heading) * Math.sign(speed), dz = Math.cos(k.heading) * Math.sign(speed);
                const ahead = support(surface, k.x + dx * probe, k.z + dz * probe, k.heading).height;
                const behind = support(surface, k.x - dx * probe, k.z - dz * probe, k.heading).height;
                const current = support(surface, k.x, k.z, k.heading).height;
                k.vy = (ahead - behind) / (2 * probe) * magnitude;
                crestAcceleration = (ahead - 2 * current + behind) / (probe * probe) * magnitude * magnitude;
            }
        }
        else {
            state.parked = false;
            updateSteering(state, k, steer, Math.hypot(k.vx, k.vz), dt);
            const turning = input.gas || input.brake;
            state.airYawRate = turning ? steer * (input.brake ? c.airBrakeTurnRate : c.airTurnRate) : 0;
            const turn = state.airYawRate * dt;
            if (turn) {
                // Fictional course control rotates both chassis and existing momentum.
                // It adds no horizontal speed and cannot become an airborne engine boost.
                const cos = Math.cos(turn), sin = Math.sin(turn), vx = k.vx, vz = k.vz;
                k.heading += turn;
                state.airYaw += turn;
                k.vx = vx * cos + vz * sin;
                k.vz = vz * cos - vx * sin;
            }
            else if (!turning && steer) {
                // Direction alone translates sideways without changing the nose. Bound
                // only the impulse we add; retain any faster pre-existing lateral inertia.
                const rightX = Math.cos(k.heading), rightZ = -Math.sin(k.heading), side = k.vx * rightX + k.vz * rightZ;
                const direction = Math.sign(steer), available = Math.max(0, c.airStrafeMps - side * direction);
                const change = direction * Math.min(available, Math.abs(steer) * c.airStrafeAcceleration * dt);
                k.vx += rightX * change;
                k.vz += rightZ * change;
            }
            const pitchInput = input.reverse || input.brake ? -1 : input.gas ? 1 : 0;
            state.airPitch = clamp(state.airPitch + pitchInput * c.airPitchRate * dt, -c.maxAirPitchRadians, c.maxAirPitchRadians);
            if (state.boostLevel && input.gas && !input.brake && !input.reverse) {
                const speed = Math.hypot(k.vx, k.vz), limit = state.rocketBoost ? c.rocketMps : c.speedMps * (state.boostLevel === 2 ? c.doubleBoostMultiplier : c.boostMultiplier);
                // Turbo accelerates along the existing trajectory (the nose if stationary).
                // It never adds upward velocity or clips faster pre-existing momentum.
                if (speed < limit) {
                    const next = Math.min(limit, speed + (state.rocketBoost ? c.rocketAcceleration : c.boostAcceleration) * dt);
                    if (speed > 1e-8) {
                        k.vx *= next / speed;
                        k.vz *= next / speed;
                    }
                    else {
                        k.vx = Math.sin(k.heading) * next;
                        k.vz = Math.cos(k.heading) * next;
                    }
                }
            }
            if (airBrakeTime > 0) {
                const speed = Math.hypot(k.vx, k.vz);
                // An explicit maneuver removes horizontal momentum, with no acceleration
                // toward the floor when already slower and no drag after its timer ends.
                if (speed > c.speedMps) {
                    const next = Math.max(c.speedMps, speed - c.airBrakeDeceleration * airBrakeTime);
                    k.vx *= next / speed;
                    k.vz *= next / speed;
                }
            }
        }
        k.x += k.vx * dt;
        k.z += k.vz * dt;
        let nextSupport = support(surface, k.x, k.z, k.heading);
        const travel = Math.hypot(k.x - from.x, k.z - from.z), drop = oldSupport.height - nextSupport.height;
        const ledge = wasGrounded && -drop > .18 + travel * .6;
        if (ledge) {
            // A sudden high step cannot teleport a supported chassis through a wall.
            k.x = from.x;
            k.z = from.z;
            k.y = from.y;
            k.vx = k.vz = k.vy = 0;
            state.parked = true;
            nextSupport = oldSupport;
        }
        const abruptDrop = wasGrounded && !ledge && drop > .18 + travel * .35;
        if (abruptDrop)
            k.vy = from.vy; // Do not use a tangent probe that straddled a cliff.
        // Held Brake provides manual downthrust; its airborne double tap provides
        // the same bounded force for four seconds without requiring a continued hold.
        // They share one thruster and never stack forces.
        const downFraction = !wasGrounded ? (input.brake ? 1 : airBrakeTime / dt) : 0;
        const downwardAcceleration = c.gravity + c.airDownAcceleration * downFraction;
        const predicted = k.y + k.vy * dt - .5 * downwardAcceleration * dt * dt;
        const crestDeparture = wasGrounded && !state.parked && Math.hypot(k.vx, k.vz) > 1 && crestAcceleration < -c.gravity * 1.15 && predicted > nextSupport.height + .00001;
        // At game travel speeds, tiny triangulation/suspension changes can create
        // millimetre-high, few-frame flights. Keep wheel contact through those; a
        // genuine crest must predict useful clearance just ahead of the chassis.
        const clearanceAhead = (time) => {
            const elapsed = dt + time;
            return k.y + k.vy * elapsed - .5 * c.gravity * elapsed * elapsed
                - support(surface, k.x + k.vx * time, k.z + k.vz * time, k.heading).height;
        };
        const departure = crestDeparture && clearanceAhead(.06) > 0 && clearanceAhead(.2) > .025;
        let attached = false;
        if (departure && !abruptDrop
            && Math.hypot(oldSupport.forwardSlope, oldSupport.rightSlope) <= c.adhesionMaxSlope
            && Math.hypot(nextSupport.forwardSlope, nextSupport.rightSlope) <= c.adhesionMaxSlope
            && predicted - nextSupport.height <= .2) {
            const speed = Math.hypot(k.vx, k.vz), distance = clamp(speed * c.adhesionLookSeconds, c.adhesionMinLookM, c.adhesionMaxLookM);
            attached = true;
            let maxSeparation = 0;
            for (const fraction of [1 / 3, 2 / 3, 1]) {
                const time = distance * fraction / speed, elapsed = dt + time;
                const ahead = support(surface, k.x + k.vx * time, k.z + k.vz * time, k.heading);
                const separation = k.y + k.vy * elapsed - .5 * c.gravity * elapsed * elapsed - ahead.height;
                maxSeparation = Math.max(maxSeparation, separation);
                if (separation > c.adhesionRangeM || oldSupport.height - ahead.height > c.adhesionMaxDropM
                    || Math.hypot(ahead.forwardSlope, ahead.rightSlope) > c.adhesionMaxSlope) {
                    attached = false;
                    break;
                }
            }
            // At turbo speed even tiny triangle changes have high instantaneous
            // curvature. Their tightly bounded gap is a better suspension criterion.
            attached && (attached = crestAcceleration >= -(c.gravity + c.adhesionAcceleration) || maxSeparation <= c.adhesionMicroRangeM);
        }
        const takeoff = abruptDrop || departure && !attached;
        if (wasGrounded && !takeoff) {
            k.y = nextSupport.height;
            k.vy = ledge ? 0 : (nextSupport.height - oldSupport.height) / dt;
            k.grounded = true;
            state.airTime = 0;
        }
        else {
            if (wasGrounded) {
                state.takeoffPitch = state.pitch;
                state.takeoffRoll = state.roll;
                state.airYaw = 0;
                state.airPitch = 0;
                state.airTime = 0;
            }
            state.airTime += dt;
            k.y = predicted;
            k.vy -= downwardAcceleration * dt;
            k.grounded = false;
            if (k.y <= nextSupport.height) {
                const retention = state.airTime > .08 ? .96 : 1;
                k.y = nextSupport.height;
                k.vy = 0;
                k.grounded = true;
                k.vx *= retention;
                k.vz *= retention;
                state.airYaw = 0;
                state.airPitch = 0;
            }
        }
        if (collideLRV(k, from, surface)) {
            nextSupport = support(surface, k.x, k.z, k.heading);
            if (k.grounded)
                k.y = nextSupport.height;
        }
        state.contactHeight = nextSupport.height;
        state.wheelHeights = nextSupport.heights;
        state.wheelOffsets = nextSupport.offsets;
        if (k.grounded) {
            state.airBrakeRemaining = 0;
            clearBrakeGesture(state);
            const blend = 1 - Math.exp(-dt * 12);
            state.pitch += angleDifference(nextSupport.pitch, state.pitch) * blend;
            state.roll += angleDifference(nextSupport.roll, state.roll) * blend;
            state.airYawRate = 0;
            state.airPitch = 0;
            k.airTurn = 0;
        }
        else {
            state.pitch = state.takeoffPitch + state.airPitch;
            state.roll = state.takeoffRoll;
            k.airTurn = state.airYawRate ? steer : 0;
            state.airBrakeRemaining = state.airBrakeRemaining - dt > 1e-9 ? state.airBrakeRemaining - dt : 0;
        }
        state.speedMps = k.vx * Math.sin(k.heading) + k.vz * Math.cos(k.heading);
        state.grounded = k.grounded;
        state.wheelSpin += state.speedMps * dt / c.wheelRadiusM;
        k.spin = state.wheelSpin;
        k.downThrust = !k.grounded && downFraction > 0;
    }
    /** Captured native edges work identically for keyboard and touch; pure callers
     * without event capture retain the simulation-clock polling fallback.
     * Substeps bound collision/contact work; a stalled frame never fast-forwards an
     * entire outing. The caller owns regional bounds and encounter progression. */
    function stepLRVDriving(state, k, controls, dt, surface) {
        if (!Number.isFinite(dt) || dt <= 0)
            return;
        const elapsed = Math.min(dt, .25);
        let downSpeed = 0;
        updateTravel(state, k, surface.rocketTravel);
        if (state.usesQueuedInput) {
            for (const event of state.inputQueue) {
                // A grounded native press must not become an airborne tap just because the
                // rover left a crest before the renderer consumed the event (or vice versa).
                downSpeed = Math.max(downSpeed, airBrakeEdges(state, event, k.grounded || !!event.grounded, event.time));
                boostEdges(state, event, event.time);
            }
            state.inputQueue.length = 0;
            // A caller may still cancel directly in its current controls. Do not derive
            // ordinary press/release timing from a second, simulation-clock time domain.
            if (controls.brake || controls.reverse)
                boostEdges(state, controls, state.lastInputTime);
        }
        else {
            downSpeed = airBrakeEdges(state, controls, k.grounded);
            boostEdges(state, controls);
        }
        if (downSpeed > 0 && !k.grounded && !controls.trickIntent)
            k.vy = Math.min(k.vy, -downSpeed);
        const count = Math.max(1, Math.ceil(elapsed * 120)), step = elapsed / count;
        for (let n = 0; n < count; n++) {
            integrate(state, k, controls, step, surface);
            state.clock += step;
        }
    }
    /** Explicit grounded placement/heading change, without a physics frame or an
     * armed input edge. This is also useful when a cinematic turns the whole rover. */
    function settleLRVDriving(state, k, surface) {
        const measured = support(surface, k.x, k.z, k.heading), clock = state.clock;
        resetLRVDriving(state);
        Object.assign(k, { y: measured.height, vx: 0, vy: 0, vz: 0, grounded: true, steer: 0, airTurn: 0, downThrust: false, lastHit: null });
        Object.assign(state, { clock, initialized: true, parked: true, grounded: true, pitch: measured.pitch, roll: measured.roll,
            takeoffPitch: measured.pitch, takeoffRoll: measured.roll, contactHeight: measured.height, wheelHeights: measured.heights, wheelOffsets: measured.offsets, wheelSpin: k.spin });
    }
    return { LRV_TUNING, newLRVDriving, resetLRVDriving, lrvTurboStatus, lrvTravelTiming, lrvRocketAccess, queueLRVInput, stepLRVDriving, settleLRVDriving };
}
export const { LRV_TUNING, newLRVDriving, resetLRVDriving, lrvTurboStatus, lrvTravelTiming, lrvRocketAccess, queueLRVInput, stepLRVDriving, settleLRVDriving } = createRoverPhysics();
