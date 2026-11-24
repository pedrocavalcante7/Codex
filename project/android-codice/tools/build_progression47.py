"""Index all class and subclass feature headings from the bundled user-provided PHB OCR."""
import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1];s=(root/'assets/book-data.js').read_text();book=json.loads(s[s.index('{'):].rstrip().rstrip(';'));entries=book['entries']
pages={p['page']:p['text'] for p in book['pages']}
def clean(t):
 t=re.sub(r'\u00ad\s*','',t);t=re.sub(r'(?im)^.*CHAPTER\s*3.*$','',t)
 return '\n'.join(l.strip() for l in t.splitlines() if not l.strip() or (len(l.strip())>2 and not re.fullmatch(r'[\W\d_A-Z]{1,12}',l.strip()))).strip()
# Actual headings, rather than the approximate page labels in the old catalogue.
groups={
'Bárbaro':(50,57,[(53,'Path of the Berserker'),(54,'Path of t . < Wild Heart'),(55,'Path of the World Tree'),(56,'Path of the Zealot')]),
'Bardo':(58,67,[(63,'College of Dance'),(64,'College of Glamour'),(65,'College of Lore'),(66,'College of Valor _')]),
'Clérigo':(68,77,[(72,'Life Domain___'),(73,'Light Domain _'),(74,'Trickery Domain___'),(75,'War Domain___')]),
'Druida':(78,89,[(83,'Circle of the Land\n'),(85,'Circle of the Moon\n'),(86,'Circle of the Sea\n'),(87,'Circle of the Stars\n')]),
'Guerreiro':(90,99,[(92,'Battle Master ___'),(95,'Champion __'),(95,'Eldritch Knight\n'),(97,'Psi Warrior___')]),
'Monge':(100,107,[(103,'Warrior of_Mercy'),(104,'Warrior of Shadow___'),(105,'Warrior of the Elements\n'),(106,'Warrior of the Open Hand\n')]),
'Paladino':(108,117,[(112,'Oath of Devotion___'),(113,'Oath of Glory\n'),(114,'Oath of the Ancients___'),(115,'Oath of Vengeance\n')]),
'Patrulheiro':(118,127,[(121,'Beast Master\n'),(123,'Fey Wanderer\n'),(124,'Gloom Stalker___'),(126,None)]),
'Ladino':(128,137,[(131,'Arcane Trickster\n'),(133,'Assassin ___'),(134,'SOULKNIFE ___'),(136,'Thief _')]),
'Feiticeiro':(138,151,[(144,'Aberrant Sorcery\n'),(145,'Clockwork Sorcery\n'),(147,'Draconic Sorcery\n'),(148,'Wild Magic Sorcery\n')]),
'Bruxo':(152,163,[(158,'Archfey Patron___'),(159,'Celestial Patron _'),(160,'Fiend Patron___'),(161,'Great Old One Patron___')]),
'Mago':(164,175,[(171,'Abjurer___'),(172,'Diviner___'),(173,'Evoker\n'),(174,'Illusio 1ST')])}
fixes={':..lvel 6: ImfrovED Warding Flare':'Level 6: Improved Warding Flare','ever 3: Spellcasting':'Level 3: Spellcasting','ZL 3: Monk Subclass':'Level 3: Monk Subclass','Levei. 7: Beguiling Twist':'Level 7: Beguiling Twist','Level lo; Dragon Companion':'Level 18: Dragon Companion','Level IL Stride of the Elements':'Level 11: Stride of the Elements','Level IL Mystic Arcanum':'Level 11: Mystic Arcanum','15 10 4 3 2 Level 17: Spell Thief':'Level 17: Spell Thief'}
for n,t in list(pages.items()):
 for a,b in fixes.items():t=t.replace(a,b)
 t=re.sub(r'(?m)^Level L[ .:]*', 'Level 1: ',t)
 t=t.replace('Level 4 Ability Score Improvement','Level 4: Ability Score Improvement')
 pages[n]=t
