#!/usr/bin/env python3
"""Build the separately installed Codice Novo from the complete versioned sources.
The signing backup is private and must never be committed to a public repository.
"""
import argparse,base64,hashlib,json,os,subprocess,tempfile,zipfile
from pathlib import Path

def run(args,**kw):
    return subprocess.run([str(x) for x in args],check=True,**kw)

def main():
    p=argparse.ArgumentParser()
    for name in ['base','project','tools','signing-backup','output']:
        p.add_argument('--'+name,type=Path,required=True)
    p.add_argument('--version',default='5.94')
    p.add_argument('--code',type=int,default=212)
    a=p.parse_args()
    base,project,sdk,out=[x.resolve() for x in [a.base,a.project,a.tools,a.output]]
    assert not out.exists(),'Choose a fresh output path'
    assert hashlib.sha256(base.read_bytes()).hexdigest()=='278f50eedf5ed9978673ca3842c8a97cbdabd3f8f4ea81d93af7927cd56b1006'
    signing=json.loads(a.signing_backup.read_text())
    package=signing['application_id'];assert package=='br.com.codice.aventureiro.novo'
    run(['python3',project/'tools/check_asset_access.py'])
    encoder=(project/'package484.py').read_text()
    original="replacements={'4.83':'4.84'}"
    assert encoder.count(original)==1 and encoder.count('p+16,115')==1
    replacements={'5.73':a.version,'br.com.codice.aventureiro':package,'Códice do Aventureiro':'Codex'}
    encoder=encoder.replace(original,'replacements='+repr(replacements)).replace('p+16,115','p+16,'+str(a.code))
    out.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='codice-novo-') as tmp:
        stage=Path(tmp);key=stage/'signing.p12';key.write_bytes(base64.b64decode(signing['pkcs12_base64']));key.chmod(0o600)
        script=stage/'encoder.py';script.write_text(encoder)
        env=os.environ.copy();env.update(CODICE_BASE_APK=str(base),CODICE_ASSETS=str(project/'assets'),CODICE_NEWKEY_PASSWORD=signing['password'])
        run(['python3',script],cwd=stage,env=env)
        run([sdk/'zipalign','-f','4',stage/'update-unsigned.apk',stage/'aligned.apk'])
        run([sdk/'apksigner','sign','--v4-signing-enabled','false','--ks',key,'--ks-key-alias',signing['alias'],'--ks-pass','env:CODICE_NEWKEY_PASSWORD','--out',stage/'signed.apk',stage/'aligned.apk'],env=env)
        verify=subprocess.check_output([str(sdk/'apksigner'),'verify','--verbose','--print-certs',str(stage/'signed.apk')],text=True)
        assert signing['certificate_sha256'] in verify
        assert 'Verified using v2 scheme (APK Signature Scheme v2): true' in verify
        assert 'Verified using v3 scheme (APK Signature Scheme v3): true' in verify
        info=subprocess.check_output([str(sdk/'aapt2'),'dump','badging',str(stage/'signed.apk')],text=True)
        assert "name='"+package+"'" in info and "versionName='"+a.version+"'" in info and "versionCode='"+str(a.code)+"'" in info
        assert "application-label:'Codex'" in info
        assert "launchable-activity: name='br.com.codice.aventureiro.MainActivity'" in info
        manifest=subprocess.check_output([str(sdk/'aapt2'),'dump','xmltree',str(stage/'signed.apk'),'--file','AndroidManifest.xml'],text=True)
        assert 'android:allowBackup' in manifest and 'android:usesCleartextTraffic' in manifest
        run(['python3',project/'tools/check_apk.py',stage/'signed.apk'])
        run([sdk/'zipalign','-c','4',stage/'signed.apk'])
        with zipfile.ZipFile(stage/'signed.apk') as z,zipfile.ZipFile(base) as old:
            assert z.testzip() is None
            for name in ['classes.dex','resources.arsc']:assert z.read(name)==old.read(name)
            for asset in (project/'assets').rglob('*'):
                if asset.is_file():assert z.read('assets/'+asset.relative_to(project/'assets').as_posix())==asset.read_bytes()
            assert ("CODICE_APP_VERSION"+a.version.replace(".","")+"='"+a.version+"'").encode() in z.read('assets/spell-ui434.js')
        out.write_bytes((stage/'signed.apk').read_bytes())
    receipt={'application_id':package,'application_label':'Codex','version':a.version,'version_code':a.code,'certificate_sha256':signing['certificate_sha256'],'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'size':out.stat().st_size,'side_by_side':True,'device_install_test':False,'verified':'signature v2/v3, manifest, launcher class, alignment, CRC, all 37 assets, unchanged DEX/resources'}
    out.with_suffix('.apk.json').write_text(json.dumps(receipt,indent=2))
    print(json.dumps(receipt,indent=2))

if __name__=='__main__':main()
