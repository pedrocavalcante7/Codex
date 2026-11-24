"""Reject Android builds whose native loader blocks packaged app assets."""
from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
java = (root / 'src/br/com/codice/aventureiro/MainActivity.java').read_text()
start = java.index('Arrays.asList(')
end = java.index(');', start)
allowed = set(re.findall(r'"(/[^"\s]+)"', java[start:end]))
assets = {'/' + p.relative_to(root / 'assets').as_posix()
          for p in (root / 'assets').rglob('*') if p.is_file()}
blocked = sorted(assets - allowed)
if blocked:
    raise SystemExit('Android loader blocks packaged assets: ' + ', '.join(blocked))
print(f'OK: all {len(assets)} packaged assets are accessible through the Android loader.')
