import {SUMMIT_PATH} from './ski-route.js';
import {skiCourse} from './ski-course.js';
import {GALE_DRIVE} from './ski-boost.js';
// Authored northwestern descent on the pinned survey, joining Curiosity's lower geography.
const LOWER=[[18784,49000],[12000,46000],[3000,43000],[-5000,40000],[-7900,37251],[-8201,32261],[-5842,29559],[-7073,26245],[-4569,23074],[-9717,21516],[-13635,17495],[-11283,12459],[-4996,5659],[0,0]];
function rounded(nodes){const out=[];for(let i=0;i<nodes.length-1;i++){const a=nodes[Math.max(0,i-1)],b=nodes[i],c=nodes[i+1],d=nodes[Math.min(nodes.length-1,i+2)],n=Math.max(2,Math.ceil(Math.hypot(c[0]-b[0],c[1]-b[1])/180));for(let j=0;j<n;j++){const t=j/n;out.push([0,1].map(k=>.5*(2*b[k]+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t)));}}out.push(nodes.at(-1));return out;}
export const FREE_SKI_PATH=rounded([...SUMMIT_PATH.filter(p=>p[1]>49500),...LOWER]);
export function createFreeSkiCourse(ground){
 const course=skiCourse(ground,null,FREE_SKI_PATH,{ramps:[],rollers:[],items:[]});
 Object.assign(course,{practice:true,freeDescent:true,naturalAir:true,downhill:true,mode:null,arena:null,gates:[],width:900,drive:GALE_DRIVE,worldHeight:ground,route:FREE_SKI_PATH.map(([x,y])=>({x,y})),title:'Mount Sharp · summit to basin'});
 course.chapters=[{name:'Summit',s:0},{name:'Upper slopes',s:course.length*.3},{name:'Curiosity region',s:course.coords(-7900,37251).s},{name:'Murray Buttes region',s:course.coords(-13635,17495).s},{name:'Landing basin',s:course.length}].map(p=>({...p,...course.point(p.s),elevation:course.height(p.s)/(8/3)-4500}));
 return course;
}
