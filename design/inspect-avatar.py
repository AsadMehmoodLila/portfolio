import bpy,json
bpy.ops.wm.open_mainfile(filepath=r'C:/Users/asadm/OneDrive/Desktop/Portfolio Website Work/design/portfolio-avatar.blend')
print('MESH_INSPECTION',json.dumps([{'name':o.name,'vertices':len(o.data.vertices),'hide':o.hide_get(),'hide_render':o.hide_render,'armature':o.find_armature().name if o.find_armature() else None,'collections':[(c.name,c.hide_render,c.hide_viewport) for c in o.users_collection]} for o in bpy.data.objects if o.type=='MESH']))
