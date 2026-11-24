const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};
run("SETTINGS48.language='pt';db.chars=[fresh('Test','Bruxo',1)];db.selected=db.chars[0].id;render();seedCreator548();ensureCreator554();");
assert.equal(run('invocationCount558()'),1);
for(let level=1;level<=20;level++){run(`wd().classes554=[{name:'Bruxo',level:${level}}];c().classes=[{name:'Bruxo',level:${level}}]`);assert.equal(run('document.createRange().createContextualFragment(invocationEditor558()).querySelectorAll("select[data-invocation558]").length'),[1,3,3,3,5,5,6,6,7,7,7,8,8,8,9,9,9,10,10,10][level-1]);}
run("wd().classes554=[{name:'Bruxo',level:5}];c().classes=[{name:'Bruxo',level:5}];c().invocations558=[]");
assert.match(run('invocationError558()'),/5/);
run("c().invocations558=[{id:'Pact of the Blade'},{id:'Thirsting Blade'},{id:'Eldritch Mind'},{id:'Armor of Shadows'},{id:'Ascendant Step'}]");
assert.equal(run('invocationError558(true)'),'');assert.equal(run('activeInvocations558().length'),5);
run("c().invocations558.push({id:'Devil’s Sight'})");assert.match(run('invocationError558()'),/exatamente/);run('c().invocations558.pop()');
run("c().invocations558[0]={id:'Pact of the Tome'}");assert.match(run('invocationError558()'),/pré-requisitos/);assert.equal(run("activeInvocations558().some(r=>r.id==='Thirsting Blade')"),false);
run("c().invocations558[1]={id:'Witch Sight'}");assert.match(run('invocationError558()'),/pré-requisitos/);
run("c().invocations558=[{id:'Eldritch Mind'},{id:'Eldritch Mind'},{id:'Armor of Shadows'},{id:'Ascendant Step'},{id:'Pact of the Tome'}]");assert.match(run('invocationError558()'),/diferentes/);
run("wd().classes554=[{name:'Bruxo',level:1}];c().classes=[{name:'Bruxo',level:1}];c().invocations558=[{id:'Eldritch Mind'}]");assert.equal(run('invocationError558(true)'),'');
assert.equal(run("invocationOptions558(0).some(e=>e.level>1)"),false);
run("document.querySelector('#wizard-body').innerHTML=invocationEditor558();enhanceSelects(document.querySelector('#wizard-body'));openChoiceDialog(document.querySelector('[data-invocation558]'))");assert.ok(w.document.querySelector('.invocation-group558'));run("document.querySelector('#choice-dialog').close()");
run("openManualSpell451('Bruxo')");assert.ok(w.document.querySelector('#play-dialog.spell-picker558'));assert.equal(run("[...document.querySelectorAll('#forced-options430 .spell-picker-group432')].map(n=>n.querySelector('h3').textContent)[0]"),'Truques · nível 0');
assert.equal(run("JSON.stringify(wentries('Magias').map(e=>e.id))===JSON.stringify(wentries('Magias').slice().sort(spellCompare558).map(e=>e.id))"),true);
run("document.querySelector('#forced-search430').value='fireball';filterForcedSpell430()");assert.ok(w.document.querySelector('#forced-options430').textContent.includes(run("spellName558(wentries('Magias').find(e=>e.name==='Fireball'))")));
run("document.querySelector('#play-dialog').close();openRulesMenu();librarySection537('spells')");assert.equal(run("document.querySelectorAll('.spell-reference558').length"),run("wentries('Magias').length"));
run("loadSpellReference558(document.querySelector('.spell-reference558'),wentries('Magias')[0].id)");assert.ok(w.document.querySelector('.spell-reference558 .spell-facts435'));
run("library537.query='fireball';renderLibList537()");assert.equal(w.document.querySelectorAll('.spell-reference558').length>0,true);
run("library537.query='zzzzzxzzzzz';renderLibList537()");assert.equal(w.document.querySelectorAll('.spell-reference558').length,0);
run("library537.query='';library537.spellLevel558='0';renderLibList537()");assert.equal(w.document.querySelectorAll('.spell-reference558').length,run("wentries('Magias').filter(e=>e.level===0).length"));
run('save()');assert.ok(JSON.parse(w.localStorage.getItem('codice2024')).chars[0].invocations558);

run("document.getElementById('rules-dialog').close();openCreationWizard();setClass554(0,'level',5);wizardIndex=5;wrender()");assert.equal(w.document.querySelectorAll('[data-invocation558]').length,5);
run("openChoiceDialog(document.querySelector('[data-invocation558=\"0\"]'))");const opt=run("[...activeChoiceSelect.options].findIndex(o=>o.value==='Pact of the Blade')");run(`chooseOption(${opt})`);assert.equal(run('c().invocations558[0].id'),'Pact of the Blade');
run("setInvocation558(1,'Thirsting Blade');setInvocation558(2,'Eldritch Mind');setInvocation558(3,'Armor of Shadows');setInvocation558(4,'Ascendant Step')");assert.equal(run('invocationError558(true)'),'');assert.equal(run("progressionRows47().filter(r=>r.feature?.id?.startsWith('invocation558:')).length"),5);
run("setClass554(0,'level',1);wizardIndex=5;wrender()");assert.equal(w.document.querySelectorAll('[data-invocation558]').length,1);assert.equal(run('c().invocations558.length'),1);
assert.deepEqual(errors.map(e=>String(e)),[]);console.log('5.58: spell sorting, styled picker, reference search, all 20 invocation counts, prerequisite/duplicate/limit validation and persistence PASS');process.exit(0);
