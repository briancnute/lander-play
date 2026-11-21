import {VERA_RUBIN_GRADING} from './vera-rubin-grading-data.js';
/** The same authored vertex repair is applied before mesh/contact construction in every mode. */
export function gradeVeraRubin(raw,crop){
 if(crop.columns!==VERA_RUBIN_GRADING.columns||crop.rows!==VERA_RUBIN_GRADING.rows||crop.step!==20||crop.eastMin!==-7500||crop.northMax!==2000)throw Error('Vera Rubin grading requires the surveyed Gale grid.');
 const graded=raw.slice();for(const [i,z]of VERA_RUBIN_GRADING.vertices)graded[i]=z;return graded;
}
export function veraRubinDetailTile(minX,minY,maxX,maxY){const [w,e,s,n]=VERA_RUBIN_GRADING.bounds,U=8/3;return maxX>=w*U&&minX<=e*U&&maxY>=-n*U&&minY<=-s*U;}
