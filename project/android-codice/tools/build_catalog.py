from pathlib import Path
import re,json
raw=Path('book-raw.txt').read_text().split('\f')[:-1];layout=Path('book-layout.txt').read_text().split('\f')[:-1];left=Path('book-left.txt').read_text().split('\f')[:-1];right=Path('book-right.txt').read_text().split('\f')[:-1]
cn=['Bárbaro','Bardo','Bruxo','Clérigo','Druida','Feiticeiro','Guerreiro','Ladino','Mago','Monge','Paladino','Patrulheiro'];en=['Barbarian','Bard','Warlock','Cleric','Druid','Sorcerer','Fighter','Rogue','Wizard','Monk','Paladin','Ranger'];tr=dict(zip(en,cn))
starts={e:next(i+1 for i,p in enumerate(raw) if 'Core '+e+' Traits' in re.sub(r'\s+',' ',p)) for e in en}
entries=[]
def add(kind,name,page,text='',**meta):
 e={'id':str(len(entries)),'kind':kind,'name':name,'page':page,'text':text.strip(),**meta};entries.append(e);return e
pages=[]
for i,p in enumerate(raw):
 n=i+1
 if n<32:cat='Jogar';
 elif n<48:cat='Criação'
 elif n<176:cat='Classes'
 elif n<198:cat='Origens'
 elif n<212:cat='Talentos'
 elif n<234:cat='Equipamento'
 elif n<344:cat='Magias'
 elif n<360:cat='Mundo e criaturas'
 elif n<378:cat='Glossário'
 else:cat='Índice'
 if p.strip():pages.append({'page':n,'category':cat,'text':p.strip(),'layout':layout[i].strip()})
# Metadados de magias; texto integral permanece acessível na página mesmo com falhas OCR.
seen={}
for source in (left,right,raw):
 for i in range(237,343):
  lines=source[i].splitlines();offset=0
  for j,line in enumerate(lines):
   clean=line.strip();m=re.match(r'Level\s*([1-9])\s*([A-Za-z]+)\s*\(([^)]+)',clean);can=re.match(r'(?:([A-Za-z]+)\s+Cantrip|Cantrip\s+([A-Za-z]+))\s*\(([^)]+)',clean,re.I)
   if not(m or can) or j==0:continue
   k=j-1
   while k>=0 and not lines[k].strip():k-=1
   name=lines[k].strip() if k>=0 else ''
   name=re.sub(r'[_]+','',name).strip()
   if not name or len(name)>48 or any(x in name for x in ['.','CHAPTER','Casting','Points and','slot level']):continue
   name=re.sub(r'\s+',' ',name).replace('\u00ad','');name=re.sub(r'^(?:es |ails |u |e |or |exists |the |on |rn, |o AC |i |r )','',name);name={'JL A-J A':'Fly'}.get(name,name)
   if len(name)<3 or name[0].isdigit() or 'Duration:' in name:continue
   level=int(m[1]) if m else 0;classes=m[3] if m else can[3];school=m[2] if m else (can[1] or can[2])
   norm=name.lower().replace('’',"'").replace(' ','')
   if norm in seen:continue
   # Texto de entrada: o trecho na coluna até a próxima magia, mais acesso à página completa.
   rest='\n'.join(lines[k:]);end=re.search(r'\n\s*[^\n]+\n\s*(?:Level\s*[1-9]\s+|[A-Za-z]+\s+Cantrip)',rest[len(name):],re.I)
   if end:rest=rest[:len(name)+end.start()]
   e=add('Magias',name,i+1,rest,level=level,classes=[tr[x.strip()] for x in classes.split(',') if x.strip() in tr],school=school);seen[norm]=e