heading=re.compile(r'(?m)^[ \t]*Level[ \t]+([0-9]+|L|I)[ \t]*[:;.\-=*]+[ \t]*([A-Z][^\n]+)')
def features(segment,cls,sub):
 ms=list(heading.finditer(segment));out=[]
 for i,m in enumerate(ms):
  n=1 if m[1].upper() in ['L','I'] else int(m[1]);name=m[2].strip(' ,_.*:');text=segment[m.end():ms[i+1].start() if i+1<len(ms) else len(segment)]
  if name=='Proficiency':continue
  if not 1<=n<=20 or re.search(r'^(?:Bard|Wizard|Cleric|Druid|Paladin|Ranger|Sorcerer|Warlock) Spells',name,re.I):continue
  name=name.replace('Cíuric Subclass','Cleric Subclass')
  # Do not swallow following spell-list / metamagic / invocation appendices.
  text=re.split(r'(?im)^(?:Cantrips\s*\(|Level [i1] (?:Bard|Wizard|Cleric|Druid|Paladin|Ranger|Sorcerer|Warlock) Spells|Metamagic Options|Eldritch Invocation Options|Barbarian Subclasses|Bard Subclasses|Cleric Subclasses|Druid Subclasses|Fighter Subclasses|Monk Subclasses|Paladin Subclasses|Ranger Subclasses|Rogue Subclasses|Sorcerer Subclasses|Warlock Subclasses|Wizard Subclasses)\b',text)[0]
  out.append(dict(id=f'{sub or cls}:{n}:{len(out)}',name=name,level=n,text=clean(text),cls=cls,subclass=sub))
 return out
out={}
for cls,(start,end,bounds) in groups.items():
 full='';offset={}
 for n in range(start,end+1):offset[n]=len(full);full+=pages.get(n,'')+'\n'
 positions=[];subs=[e for e in entries if e['kind']=='Subclasses' and cls in e['classes']]
 for (page,marker),entry in zip(bounds,subs):
  idx=0 if marker is None else pages[page].find(marker)
  assert idx>=0,(cls,page,marker)
  positions.append((offset[page]+idx,entry))
 base=features(full[:positions[0][0]],cls,None);data={'base':base,'subclasses':{}}
 for i,(pos,e) in enumerate(positions):
  raw=full[pos:positions[i+1][0] if i+1<len(positions) else len(full)]
  data['subclasses'][e['id']]={'id':e['id'],'name':e['name'],'page':bounds[i][0],'text':clean(raw),'features':features(raw,cls,e['id']),'tables':[],'spells':{}}
 # Repeated class-level grants are real entries, even when the book describes them just once.
 repeat={'Ability Score Improvement':[4,8,12,16]+([6,14] if cls=='Guerreiro' else [10] if cls=='Ladino' else []),'Expertise':{'Bardo':[2,9],'Ladino':[1,6],'Patrulheiro':[9]}.get(cls,[]),'Mystic Arcanum':[11,13,15,17] if cls=='Bruxo' else []}
 for name,levels in repeat.items():
  original=next((f for f in base if f['name']==name),None)
  assert original or not levels,(cls,name)
  for n in levels:
   if not any(f['name']==name and f['level']==n for f in base):base.append({**original,'id':f'{cls}:{n}:{name}','level':n})
 out[cls]=data
# Column reading order on page 115 moves these Ancients headings below the next oath title.
anc=out['Paladino']['subclasses']['619'];ven=out['Paladino']['subclasses']['620']
for f in ven['features'][:]:
 if f['name'] in ['Aura of Warding','Elder Champion']:
  ven['features'].remove(f);f['subclass']='619';anc['features'].append(f)
# The source layout preserves the interrupted Glamour paragraph on pages 64–65.
layout64=next(p.get('layout',p['text']) for p in book['pages'] if p['page']==64)
layout64='\n'.join(l.strip() for l in layout64.splitlines())
layout65=next(p.get('layout',p['text']) for p in book['pages'] if p['page']==65)
layout65='\n'.join(l.strip() for l in layout65.splitlines())
part=layout64[layout64.index('Level 3: Beguiling Magic'):]+ '\n'+layout65.split('Level 14: Unbreakable Majesty')[0]
correct=features(part,'Bardo','473')
for f in out['Bardo']['subclasses']['473']['features']:
 match=next((a for a in correct if a['name']==f['name'] and a['level']==f['level']),None)
 if match:f['text']=match['text']
# Attach structured d100 / d6 tables from the source, for both reading and automatic rolls.
def table(raw,pattern,sides,title):
 rows=[];ms=list(re.finditer(pattern,raw,re.M))
 for i,m in enumerate(ms):
  lo=int(m[1]);hi=int(m[2] or m[1]) if sides==100 else lo
  if sides==100 and hi==0:hi=100
  text=raw[m.end():ms[i+1].start() if i+1<len(ms) else len(raw)]
  text=re.sub(r'(?im)^[Il1]d[Il1oO0]+\s+Effect\s*$','',text)
  rows.append({'min':lo,'max':hi,'text':clean(text)})
 return {'name':title,'sides':sides,'rows':rows}
