import bpy,math,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(r'C:/Users/asadm/OneDrive/Desktop/Portfolio Website Work')
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(ROOT/'design/meshy/avatar/dance.glb'))
scene=bpy.context.scene
scene.frame_set(24)
objects=[o for o in scene.objects if o.type=='MESH' and o.find_armature() is not None]
depsgraph=bpy.context.evaluated_depsgraph_get()
points=[o.matrix_world@Vector(c) for o in objects for c in o.evaluated_get(depsgraph).bound_box]
lo=Vector(tuple(min(p[i] for p in points) for i in range(3)));hi=Vector(tuple(max(p[i] for p in points) for i in range(3)))
report={'bounds':{'low':list(lo),'high':list(hi)},'objects':[(o.name,o.type) for o in scene.objects],'actions':[(a.name,list(a.frame_range)) for a in bpy.data.actions],'textures':[(im.name,list(im.size)) for im in bpy.data.images]}
# Preserve animation and scale, reducing only embedded texture resolution for the web.
for im in bpy.data.images:
 if im.size[0]>1024 or im.size[1]>1024:
  ratio=1024/max(im.size);im.scale(round(im.size[0]*ratio),round(im.size[1]*ratio));im.pack()
props=bpy.ops.export_scene.gltf.get_rna_type().properties
formats=[e.identifier for e in props['export_image_format'].enum_items]
args={'filepath':str(ROOT/'public/media/avatar-dance.glb'),'export_format':'GLB','export_animations':True,'export_image_format':'WEBP' if 'WEBP' in formats else 'AUTO'}
if 'export_image_quality' in props:args['export_image_quality']=85
if 'export_frame_range' in props:args['export_frame_range']=False
bpy.ops.export_scene.gltf(**args)
report['web_export_bytes']=(ROOT/'public/media/avatar-dance.glb').stat().st_size
# Studio poster shares the site's off-white stage, lit as a physical toy.
height=hi.z-lo.z;center=(lo+hi)/2
floor_z=lo.z-.01
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,floor_z))
floor=bpy.context.object;floor.name='Portfolio | studio ground'
mat=bpy.data.materials.new('Stage | warm white');mat.diffuse_color=(.82,.82,.76,1);mat.use_nodes=True
bsdf=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bsdf.inputs['Base Color'].default_value=(.82,.82,.76,1);bsdf.inputs['Roughness'].default_value=.8;floor.data.materials.append(mat)
def light(name,pos,power,size):
 bpy.ops.object.light_add(type='AREA',location=pos);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(center-o.location).to_track_quat('-Z','Y').to_euler()
light('Studio | key',center+Vector((-3,-4,5)),650,5)
light('Studio | fill',center+Vector((4,-2,2)),300,4)
light('Studio | rim',center+Vector((2,3,4)),800,3)
bpy.ops.object.camera_add(location=center+Vector((height*.7,-height*2.8,height*.35)))
cam=bpy.context.object;cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=height*1.3;scene.camera=cam
scene.world=bpy.data.worlds.new('Portfolio | studio');scene.world.use_nodes=True
bg=next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND');bg.inputs['Color'].default_value=(.83,.83,.78,1);bg.inputs['Strength'].default_value=.5
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
scene.render.resolution_x=900;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.render.film_transparent=False
scene.render.image_settings.media_type='IMAGE';scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB'
scene.render.filepath=str(ROOT/'design/avatar-poster.png')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'design/portfolio-avatar.blend'))
bpy.ops.render.render(write_still=True)
(ROOT/'design/avatar-blender-report.json').write_text(json.dumps(report,indent=2))
print('PORTFOLIO_AVATAR_DONE '+json.dumps(report),flush=True)
