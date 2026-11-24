const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
run("db.chars=[fresh('Legacy','Feiticeiro',1)];db.selected=db.chars[0].id;c().sorcererRules557='2014';selections().subclasses.Feiticeiro=DREAM556;c().attrs=[10,14,14,10,10,16];tab=0;render()");
assert.equal(check('subclassLevel557("Feiticeiro")'),1);assert.equal(check('subclassLevel557("Paladino")'),3);
assert(!check("progressionRows47().some(r=>r.feature?.name==='Innate Sorcery')"));assert(!check("automaticResources(c()).some(r=>r.key==='Feiticeiro:innate')"));
assert.equal(check("progressionRows47().filter(r=>r.feature?.id?.startsWith('dream556:')).length"),2);
assert.equal(check("spellEntries(c()).filter(r=>r.source==='Feiticeiro · Feitiçaria dos Sonhos').length"),2);
assert.equal(check("KNOWN451.Feiticeiro[1]"),3);assert.equal(check("KNOWN451.Feiticeiro[19]"),15);
run("openDreams556();document.getElementById('dream-targets556').value='Aliado';rollDream556();saveDreams556()");assert.equal(check('playState().dreamTargets556.length'),1);assert(check("automaticResources(c()).some(r=>r.key.startsWith('dream556:target:'))"));
run("c().classes[0].level=2;recalc(c());openDreamSpells556()");assert(w.document.getElementById('dream-old556'));assert.equal(check("document.getElementById('dream-old556').options.length"),2);
run("c().classes[0].level=3;recalc(c())");assert.equal(check("spellEntries(c()).filter(r=>r.source==='Feiticeiro · Feitiçaria dos Sonhos').length"),4);
assert(check("progressionRows47().some(r=>r.feature?.name==='Metamagic'&&r.level===3)"));
run("c().classes[0].level=19;recalc(c())");assert(check("asiLevel('Feiticeiro',19)"));assert(!check("progressionRows47().some(r=>r.feature?.name==='Epic Boon')"));
run("c().classes[0].level=20;recalc(c());playState().resourceUsed||={};playState().resourceUsed['Feiticeiro:sorcery']=10;resetResources(c(),false)");assert.equal(check("playState().resourceUsed['Feiticeiro:sorcery']"),6);run("resetResources(c(),true)");assert.equal(check("playState().resourceUsed['Feiticeiro:sorcery']"),0);
run("c().classes[0].level=1;selections().subclasses.Feiticeiro=DRACONIC2014_557;c().calc.hp=true;c().calc.acMode='none';c().calc.draconicHP=false;recalc(c())");assert.equal(check('c().maxhp'),9);assert.equal(check('c().ac'),15);let ac=check('c().ac');run('recalc(c());recalc(c())');assert.equal(check('c().ac'),ac);
run("db.chars.push(fresh('Modern','Feiticeiro',3));db.selected=db.chars[1].id;selections().subclasses.Feiticeiro=DREAM556;render()");assert.equal(check('subclassLevel557("Feiticeiro")'),3);assert(check("automaticResources(c()).some(r=>r.key==='Feiticeiro:innate')"));assert.equal(check('KNOWN451.Feiticeiro[1]'),4);assert(check("progressionRows47().some(r=>r.feature?.name==='Innate Sorcery')"));
run("db.selected=db.chars[0].id");assert.equal(check('KNOWN451.Feiticeiro[1]'),3);assert(!check("automaticResources(c()).some(r=>r.key==='Feiticeiro:innate')"));
assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS edition isolation, origin at 1, no Innate feature/resource, Dream spells 1/3 and swaps at 2, known-spell limits, Metamagic at 3, ASI19, restoration20, Draconic HP/AC and untouched 2024');process.exit(0);
