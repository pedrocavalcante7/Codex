#!/usr/bin/env python3
"""Repackage verified 5.70 assets into 5.71 without altering native DEX/resources."""
from pathlib import Path
import argparse,hashlib,json,os,subprocess,tempfile,zipfile
CERT='7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041'
BASE='8c7f4f43a171ad72c87669b7745c292841e5ca8b93a02996820b76a174d4328a'
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def run(args,**kw):return subprocess.run(list(map(str,args)),check=True,**kw)
def main():
 p=argparse.ArgumentParser();p.add_argument('--base',type=Path,required=True);p.add_argument('--project',type=Path,required=True);p.add_argument('--tools',type=Path,required=True);p.add_argument('--keystore',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
 base,project,sdk,key,out=[v.resolve() for v in [a.base,a.project,a.tools,a.keystore,a.output]]
 if out.exists():raise ValueError('Use a fresh output path')
 assert sha(base)==BASE,'Incorrect base APK'
 assert os.environ.get('CODICE_KEYSTORE_PASSWORD'),'Set CODICE_KEYSTORE_PASSWORD'
 run(['python3',project/'tools/check_asset_access.py'])
 encoder=(project/'package484.py').read_text();old="replacements={'4.83':'4.84'}";assert encoder.count(old)==1 and encoder.count('p+16,115')==1
 encoder=encoder.replace(old,"replacements={'5.70':'5.71'}").replace('p+16,115','p+16,189')
 out.parent.mkdir(parents=True,exist_ok=True)
 with tempfile.TemporaryDirectory(prefix='build557-',dir=out.parent) as d:
  stage=Path(d);script=stage/'encoder.py';script.write_text(encoder);env=os.environ.copy();env.update(CODICE_BASE_APK=str(base),CODICE_ASSETS=str(project/'assets'))
  run(['python3',script],cwd=stage,env=env);run([sdk/'zipalign','-f','4',stage/'update-unsigned.apk',stage/'aligned.apk'])
  final=stage/'signed.apk';run([sdk/'apksigner','sign','--v4-signing-enabled','false','--ks',key,'--ks-key-alias','codice','--ks-pass','env:CODICE_KEYSTORE_PASSWORD','--out',final,stage/'aligned.apk'])
  verify=subprocess.check_output([str(sdk/'apksigner'),'verify','--verbose','--print-certs',str(final)],text=True);assert CERT in verify and 'Verified using v2 scheme (APK Signature Scheme v2): true' in verify
  b=subprocess.check_output([str(sdk/'aapt2'),'dump','badging',str(final)],text=True);assert "name='br.com.codice.aventureiro'" in b and "versionName='5.71'" in b and "versionCode='189'" in b
  run(['python3',project/'tools/check_apk.py',final]);run([sdk/'zipalign','-c','4',final],stdout=subprocess.DEVNULL)
  with zipfile.ZipFile(final) as z,zipfile.ZipFile(base) as old:
   assert z.testzip() is None
   for n in ['classes.dex','resources.arsc']:assert z.read(n)==old.read(n)
   for f in (project/'assets').rglob('*'):
    if f.is_file():assert z.read('assets/'+f.relative_to(project/'assets').as_posix())==f.read_bytes(),str(f)
  with final.open('rb') as f:os.fsync(f.fileno())
  os.replace(final,out)
 receipt={'version_name':'5.71','version_code':189,'base_version':'5.70','size':out.stat().st_size,'sha256':sha(out),'certificate_sha256':CERT,'native':'DEX and resources identical to 5.70','assets':'all source files verified in APK','physical_install_test':False}
 out.with_suffix(out.suffix+'.json').write_text(json.dumps(receipt,indent=2));print(json.dumps(receipt,indent=2))
if __name__=='__main__':main()
