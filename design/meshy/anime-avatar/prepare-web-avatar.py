import bpy,json
from pathlib import Path
root=Path(__file__).resolve().parents[3]
c=bpy.data.collections['ScriptLilla | Anime Portfolio'];arm=next(o for o in c.objects if o.type=='ARMATURE');body=next(o for o in c.objects if o.type=='MESH' and o.name.startswith('char'))
for o in list(bpy.context.selected_objects):o.select_set(False)
arm.select_set(True);body.select_set(True);bpy.context.view_layer.objects.active=body
before=sum(len(p.vertices)-2 for p in body.data.polygons)
# A light reduction preserves the face/cap silhouette and all existing skin weights.
modifier=body.modifiers.new('Web triangle budget','DECIMATE');modifier.ratio=min(1,14000/before);modifier.use_collapse_triangulate=True
bpy.ops.object.modifier_move_to_index(modifier=modifier.name,index=0)
bpy.ops.object.modifier_apply(modifier=modifier.name)
for mat in body.data.materials:
 if not mat.use_nodes:continue
 for node in mat.node_tree.nodes:
  if node.type=='TEX_IMAGE' and node.image and max(node.image.size)>1024:
   node.image.scale(1024,1024);node.image.pack()
  elif node.type=='BSDF_PRINCIPLED':
   node.inputs['Metallic'].default_value=0.0;node.inputs['Roughness'].default_value=.75
bpy.context.scene.render.fps=30
bpy.context.scene.frame_set(0)
output=root/'design/meshy/anime-avatar/unused-web-avatar.glb'
bpy.ops.export_scene.gltf(filepath=str(output),export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='ACTIONS',export_frame_range=False,export_image_format='WEBP',export_image_quality=85,export_force_sampling=True)
bpy.ops.wm.save_as_mainfile(filepath=str(root/'design/meshy/anime-avatar/website-avatar.blend'))
report={'source':'Meshy image-to-3D from reference.png','triangles_before':before,'triangles_after':sum(len(p.vertices)-2 for p in body.data.polygons),'texture_resolution':1024,'animations':[a.name for a in bpy.data.actions],'output':'design/meshy/anime-avatar/unused-web-avatar.glb','bytes':output.stat().st_size,'local_blender_processing_credits':0,'helper_geometry_exported':False}
(root/'design/meshy/anime-avatar/web-asset.json').write_text(json.dumps(report,indent=2),encoding='utf8');print(json.dumps(report))
