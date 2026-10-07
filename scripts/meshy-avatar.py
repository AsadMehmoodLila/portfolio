from pathlib import Path
import requests,json,time,sys
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'design/meshy/avatar';OUT.mkdir(parents=True,exist_ok=True)
KEYFILE=Path(r'C:/Users/asadm/OneDrive/Desktop/Meshy AI Pro Work/.env')
key=next(l.split('=',1)[1].strip().strip('"') for l in KEYFILE.read_text().splitlines() if l.startswith('MESHY_API_KEY='))
s=requests.Session();s.headers['Authorization']='Bearer '+key
base='https://api.meshy.ai'
prompt='Original friendly blocky humanoid game avatar, clearly separated arms and legs, oversized rounded cuboid head, compact athletic proportions, simple smiling face, short dark hair, burnt-orange bomber jacket over a cream shirt, charcoal cargo trousers, cream sneakers, no logos, no text, no accessories or weapons, standing in A-pose.'
texture='Matte burnt-orange bomber jacket, plain cream shirt, charcoal trousers, cream sneakers, warm neutral skin, short dark hair, simple smiling face, no logos or text.'
record={'approved_additional_credits':38,'previous_project_credits':20,'project_cap':100,'approval':'User explicitly approved 38 credits on 2026-10-07','retries':0,'stages':[]}
def save(): (OUT/'job.json').write_text(json.dumps(record,indent=2)+'\n')
def balance():
 r=s.get(base+'/openapi/v1/balance',timeout=30);r.raise_for_status();return r.json()
record['balance_before']=balance();save()
def run(name,endpoint,payload,cost):
 stage={'name':name,'endpoint':endpoint,'settings':payload,'expected_credits':cost};record['stages'].append(stage);save()
 print('Submitting '+name,flush=True)
 r=s.post(base+endpoint,json=payload,timeout=60);stage['http_status']=r.status_code;save();r.raise_for_status()
 tid=r.json()['result'];stage['task_id']=tid;save();print(name+' task '+tid,flush=True)
 deadline=time.monotonic()+1800
 while time.monotonic()<deadline:
  r=s.get(base+endpoint+'/'+tid,timeout=45);r.raise_for_status();data=r.json();stage['status']=data['status'];stage['progress']=data.get('progress');save()
  print(name+' '+data['status']+' '+str(data.get('progress')),flush=True)
  if data['status']=='SUCCEEDED':
   stage['consumed_credits']=data.get('consumed_credits');save()
   if stage['consumed_credits']!=cost:raise RuntimeError('Unexpected charge; further paid stages stopped')
   return tid,data
  if data['status'] in ['FAILED','CANCELED']:raise RuntimeError(name+' did not succeed; no retry or additional paid stage')
  time.sleep(20)
 raise RuntimeError(name+' polling timed out; task ID retained; no resubmission')
def download(url,path):
 r=requests.get(url,timeout=120);r.raise_for_status();path.write_bytes(r.content);print('Downloaded '+path.name+' '+str(path.stat().st_size)+' bytes',flush=True)
try:
 preview,p=run('geometry','/openapi/v2/text-to-3d',{'mode':'preview','prompt':prompt,'ai_model':'meshy-7.1','model_type':'standard','geometry_resolution':'standard','pose_mode':'a-pose','should_remesh':True,'topology':'triangle','target_polycount':15000,'target_formats':['glb','fbx']},20)
 download(p['model_urls']['glb'],OUT/'preview.glb')
 refine,t=run('textures','/openapi/v2/text-to-3d',{'mode':'refine','preview_task_id':preview,'ai_model':'meshy-7.1','texture_resolution':'2k','enable_pbr':True,'texture_prompt':texture,'target_formats':['glb','fbx']},10)
 download(t['model_urls']['glb'],OUT/'textured.glb')
 rig,r=run('rigging','/openapi/v1/rigging',{'input_task_id':refine,'height_meters':1.7},5)
 download(r['result']['rigged_character_glb_url'],OUT/'rigged.glb')
 dance,a=run('dance','/openapi/v1/animations',{'rig_task_id':rig,'action_id':591},3)
 download(a['result']['animation_glb_url'],OUT/'dance.glb')
 if a['result'].get('animation_fbx_url'):download(a['result']['animation_fbx_url'],OUT/'dance.fbx')
 record['balance_after']=balance();record['status']='SUCCEEDED';record['total_credits']=sum(st['consumed_credits'] for st in record['stages']);save()
 print('Avatar workflow complete: '+str(record['total_credits'])+' credits',flush=True)
except Exception as e:
 record['status']='STOPPED';record['error']=type(e).__name__+': '+str(e).split('https://')[0];save();print(record['error'],flush=True);sys.exit(1)
