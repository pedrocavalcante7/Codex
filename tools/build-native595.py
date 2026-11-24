#!/usr/bin/env python3
"""Full native rebuild, using the existing signing backup supplied privately via CI."""
import argparse,base64,json,os,subprocess,tempfile,zipfile,hashlib
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--sdk',required=True,type=Path);p.add_argument('--signing-backup',required=True,type=Path);p.add_argument('--manifest-url',required=True);p.add_argument('--output',required=True,type=Path);a=p.parse_args()
assert a.manifest_url.startswith('https://');root=Path(__file__).resolve().parents[1];project=root/'project/android-codice';sdk=a.sdk.resolve();bt=sdk/'build-tools/35.0.0';jar=sdk/'platforms/android-35/android.jar';out=a.output.resolve();out.mkdir(parents=True,exist_ok=True)
key=json.loads(a.signing_backup.read_text());assert key['application_id']=='br.com.codice.aventureiro.novo';assert key['certificate_sha256'].lower().replace(':','')=='5cf3155973dd295d9755f057142f8f5c3f7ffc01f0514dfa5d65f8d720f93b36'
def run(*args,**kw):return subprocess.run([str(x) for x in args],check=True,**kw)
with tempfile.TemporaryDirectory() as tmp:
 t=Path(tmp);classes=t/'classes';classes.mkdir();dex=t/'dex';dex.mkdir();ks=t/'key.p12';ks.write_bytes(base64.b64decode(key['pkcs12_base64']));ks.chmod(0o600);env={**os.environ,'CODEX_KEY_PASSWORD':key['password']};cfg=t/'UpdateConfig595.java';cfg.write_text('package br.com.codice.aventureiro; final class UpdateConfig595 { static final String MANIFEST='+json.dumps(a.manifest_url)+'; }')
 run('python3',project/'tools/check_asset_access.py');run('javac','--release','8','-classpath',jar,'-d',classes,*project.glob('src/**/*.java'),cfg);run(bt/'d8','--lib',jar,'--min-api','26','--output',dex,*classes.rglob('*.class'));run(bt/'aapt2','compile','--dir',project/'res','-o',t/'res.zip');run(bt/'aapt2','link','-I',jar,'--manifest',project/'AndroidManifest.xml','-A',project/'assets','-o',t/'unsigned.apk',t/'res.zip')
 with zipfile.ZipFile(t/'unsigned.apk','a') as z:
  for f in dex.glob('*.dex'):z.write(f,f.name)
 run(bt/'zipalign','-f','4',t/'unsigned.apk',t/'aligned.apk');apk=out/'Codex-5.95.apk';run(bt/'apksigner','sign','--ks',ks,'--ks-key-alias',key['alias'],'--ks-pass','env:CODEX_KEY_PASSWORD','--v4-signing-enabled','false','--out',apk,t/'aligned.apk',env=env)
 v=subprocess.check_output([str(bt/'apksigner'),'verify','--verbose','--print-certs',str(apk)],text=True);assert key['certificate_sha256'].lower().replace(':','') in v.lower();run(bt/'zipalign','-c','4',apk);print(v)
