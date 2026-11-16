import {GEDIZ_GRADING} from './gediz-grading-data.js';
/** The same authored vertex repair is applied before mesh/contact construction in every mode. */
export function gradeGediz(raw,crop){
 if(crop.columns!==GEDIZ_GRADING.columns||crop.rows!==GEDIZ_GRADING.rows||crop.step!==20||crop.eastMin!==-7500||crop.northMax!==2000)throw Error('Gediz grading requires the surveyed Gale grid.');
 const graded=raw.slice();for(const [i,z]of GEDIZ_GRADING.vertices)graded[i]=z;return graded;
}
export function gedizDetailTile(minX,minY,maxX,maxY){const [w,e,s,n]=GEDIZ_GRADING.bounds,U=8/3;return maxX>=w*U&&minX<=e*U&&maxY>=-n*U&&minY<=-s*U;}
