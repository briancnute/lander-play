"""Authored shape study; not a NASA mesh or engineering reconstruction."""
import json,struct,math,pathlib
parts=[]
def box(x,y,z,w,h,d,color):
 p=[(x,y,z),(x+w,y,z),(x+w,y+h,z),(x,y+h,z),(x,y,z+d),(x+w,y,z+d),(x+w,y+h,z+d),(x,y+h,z+d)]
 tris=[]
 for a,b,c,e in [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]:
  tris.extend([p[a],p[b],p[c],p[a],p[c],p[e]])
 parts.append((tris,color))
def wheel(x,z):
 tris=[]
 for i in range(16):
  a=i*math.tau/16;b=(i+1)*math.tau/16
  p=[(x-.035,.065+math.sin(a)*.065,z+math.cos(a)*.065),(x+.035,.065+math.sin(a)*.065,z+math.cos(a)*.065),(x+.035,.065+math.sin(b)*.065,z+math.cos(b)*.065),(x-.035,.065+math.sin(b)*.065,z+math.cos(b)*.065)]
  tris.extend([p[0],p[1],p[2],p[0],p[2],p[3]])
  for side in [-1,1]:tris.extend([(x+side*.035,.065,z),(x+side*.035,p[0][1],p[0][2]),(x+side*.035,p[2][1],p[2][2])])
 parts.append((tris,[.10,.11,.12,1]))
box(-.18,.09,-.24,.36,.12,.48,[.72,.66,.48,1]);box(-.23,.21,-.30,.46,.015,.60,[.05,.12,.25,1])
for x in range(7):box(-.225+x*.065,.226,-.295,.003,.002,.59,[.40,.46,.54,1])
for z in range(10):box(-.225,.226,-.295+z*.059,.45,.002,.003,[.40,.46,.54,1])
for x in [-.24,.24]:
 for z in [-.235,0,.235]:wheel(x,z)
for x in [-.1,.07]:box(x,.14,.238,.045,.03,.02,[.08,.08,.08,1])
box(.14,.227,.18,.004,.10,.004,[.65,.65,.65,1])
data=bytearray();views=[];access=[];meshes=[];materials=[]
for tris,color in parts:
 normals=[]
 for i in range(0,len(tris),3):
  a,b,c=tris[i:i+3];u=[b[j]-a[j] for j in range(3)];v=[c[j]-a[j] for j in range(3)];n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];l=math.sqrt(sum(q*q for q in n)) or 1;normals.extend([tuple(q/l for q in n)]*3)
 attrs={}
 for name,values in [('POSITION',tris),('NORMAL',normals)]:
  offset=len(data);data.extend(struct.pack('<'+'f'*len(values)*3,*[n for p in values for n in p]));views.append({'buffer':0,'byteOffset':offset,'byteLength':len(data)-offset});a={'bufferView':len(views)-1,'componentType':5126,'count':len(values),'type':'VEC3'}
  if name=='POSITION':a.update(min=[min(p[j] for p in values) for j in range(3)],max=[max(p[j] for p in values) for j in range(3)])
  access.append(a);attrs[name]=len(access)-1
 materials.append({'pbrMetallicRoughness':{'baseColorFactor':color,'metallicFactor':.15,'roughnessFactor':.7},'doubleSided':True});meshes.append({'primitives':[{'attributes':attrs,'material':len(materials)-1}]})
j={'asset':{'version':'2.0','generator':'ASTRA Sojourner shape study'},'scene':0,'scenes':[{'nodes':list(range(len(meshes)))}],'nodes':[{'mesh':i} for i in range(len(meshes))],'meshes':meshes,'materials':materials,'buffers':[{'byteLength':len(data)}],'bufferViews':views,'accessors':access}
s=json.dumps(j,separators=(',',':')).encode();s+=b' '*((-len(s))%4);out=struct.pack('<III',0x46546c67,2,28+len(s)+len(data))+struct.pack('<II',len(s),0x4e4f534a)+s+struct.pack('<II',len(data),0x004e4942)+data
pathlib.Path(__file__).with_name('sojourner-study.glb').write_bytes(out)
