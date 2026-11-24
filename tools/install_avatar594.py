from pathlib import Path
import argparse
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--web-dist',type=Path,default=root/'web-source/dist');args=parser.parse_args();web=args.web_dist
assets=root/'project/android-codice/assets'
marker='\n// BEGIN AVATAR594\n'
code=marker+(root/'docs/avatar-assets594.js').read_text()+(root/'docs/update594.js').read_text()
p=assets/'spell-ui434.js';p.write_text(p.read_text().split(marker)[0]+code)
for name in ['avatar-assets594.js','update594.js']:(web/name).write_text((root/'docs'/name).read_text())
p=web/'index.html';s=p.read_text()
if 'update594.js' not in s:s=s.replace('</body>','<script src="avatar-assets594.js"></script><script src="update594.js"></script>\n</body>')
p.write_text(s)
for base in [assets,web]:
 p=base/'sw.js'
 if p.exists():p.write_text(p.read_text().replace('5.93','5.94'))
