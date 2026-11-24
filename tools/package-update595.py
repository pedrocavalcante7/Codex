#!/usr/bin/env python3
"""Produce a complete native asset ZIP and RSA-signed manifest, without shipping private keys."""
import argparse,base64,hashlib,json,os,subprocess,tempfile,zipfile
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--signing-backup',required=True,type=Path);p.add_argument('--output',required=True,type=Path);p.add_argument('--url',required=True);p.add_argument('--version',required=True);p.add_argument('--code',required=True,type=int);p.add_argument('--notes',default='Codex update');a=p.parse_args();assert a.code>=213 and a.url.startswith('https://');a.output.mkdir(parents=True,exist_ok=True);assets=Path(__file__).resolve().parents[1]/'project/android-codice/assets';key=json.loads(a.signing_backup.read_text());assert key['certificate_sha256'].lower().replace(':','')=='5cf3155973dd295d9755f057142f8f5c3f7ffc01f0514dfa5d65f8d720f93b36';bundle=a.output/f'codex-assets-{a.code}.zip'
with zipfile.ZipFile(bundle,'w',zipfile.ZIP_DEFLATED) as z:
 for f in sorted(assets.iterdir()):
  if f.is_file():z.write(f,f.name)
payload=json.dumps({'code':a.code,'minNativeCode':213,'version':a.version,'notes':a.notes,'url':a.url,'sha256':hashlib.sha256(bundle.read_bytes()).hexdigest()},separators=(',',':')).encode()
with tempfile.TemporaryDirectory() as d:
 t=Path(d);ks=t/'key.p12';ks.write_bytes(base64.b64decode(key['pkcs12_base64']));ks.chmod(0o600);env={**os.environ,'CODEX_KEY_PASSWORD':key['password']};pem=t/'key.pem';subprocess.run(['openssl','pkcs12','-in',str(ks),'-nocerts','-nodes','-passin','env:CODEX_KEY_PASSWORD','-out',str(pem)],env=env,check=True,capture_output=True);pem.chmod(0o600);sig=subprocess.check_output(['openssl','dgst','-sha256','-sign',str(pem)],input=payload)
(a.output/'update-manifest.json').write_text(json.dumps({'payload':base64.b64encode(payload).decode(),'signature':base64.b64encode(sig).decode()}))
