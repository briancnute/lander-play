export function jezeroChapters(journey){const specs=[
 {name:'Crater floor',from:0,to:414,fact:'Perseverance examined ancient igneous rocks and began collecting samples on Jezero’s floor.'},
 {name:'Delta front & Three Forks',from:415,to:708,fact:'River-deposited sediments offer places to search for preserved signs of ancient life. Three Forks holds a sample depot.'},
 {name:'Across the delta top',from:709,to:899,fact:'Explore sediment carried into an ancient lake: the landscape tells the story without a quiz.'},
 {name:'Margin & Neretva approach',from:900,to:1240,fact:'The lake margin and former river channel connect changing water environments.'},
 {name:'Toward the crater rim',from:1241,to:Math.min(1980,journey.lastSol),fact:'The mission climbed toward older rocks around the rim. This is a dated route snapshot, not a live location.'},
 ];return specs.map(c=>{const segment=journey.segments.find(s=>s.sol>=c.from)??journey.segments.at(-1);return {...c,...segment.points[0]};});}