# Talentos.
seenfeat=set()
for source in (left,right,raw):
 for i in range(198,211):
  lines=source[i].splitlines()
  for j,line in enumerate(lines):
   m=re.match(r'\s*(Origin|General|Fighting Style|Epic Boon) Feat(?:\s*\(|\s*$)',line)
   if not m or j==0:continue
   k=j-1
   while k>=0 and not lines[k].strip():k-=1
   name=lines[k].strip().strip('_ ');name=re.sub(r'^r\s+','',name).replace('ElementalAdept','Elemental Adept').replace('ofTruesight','of Truesight')
   if len(name)<4 or not re.search('[A-Za-z]',name):continue
   if not name or len(name)>45 or '.' in name:continue
   norm=name.lower().replace(' ','')
   if norm in seenfeat:continue
   seenfeat.add(norm);rest='\n'.join(lines[k:]);end=re.search(r'\n\s*[^\n]+\n\s*(?:Origin|General|Fighting Style|Epic Boon) Feat',rest[len(name):])
   if end:rest=rest[:len(name)+end.start()]
   add('Talentos',name,i+1,rest,category=m[1],minLevel=19 if m[1]=='Epic Boon' else 4 if m[1]=='General' else 1)
# Classes e características de classe antes das subclasses.
subs={
'Barbarian':[('Path of the Berserker',54),('Path of the Wild Heart',55),('Path of the World Tree',56),('Path of the Zealot',57)],
'Bard':[('College of Dance',64),('College of Glamour',65),('College of Lore',66),('College of Valor',67)],
'Cleric':[('Life Domain',73),('Light Domain',74),('Trickery Domain',75),('War Domain',76)],
'Druid':[('Circle of the Land',84),('Circle of the Moon',86),('Circle of the Sea',87),('Circle of the Stars',88)],
'Fighter':[('Battle Master',93),('Champion',96),('Eldritch Knight',96),('Psi Warrior',98)],
'Monk':[('Warrior of Mercy',104),('Warrior of Shadow',105),('Warrior of the Elements',106),('Warrior of the Open Hand',107)],
'Paladin':[('Oath of Devotion',113),('Oath of Glory',114),('Oath of the Ancients',115),('Oath of Vengeance',116)],
'Ranger':[('Beast Master',122),('Fey Wanderer',124),('Gloom Stalker',125),('Hunter',127)],
'Rogue':[('Arcane Trickster',132),('Assassin',134),('Soulknife',135),('Thief',137)],
'Sorcerer':[('Aberrant Sorcery',145),('Clockwork Sorcery',146),('Draconic Sorcery',148),('Wild Magic Sorcery',149)],
'Warlock':[('Archfey Patron',159),('Celestial Patron',160),('Fiend Patron',161),('Great Old One Patron',162)],
'Wizard':[('Abjurer',172),('Diviner',173),('Evoker',174),('Illusionist',175)]}
def findpage(name,guess):
 candidates=range(max(0,guess-4),min(len(raw),guess+2))
 return next((i+1 for i in candidates if name.lower() in raw[i].lower()),max(1,guess-1))
for eng in en:
 start=starts[eng];end=min([v for v in starts.values() if v>start]+[176])-1
 add('Classes',tr[eng],start,'\n'.join(raw[start-1:end]),classes=[tr[eng]],english=eng,end=end)
 actualsubs=[(name,findpage(name,p)) for name,p in subs[eng]]
 for j,(name,p) in enumerate(actualsubs):
  e=actualsubs[j+1][1] if j+1<len(actualsubs) else end
  add('Subclasses',name,p,'\n'.join(raw[p-1:max(p,e)]),classes=[tr[eng]],minLevel=3)
 limit=min(p for _,p in actualsubs)
 for pi in range(start-1,limit):
  for part in [left[pi],right[pi]]:
   matches=list(re.finditer(r'(?im)^\s*Level\s+(\d+):\s*([^\n]+)',part))
   for j,m in enumerate(matches):
    text=part[m.start():matches[j+1].start() if j+1<len(matches) else len(part)]
    if len(m[2])<80:add('Características',m[2].strip(),pi+1,text,classes=[tr[eng]],minLevel=int(m[1]))
