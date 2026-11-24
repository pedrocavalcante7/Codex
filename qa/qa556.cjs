const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});



function check(code){return run(code);}
run("db.chars=[fresh('Saurian Test','Feiticeiro',1)];db.selected=db.chars[0].id;SETTINGS48.language='pt';Object.assign(wd(),{species:SAURIAN556,cls:'Feiticeiro',lineage:'Asa de Couro',cast:5,extra:{saurianCast556:'5'}});selections().species=SAURIAN556;c().species='Saurian';c().calc.acMode='none';c().attrs=[14,14,14,10,10,16];tab=2;render()");
assert.equal(check('SAURIAN_LINES556.length'),4);
assert.equal(check("W_LINE.Saurian.length"),4);
assert.equal(check("wextras().find(t=>t.key==='saurianCast556').options.length"),3);
assert.equal(check('speciesInfo445().fly'),45);
assert(check("spellEntries(c()).some(e=>e.id===WHISPERS556&&e.always&&e.daily===0)"));
assert.equal(check("spellEntries(c()).filter(e=>e.source.includes('Memória Ancestral')).length"),1);
for(const [line,names]of [['Asa de Couro',['Winged Creature','Powerful Aerial Build']],['Cauda de Martelo',['Armored Scales','Hammer Tail']],['Presa Afiada',['Predatory Rush','Hatched to Hunt']],['Pé Palmado',['Darkvision','Limited Amphibiousness','Trumpet']]]){
 run(`wd().lineage=${JSON.stringify(line)};recalc(c())`);
 for(const name of names)assert(check(`progressionRows47().some(r=>r.type==='species'&&r.feature?.original556===${JSON.stringify(name)})`),name);
 assert.equal(check("progressionRows47().filter(r=>r.type==='species').length"),2+names.length);
}
run("wd().lineage='Cauda de Martelo';recalc(c())");let ac=check('c().ac');for(let i=0;i<4;i++)run('recalc(c())');assert.equal(check('c().ac'),ac);
run("wd().lineage='Asa de Couro';recalc(c())");assert.equal(check('c().ac'),ac-1);
run("c().calc.acMode='manual';c().ac=17;wd().lineage='Cauda de Martelo';recalc(c());recalc(c())");assert.equal(check('c().ac'),18);run("wd().lineage='Pé Palmado';recalc(c())");assert.equal(check('c().ac'),17);assert.equal(check('speciesInfo445().swim'),30);
for(const [level,count]of [[1,1],[3,2],[5,3]]){run(`c().classes[0].level=${level};recalc(c())`);assert.equal(check("spellEntries(c()).filter(e=>e.source.includes('Memória Ancestral')).length"),count);}
assert.equal(check("automaticResources(c()).filter(r=>r.spellKey453?.startsWith('species:')&&r.max===1).length"),2);
run("selections().subclasses.Feiticeiro=DREAM556;c().subclass='Feitiçaria dos Sonhos';c().classes[0].level=3;recalc(c());render()");
for(const [lv,count]of [[2,0],[3,4],[5,6],[7,8],[9,10],[18,10]]){run(`c().classes[0].level=${lv};recalc(c())`);assert.equal(check("spellEntries(c()).filter(e=>e.source==='Feiticeiro · Feitiçaria dos Sonhos').length"),count,'spells '+lv);}
for(const lv of [3,6,14,18]){run(`c().classes[0].level=${lv};recalc(c())`);const levels=JSON.parse(check("JSON.stringify(progressionRows47().filter(r=>r.subId===DREAM556&&r.type!=='subclass').map(r=>r.level))"));assert(levels.includes(lv));assert(!levels.includes(1));}
run("c().classes[0].level=3;recalc(c());openDreams556();Math.random=()=>0;document.getElementById('dream-targets556').value='Aliado 1\\nAliado 2';rollDream556();saveDreams556()");
// Supply literal newline, not a backslash sequence.
if(check('playState().dreamTargets556.length')!==2){run("resetResources(c(),true);openDreams556();document.getElementById('dream-targets556').value=['Aliado 1','Aliado 2'].join(String.fromCharCode(10));rollDream556();saveDreams556()");}
assert.equal(check('playState().dreamTargets556.length'),2);
assert.equal(check("automaticResources(c()).filter(r=>r.key.startsWith('dream556:target:')&&r.max===1).length"),2);
run("c().classes[0].level=6;recalc(c());openDreams556();rollDream556()");assert.equal(check('dreamRoll556.choices.length'),8,'duplicates allow any dream');
run("const target556=playState().dreamTargets556[0];const row556=resourceRows().find(r=>r.key==='dream556:target:'+target556.id);resourceValue(row556);playState().resourceUsed[row556.key]=row556.max;refillDream556(target556.id)");
assert.equal(check("playState().resourceUsed['Feiticeiro:sorcery']"),1);assert.equal(check('playState().dreamTargets556[0].extra'),true);
run("resetResources(c(),true)");assert.equal(check('playState().dreamTargets556.length'),0);assert.equal(check('playState().dreamAssigned556'),false);
run("c().classes[0].level=18;recalc(c())");assert(check("automaticResources(c()).some(r=>r.key==='dream556:manifest')"));run("playState().resourceUsed['dream556:manifest']=1;repeatManifest556()");assert.equal(check("playState().resourceUsed['Feiticeiro:sorcery']"),10);
// The new spell has localized rules and references use the requested emphasis.
assert(check("formatRule47('Você conhece Sentir Sussurros.').includes('<em>Sentir Sussurros</em>')"));
run("openCharacterFeature47(progressionRows47().findIndex(r=>r.feature?.id==='dream556:1'))");assert(w.document.querySelector('#play-body button[onclick="openDreams556()"]'));assert.equal(w.document.querySelectorAll('#play-body table').length,1,'only one dreams table');
assert(check("libClass537.call(null).length>0"));
run("c().classes[0].level=4;recalc(c());openDreamSpells556()");const old=check("document.getElementById('dream-old556').value"),pool=JSON.parse(check("JSON.stringify(dreamReplacementPool556(document.getElementById('dream-old556').value).map(e=>({id:e.id,level:e.level,school:e.school})))"));assert(pool.length);assert(pool.every(e=>e.level===1&&['Enchantment','Illusion'].includes(e.school)));run('replaceDreamSpell556()');assert.equal(check('playState().dreamSwapLevel556'),4);assert(check(`playState().dreamSpells556[${JSON.stringify(old)}]`));
run("resetResources(c(),true);c().classes[0].level=1;recalc(c())");assert.equal(check("automaticResources(c()).filter(r=>r.key.startsWith('dream556:')).length"),0);
assert.equal(errors.length,0,errors.map(String).join('\n'));
console.log('PASS four Saurian lineages; flight/swim; AC automatic/manual without stacking; racial grants 1/3/5 and resources; Dream 3/6/14/18, 10 spells, dream table/roll/targets/refill/rest, spell replacement and level rollback');process.exit(0);