w=out['Feiticeiro']['subclasses']['533'];raw=next(e['text'] for e in entries if e['id']=='533');w['tables']=[table(raw,r'^(\d{2})[-–](\d{2})\s+',100,'Wild Magic Surge')];assert len(w['tables'][0]['rows'])==25
f=out['Patrulheiro']['subclasses']['635'];raw=next(p['text'] for p in book['pages'] if p['page']==123).split('Feywild Gifts\n')[-1].split('Level 3: Otherworldly')[0];f['tables']=[table(raw,r'^([1-6])()\s+',6,'Feywild Gifts')];assert len(f['tables'][0]['rows'])==6
cw=out['Feiticeiro']['subclasses']['531'];raw=next(p['text'] for p in book['pages'] if p['page']==145).split('Manifestations of Order\n')[-1].split('Level 3: Restore Balance')[0];cw['tables']=[table(raw,r'^([1-6])()\s+',6,'Manifestations of Order')];assert len(cw['tables'][0]['rows'])==6
stars=out['Druida']['subclasses']['521'];raw=next(p['text'] for p in book['pages'] if p['page']==87).split('Star Map\n')[-1].split('Level 3: Starry Form')[0];stars['tables']=[table(raw,r'^([1-6])()\s+',6,'Star Map')];assert len(stars['tables'][0]['rows'])==6
# Spell tables use subclass level, never total character level.
spellnames=[e for e in entries if e['kind']=='Magias']
def norm(s):return re.sub('[^a-z0-9]','',s.lower().replace('’',"'"))
spellmap={norm(e['name']):e['id'] for e in spellnames}
def addsp(sub,level,names):
 target=next(d['subclasses'][sub] for d in out.values() if sub in d['subclasses'])
 for name in names:
  assert norm(name) in spellmap,(sub,level,name)
  target['spells'].setdefault(str(level),[]).append(spellmap[norm(name)])