# Antecedentes: 16 opções com metadados extraídos de cada bloco de origem.
bg=[('Acólito','Acolyte'),('Artesão','Artisan'),('Charlatão','Charlatan'),('Criminoso','Criminal'),('Artista','Entertainer'),('Fazendeiro','Farmer'),('Guarda','Guard'),('Guia','Guide'),('Eremita','Hermit'),('Mercador','Merchant'),('Nobre','Noble'),('Sábio','Sage'),('Marinheiro','Sailor'),('Escriba','Scribe'),('Soldado','Soldier'),('Viajante','Wayfarer')]
blocks=[]
for pi in range(176,184):
 part=raw[pi]
 matches=list(re.finditer(r'Ability Scores:\s*([\s\S]*?)Feat:\s*([\s\S]*?)Skill Proficiencies:\s*([\s\S]*?)Tool Proficiency:',part))
 for j,m in enumerate(matches):
  blocks.append((pi+1,part[m.start():matches[j+1].start() if j+1<len(matches) else len(part)],m))
for i,(name,eng) in enumerate(bg):
 page,text,m=blocks[i] if i<len(blocks) else (177+i//2,raw[176+i//2],None)
 abilities=[en for en in ['Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'] if m and en in m[1]]
 feat=re.sub(r'\(see chapter 5\)','',m[2]).strip().replace('\n',' ') if m else ''
 skills=m[3].strip().replace('\n',' ') if m else ''
 add('Antecedentes',name,page,text,english=eng,abilities=abilities,feat=feat,skills=skills)
sp=[('Aasimar','Aasimar',185,30),('Draconato','Dragonborn',186,30),('Anão','Dwarf',187,30),('Elfo','Elf',188,30),('Gnomo','Gnome',190,30),('Goliath','Goliath',191,35),('Halfling','Halfling',192,30),('Humano','Human',193,30),('Orc','Orc',194,30),('Tiefling','Tiefling',195,30)]
for j,(name,eng,p,speed) in enumerate(sp):
 end=sp[j+1][2] if j+1<len(sp) else 197
 add('Espécies',name,p,'\n'.join(raw[p-1:end]),english=eng,speed=speed)
# Tabelas de equipamentos: fonte completa preservada e linhas com itens pesquisáveis.
seenitems=set()
for pi in range(213,229):
 for line in layout[pi].splitlines():
  l=line.strip();parts=re.split(r'\s{2,}',l)
  if len(parts)>1 and re.search(r'\b(?:[0-9]+\s*[GSCPE]P|[0-9lI]+d[0-9]+)',l) and 2<len(parts[0])<40:
   name=parts[0]
   if name.lower() in seenitems or re.match(r'[0-9]|CHAPTER',name):continue
   seenitems.add(name.lower());add('Equipamento',name,pi+1,l)
# Cabeçalhos danificados no OCR, recuperados pelo índice e metadados da página.
recover=[('Create or Destroy Water',257,1,['Cleric','Druid'],'Transmutation'),('Ensnaring Strike',267,1,['Ranger'],'Conjuration'),('Eyebite',269,6,['Bard','Sorcerer','Warlock','Wizard'],'Necromancy'),("Rary’s Telepathic Bond",310,5,['Bard','Wizard'],'Divination'),('Stinking Cloud',320,3,['Bard','Sorcerer','Wizard'],'Conjuration'),("Tasha’s Hideous Laughter",330,1,['Bard','Warlock','Wizard'],'Enchantment')]
for name,p,lv,cl,school in recover:
 if not any(re.sub(r'[^a-z]','',e['name'].lower())==re.sub(r'[^a-z]','',name.lower()) for e in entries if e['kind']=='Magias'):
  add('Magias',name,p,raw[p-1],level=lv,classes=[tr[x] for x in cl],school=school)
book={'title':'Player’s Handbook 2024 — arquivo fornecido','language':'en','pages':pages,'entries':entries,'classes':tr,'sourcePages':len(raw),'note':'Texto extraído por OCR do arquivo fornecido; pode conter erros e tabelas desalinhadas. Use a página de referência para conferir.'}
Path('android-codice/assets/book-data.js').write_text('const BOOK='+json.dumps(book,ensure_ascii=False,separators=(',',':'))+';')
from collections import Counter
print('Catálogo:',Counter(e['kind'] for e in entries),'páginas com texto',len(pages),'bytes',Path('android-codice/assets/book-data.js').stat().st_size)
print('ANTECEDENTES',[(e['name'],e['abilities'],e['feat']) for e in entries if e['kind']=='Antecedentes'])
