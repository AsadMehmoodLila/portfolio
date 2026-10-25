import bpy, json, numpy as np
from pathlib import Path
from mathutils import Vector
root=Path(__file__).resolve().parent.parent
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(root/'public/media/avatar-dance.glb'))
arm=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')
body=bpy.data.objects['char1']
head_groups={g.index for g in body.vertex_groups if 'head' in g.name.lower()}
verts=[body.matrix_world@v.co for v in body.data.vertices if any(g.group in head_groups and g.weight>.15 for g in v.groups)]
lo=Vector([min(v[i] for v in verts) for i in range(3)]);hi=Vector([max(v[i] for v in verts) for i in range(3)]);center=(lo+hi)/2
print('HEAD_BOUNDS',list(lo),list(hi),flush=True)
# Restyle the existing model's fabric, preserving its geometry, UVs and rig.
base=bpy.data.images['Image_0'];a=np.array(base.pixels[:],dtype=np.float32).reshape(-1,4)
r,g,b=a[:,0].copy(),a[:,1].copy(),a[:,2].copy();mask=(r>g*1.7)&(g>b*1.6)&(b<.18)&(r>.12)
lum=r*.2126+g*.7152+b*.0722
a[mask,0]=.035+lum[mask]*.08;a[mask,1]=.045+lum[mask]*.10;a[mask,2]=.06+lum[mask]*.12
base.pixels.foreach_set(a.ravel());base.pack()
# A locally built cap accessory, on the original Head joint, with a baked plaid material.
tex=bpy.data.images.new('ScriptLilla | green plaid cloth',256,256,alpha=True)
y,x=np.mgrid[0:256,0:256];p=np.ones((256,256,4),dtype=np.float32)
shade=((x//32+y//32)%2)*.06
p[:,:,0]=.035+shade;p[:,:,1]=.25+shade*1.7;p[:,:,2]=.055+shade
broad=((x%64)<8)|((y%64)<8);p[broad,:3]*=1.6
thin=((x%32)<2)|((y%32)<2);p[thin,:3]=[.35,.63,.24]
tex.pixels.foreach_set(p.ravel());tex.pack()
mat=bpy.data.materials.new('ScriptLilla | plaid cap');mat.use_nodes=True;bsdf=mat.node_tree.nodes.get('Principled BSDF');bsdf.inputs['Roughness'].default_value=.8
node=mat.node_tree.nodes.new('ShaderNodeTexImage');node.image=tex;mat.node_tree.links.new(node.outputs['Color'],bsdf.inputs['Base Color'])
parts=[]
def piece(name,loc,size,bevel):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 mod=o.modifiers.new('Soft cloth edges','BEVEL');mod.width=bevel;mod.segments=3;bpy.ops.object.modifier_apply(modifier=mod.name)
 for f in o.data.polygons:f.use_smooth=True
 o.data.materials.append(mat);parts.append(o);return o
w=(hi.x-lo.x)*1.08;d=(hi.y-lo.y)*.82
piece('ScriptLilla | cap crown',(center.x,center.y,hi.z-.005),(w,d,.17),.045)
piece('ScriptLilla | cap visor',(center.x,center.y-d*.43,hi.z-.085),(w*1.01,d*.82,.035),.025)
for o in parts:
 for ob in bpy.context.selected_objects:ob.select_set(False)
 o.select_set(True);bpy.context.view_layer.objects.active=o
 vg=o.vertex_groups.new(name='Head');vg.add(list(range(len(o.data.vertices))),1,'REPLACE')
 mod=o.modifiers.new('Follow original head rig','ARMATURE');mod.object=arm
 old=o.matrix_world.copy();o.parent=arm;o.matrix_world=old
bpy.ops.object.select_all(action='DESELECT')
for o in [arm,body,*parts]:o.select_set(True)
bpy.context.view_layer.objects.active=arm
bpy.ops.export_scene.gltf(filepath=str(root/'public/media/scriptlilla-dance.glb'),export_format='GLB',use_selection=True,export_animations=True,export_frame_range=False,export_image_format='WEBP',export_image_quality=85)
bpy.ops.wm.save_as_mainfile(filepath=str(root/'design/scriptlilla-avatar.blend'))
(root/'design/branding/avatar-revision.json').write_text(json.dumps({'source':'Existing owner-approved avatar-dance.glb','changes':['Charcoal fabric material','Green plaid cap accessory weighted to existing Head bone'],'paidRequests':0,'output':'public/media/scriptlilla-dance.glb','size':(root/'public/media/scriptlilla-dance.glb').stat().st_size,'headBounds':[list(lo),list(hi)]},indent=2),encoding='utf8')
print('BRAND_AVATAR_EXPORTED',flush=True)
