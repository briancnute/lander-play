// Capture dates belong to each photograph, never to its download or publication.
export function photos(site){return [{...site},...(site.views??[])].sort((a,b)=>Number(!!b.iconic)-Number(!!a.iconic)||(b.capturedAt??'').localeCompare(a.capturedAt??''));}
export function latestVisual(site){return photos(site).map(p=>p.capturedAt??'').sort().at(-1)||'';}
export function photoDate(date){return date?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z')):'Date not recorded';}
export function orderedNotes(sites,collected,key,direction){return sites.map((site,index)=>({site,index,known:collected.includes(index)})).sort((a,b)=>Number(b.known)-Number(a.known)||(a.known?((key==='name'?a.site.name.localeCompare(b.site.name):latestVisual(a.site).localeCompare(latestVisual(b.site)))*(direction==='asc'?1:-1)):0)||a.index-b.index);}
