# NASA Space Shuttle (D)

Source: https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Space%20Shuttle%20(D)
Downloaded 29 September 2026. NASA glTF files, locally renamed:
Space Shuttle (D).glb → orbiter.glb; door-prt → door-port;
door-stb → door-starboard; eng → engines; rcs → rcs.

Used as historical vehicle geometry and textures. The game remains fictional;
NASA does not endorse PROJECT ASTRA. No NASA assets depict a person here.
The two door files referenced textures absent from the NASA repository. Their material definitions are replaced with neutral thermal-blanket colours; geometry is unchanged.
The runtime assembles closed doors and engine instances and normalizes scale/orientation.
NASA 3D resources usage: https://science.nasa.gov/3d-resources/
NASA media guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/

ASTRA runtime adaptation (29 September 2026): side and upper-wing photographic
markings are replaced by original code-drawn ASTRA thermal-panel textures. NASA
and United States insignia are not displayed on those surfaces. Geometry remains
NASA-derived; source attribution remains here. The renderer culls rear-facing
skins and gives the nose skin a small depth bias behind its cockpit framing.

30 September refinement: retain original wing texture, thermal leading edges and
elevon geometry; locally cover NASA/US wing insignia. Keep the original curved
nose, replacing only the glazing with a small conforming square pane. The crew
hatch is clipped from the original hull and slides recessed, retaining original
surface normals and UVs when closed. Wing reference checks:
https://www.nasa.gov/image-detail/shuttle-1/
https://www.nasa.gov/gallery/space-shuttle-technical-diagrams/
