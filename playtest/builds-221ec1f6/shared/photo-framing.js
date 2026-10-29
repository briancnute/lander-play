// A rectangular viewport over the untouched photograph; no invented/fill pixels.
export function photoFrame(photo){
 const [x,y,w,h]=photo.view??[0,0,1,1];
 return {aspect:photo.width*w/(photo.height*h),image:`left:${-x/w*100}%;top:${-y/h*100}%;width:${100/w}%;height:${100/h}%`};
}
