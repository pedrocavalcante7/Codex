"""Extract generated atlas cells and package offline avatar layers; no external URLs."""
from pathlib import Path
from PIL import Image
import json,base64,io
root=Path(__file__).resolve().parents[1]
src=root/'art/avatar594/sheets'
out=root/'art/avatar594';out.mkdir(parents=True,exist_ok=True)
sheets=[
('body','exec-5badbe22-50a7-4cb0-bddc-75318b349746.png',5,2,'human reptile bird fur broad shortbroad smallreptile slimsmall pterosaur aasimar'.split()),
('hair','exec-f3abc7ca-91c0-472a-92f5-70c2a4f96fff.png',4,4,'short medium long crop bob pixie curly afro braids ponytail bun mohawk undercut'.split()),
('clothes','exec-fc83a478-b108-4fc0-bb6e-4e64eaeb3a70.png',4,4,['Bárbaro','Bardo','Clérigo','Druida','Guerreiro','Monge','Paladino','Patrulheiro','Ladino','Feiticeiro','Bruxo','Mago','rags','fine']),
('hand','exec-44cf77f8-64e1-451f-8f32-33a43cf43865.png',4,3,'sword shield spear scythe bow mace greatsword greataxe axe halberd glaive staff'.split()),
('hand','exec-94a28a86-bf50-4c10-9b7e-a38cfd86e38a.png',4,3,'magicstaff crook scepter wand lute flute violin dagger lightcrossbow handcrossbow rapier whip'.split()),
('anatomy','exec-de7de2c9-d34c-4f8d-b699-70426d609752.png',4,4,'horn-small horn-medium horn-large horn-simple horn-ram horn-branches horn-deer ears-small ears-normal ears-large ears-pointed tusks-orc tail-tiefling tail-lizard tail-wolf tail-lion'.split()),
('face','exec-185eb5af-c6eb-4803-b62f-f438cb48086d.png',4,3,'serious sad tired happy joyful mischievous cheeky heroic young middle old'.split()),
('lower','exec-0474c590-5886-4b42-ad57-ccfdb285e881.png',4,3,'body-slim body-strong body-stocky body-fat trousers-tight leather-tight shorts-tight skirt-tight trousers-loose leather-loose shorts-loose skirt-loose'.split())]
assets={};manifest=[]
for group,filename,cols,rows,keys in sheets:
 im=Image.open(src/filename).convert('RGBA')
 for i,key in enumerate(keys):
  # Last sheet has taller top row; observed garment boundaries differ from equal cells.
  ys=[0,445,758,1086] if group=='lower' else [round(j*im.height/rows) for j in range(rows+1)]
  box=(round(i%cols*im.width/cols),ys[i//cols],round((i%cols+1)*im.width/cols),ys[i//cols+1])
  tile=im.crop(box);bbox=tile.getchannel('A').point(lambda a:255 if a>150 else 0).getbbox()
  assert bbox,(group,key)
  tile=tile.crop(bbox);tile.thumbnail((420,520),Image.Resampling.LANCZOS)
  name=group+'-'+key;path=out/(name+'.png');tile.save(path,optimize=True)
  b=io.BytesIO();tile.save(b,format='WEBP',quality=88,method=6)
  assets[name]={'w':tile.width,'h':tile.height,'src':'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()}
  manifest.append({'id':name,'source':filename,'cell':i,'crop':box,'trim':bbox,'width':tile.width,'height':tile.height})
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(root/'docs/avatar-assets594.js').write_text('const AVATAR_ASSETS594='+json.dumps(assets,ensure_ascii=False,separators=(',',':'))+';\n')
print('Extracted',len(assets),'assets; embedded bytes',(root/'docs/avatar-assets594.js').stat().st_size)