# Explicit tables avoid interpreting spell-circle columns as class levels.
tables={
'501':{3:['Aid','Bless','Cure Wounds','Lesser Restoration'],5:['Mass Healing Word','Revivify'],7:['Aura of Life','Death Ward'],9:['Greater Restoration','Mass Cure Wounds']},
'502':{3:['Burning Hands','Faerie Fire','Scorching Ray','See Invisibility'],5:['Daylight','Fireball'],7:['Arcane Eye','Wall of Fire'],9:['Flame Strike','Scrying']},
'503':{3:['Charm Person','Disguise Self','Invisibility','Pass without Trace'],5:['Hypnotic Pattern','Nondetection'],7:['Confusion','Dimension Door'],9:['Dominate Person','Modify Memory']},
'504':{3:['Guiding Bolt','Magic Weapon','Shield of Faith','Spiritual Weapon'],5:['Crusader’s Mantle','Spirit Guardians'],7:['Fire Shield','Freedom of Movement'],9:['Hold Monster','Steel Wind Strike']},
'519':{3:['Cure Wounds','Moonbeam','Starry Wisp'],5:['Conjure Animals'],7:['Fount of Moonlight'],9:['Mass Cure Wounds']},
'520':{3:['Fog Cloud','Gust of Wind','Ray of Frost','Shatter','Thunderwave'],5:['Lightning Bolt','Water Breathing'],7:['Control Water','Ice Storm'],9:['Conjure Elemental','Hold Monster']},
'530':{3:['Arms of Hadar','Calm Emotions','Detect Thoughts','Dissonant Whispers','Mind Sliver'],5:['Hunger of Hadar','Sending'],7:['Evard’s Black Tentacles','Summon Aberration'],9:['Rary’s Telepathic Bond','Telekinesis']},
'531':{3:['Aid','Alarm','Lesser Restoration','Protection from Evil and Good'],5:['Dispel Magic','Protection from Energy'],7:['Freedom of Movement','Summon Construct'],9:['Greater Restoration','Wall of Force']},
'532':{3:['Alter Self','Chromatic Orb','Command','Dragon’s Breath'],5:['Fear','Fly'],7:['Arcane Eye','Charm Monster'],9:['Legend Lore','Summon Dragon']},
'617':{3:['Protection from Evil and Good','Shield of Faith'],5:['Aid','Zone of Truth'],9:['Beacon of Hope','Dispel Magic'],13:['Freedom of Movement','Guardian of Faith'],17:['Commune','Flame Strike']},
'618':{3:['Guiding Bolt','Heroism'],5:['Enhance Ability','Magic Weapon'],9:['Haste','Protection from Energy'],13:['Compulsion','Freedom of Movement'],17:['Legend Lore','Yolande’s Regal Presence']},
'619':{3:['Ensnaring Strike','Speak with Animals'],5:['Misty Step','Moonbeam'],9:['Plant Growth','Protection from Energy'],13:['Ice Storm','Stoneskin'],17:['Commune with Nature','Tree Stride']},
'620':{3:['Bane','Hunter’s Mark'],5:['Hold Person','Misty Step'],9:['Haste','Protection from Energy'],13:['Banishment','Dimension Door'],17:['Hold Monster','Scrying']},
'635':{3:['Charm Person'],5:['Misty Step'],9:['Summon Fey'],13:['Dimension Door'],17:['Mislead']},
'636':{3:['Disguise Self'],5:['Rope Trick'],9:['Fear'],13:['Greater Invisibility'],17:['Seeming']},
'486':{3:['Calm Emotions','Faerie Fire','Misty Step','Phantasmal Force','Sleep'],5:['Blink','Plant Growth'],7:['Dominate Beast','Greater Invisibility'],9:['Dominate Person','Seeming']},
'487':{3:['Aid','Cure Wounds','Guiding Bolt','Lesser Restoration','Light','Sacred Flame'],5:['Daylight','Revivify'],7:['Guardian of Faith','Wall of Fire'],9:['Greater Restoration','Summon Celestial']},
'488':{3:['Burning Hands','Command','Scorching Ray','Suggestion'],5:['Fireball','Stinking Cloud'],7:['Fire Shield','Wall of Fire'],9:['Geas','Insect Plague']},
'489':{3:['Detect Thoughts','Dissonant Whispers','Phantasmal Force','Tasha’s Hideous Laughter'],5:['Clairvoyance','Hunger of Hadar'],7:['Confusion','Summon Aberration'],9:['Modify Memory','Telekinesis']},
'472':{},'473':{3:['Charm Person','Mirror Image'],6:['Command']},'521':{3:['Guidance','Guiding Bolt']},'599':{3:['Minor Illusion']},'600':{3:['Elementalism']},'561':{3:['Mage Hand']},'586':{3:['Minor Illusion'],6:['Summon Beast','Summon Fey']},'549':{18:['Telekinesis']},'598':{},'462':{}
}
for sub,t in tables.items():
 for n,names in t.items():addsp(sub,n,names)
# Choice-dependent Circle of Land tables, selected on a Long Rest.
land={'Arid':{3:['Blur','Burning Hands','Fire Bolt'],5:['Fireball'],7:['Blight'],9:['Wall of Stone']},'Polar':{3:['Fog Cloud','Hold Person','Ray of Frost'],5:['Sleet Storm'],7:['Ice Storm'],9:['Cone of Cold']},'Temperate':{3:['Misty Step','Shocking Grasp','Sleep'],5:['Lightning Bolt'],7:['Freedom of Movement'],9:['Tree Stride']},'Tropical':{3:['Acid Splash','Ray of Sickness','Web'],5:['Stinking Cloud'],7:['Polymorph'],9:['Insect Plague']}}
for name,t in land.items():
 out['Druida']['subclasses']['518'].setdefault('landSpells',{})[name]={str(n):[spellmap[norm(s)] for s in names] for n,names in t.items()}
# Features elsewhere that always prepare named spells.
core={'Paladino':{2:['Divine Smite'],5:['Find Steed']},'Patrulheiro':{1:['Hunter’s Mark']},'Druida':{1:['Speak with Animals'],2:['Find Familiar']},'Bruxo':{9:['Contact Other Plane']}}
for cls,t in core.items():out[cls]['spells']={str(n):[spellmap[norm(s)] for s in names] for n,names in t.items()}
(root/'assets/progression-data47.js').write_text('const PROGRESSION47='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print('Indexed',sum(len(d['base']) for d in out.values()),'class features;',sum(len(s['features']) for d in out.values() for s in d['subclasses'].values()),'subclass features across',sum(len(d['subclasses']) for d in out.values()),'subclasses')
Path('progression47-audit.json').write_text(json.dumps({k:{'base':[(f['level'],f['name']) for f in d['base']],'subclasses':{s['name']:[(f['level'],f['name']) for f in s['features']] for s in d['subclasses'].values()}} for k,d in out.items()},indent=2,ensure_ascii=False))
