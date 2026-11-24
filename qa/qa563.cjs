const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};
w.HTMLDialogElement.prototype.close=function(){this.open=false;};
const click=el=>{assert(el,'required control exists');el.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));};
function name(value){const input=w.document.getElementById('wizard-name440');assert(input);input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));}
function complete(){run("wanswer('species',wentries('Espécies').find(e=>e.name==='Orc').id);wanswer('sex454','masculino');wanswer('background',wentries('Antecedentes').find(e=>e.name==='Fazendeiro').id);[15,14,13,12,10,8].forEach((n,i)=>wanswer('base'+i,n));wanswer('skill0',2);wanswer('skill1',7);for(const q of wextras()){const index=q.key==='language1'?1:q.key.startsWith('mastery')?Number(q.key.slice(-1)):0;const option=q.options[index]??q.options[0];wanswer('extra:'+q.key,Array.isArray(option)?option[0]:option);}setStyle554('Guerreiro',wentries('Talentos').find(e=>e.name==='Defense').id)");for(let i=0;i<7;i++){assert.equal(run('wizardIndex'),i);click(w.document.getElementById('wizard-next'));assert.equal(run('wizardIndex'),i+1);}click(w.document.getElementById('wizard-next'));assert.equal(run('wd().completed547'),true);assert.equal(w.document.getElementById('creation-wizard').open,false);}
run("SETTINGS48.language='pt-BR';db.chars=[];db.selected=null;render()");
click(w.document.querySelector('.brand-row .new'));assert(w.document.getElementById('creation-wizard').open);assert.equal(run('db.chars.length'),0);click(w.document.getElementById('wizard-next'));assert.equal(run('db.chars.length'),0);assert(w.document.getElementById('wizard-name-error440').textContent.trim());w.document.getElementById('creation-wizard').close();
click([...w.document.querySelectorAll('#view button')].find(el=>el.getAttribute('onclick')==='create()'));assert(w.document.getElementById('creation-wizard').open);name('Primeira aventura');assert.equal(run('db.chars.length'),0);click(w.document.getElementById('wizard-next'));assert.equal(run('wd().cls'),'Guerreiro');assert.equal(run('wizardIndex'),0);complete();assert.equal(run('db.chars.length'),1);assert.equal(run('c().name'),'Primeira aventura');
run('c().hp=Math.max(1,c().maxhp-2);save()');const before=run('JSON.stringify(c())');click(w.document.querySelector('.brand-row .new'));name('Segunda aventura');assert.equal(run('JSON.stringify(c())'),before,'opening the name stage does not modify the selected sheet');click(w.document.getElementById('wizard-next'));assert.equal(run('db.chars.length'),2);complete();assert.equal(run('JSON.stringify(db.chars[0])'),before,'creating another sheet preserves the original injured sheet');assert.equal(JSON.parse(w.localStorage.getItem('codice2024')).chars.length,2);
run("wd().step=-1;openCreationWizard();renameRenders562=0;renameOriginal562=render;render=function(){renameRenders562++;return renameOriginal562()}");for(const value of ['R','Re','Ren','Reno','Renomeada'])name(value);assert.equal(run('renameRenders562'),0,'typing a name does not rebuild the sheet');assert.equal(run('c().name'),'Renomeada');assert.equal(w.document.getElementById('title').textContent,'Renomeada');assert.equal(JSON.parse(w.localStorage.getItem('codice2024')).chars[1].name,'Renomeada');w.document.getElementById('creation-wizard').close();
let native=0,browser=0;w.CodiceAndroid.haptic=()=>native++;w.navigator.vibrate=()=>{browser++;return true};run('SETTINGS48.haptics562=true;hpTouchFeedback()');assert.equal(native,1);run('setHaptics562(false);hpTouchFeedback()');assert.equal(native,1);assert.equal(browser,0);assert.equal(w.document.getElementById('haptics562').checked,false);assert.equal(run('loadSettings48().haptics562'),false);delete w.CodiceAndroid.haptic;run('SETTINGS48.haptics562=true;hpTouchFeedback()');assert.equal(browser,1);run('SETTINGS48.haptics562=false;hpTouchFeedback()');assert.equal(browser,1);w.document.getElementById('play-dialog').close();
const button=w.document.createElement('button'),input=w.document.createElement('input');w.document.body.append(button,input);const held=new w.Event('contextmenu',{bubbles:true,cancelable:true});button.dispatchEvent(held);assert.equal(held.defaultPrevented,true);const editing=new w.Event('contextmenu',{bubbles:true,cancelable:true});input.dispatchEvent(editing);assert.equal(editing.defaultPrevented,false,'text editing remains native');
run("SETTINGS48.tabMotion471=true;SETTINGS48.disableAllAnimations560=false;SETTINGS48.animations466={...ANIMATION_DEFAULTS466,other:true};factoryCalls562=0;originalMagic562=magic;originalCombat562=combat;magic=function(){factoryCalls562++;return originalMagic562()};combat=function(){factoryCalls562++;return originalCombat562()};openSettings48();sheetPages559.clear();sheetPager559.schedule()");for(const [id,cb]of [...idleJobs]){idleJobs.delete(id);cb({timeRemaining:()=>50});}assert.equal(run('factoryCalls562'),0,'hidden page factories never run while a dialog is open');
const originalRAF=w.requestAnimationFrame,previousFrame=run('heroAlignmentFrame562');if(previousFrame)w.cancelAnimationFrame(previousFrame);run('heroAlignmentFrame562=0');let raf=0,callback;w.requestAnimationFrame=cb=>{raf++;callback=cb;return 987};run('scheduleHeroAlignment562();scheduleHeroAlignment562();scheduleHeroAlignment562()');assert.equal(raf,1,'layout alignment is coalesced into one frame');callback();w.requestAnimationFrame=originalRAF;

run("wd().species=HEXBLOOD_ID;c().species='Hexblood';c().bookChoices.species=HEXBLOOD_ID;wd().extra.size='Pequeno';wd().extra.hexCast=3");
assert.equal(run("wentries('Espécies').filter(e=>e.name==='Hexblood').length"),1);
assert(run('wextras().some(q=>q.key==="hexCast")'));assert(run('wextras().some(q=>q.key==="size")'));
for(const attr of [3,4,5]){run('wd().extra.hexCast='+attr);const spells=run('spellEntries(c()).filter(e=>e.key==="species:Hex"||e.key==="species:Disguise Self")');assert.equal(spells.length,2);assert(spells.every(e=>e.always&&e.daily===1&&e.attr===attr&&!e.canPrepare451));}
assert.equal(run('speciesInfo445().size'),'Pequeno');assert.equal(run('speciesInfo445().speed'),30);assert.equal(run('speciesInfo445().darkvision'),60);
run("SETTINGS48.language='en'");assert.equal(run('speciesInfo445().type'),'Fey');assert(run('libSpecies537(getBook(HEXBLOOD_ID))').includes('Distant Message'));
run("SETTINGS48.language='pt-BR'");assert.equal(run('speciesInfo445().type'),'Feérico');assert(run('libSpecies537(getBook(HEXBLOOD_ID))').includes('Mensagem Distante'));
assert.equal(run('automaticResources(c()).filter(r=>r.key==="hexblood:token").length'),1);
run("playState().resourceUsed['hexblood:token']=1;playState().spellUsed['species:Hex']=1;playState().spellUsed['species:Disguise Self']=1;resetResources(c(),false)");assert.equal(run("playState().resourceUsed['hexblood:token']"),1);assert.equal(run("playState().spellUsed['species:Hex']"),1);
run('resetResources(c(),true)');assert.equal(run("playState().resourceUsed['hexblood:token']"),0);assert.equal(run("playState().spellUsed['species:Hex']||0"),0);assert.equal(run("playState().spellUsed['species:Disguise Self']||0"),0);
run("c().species='Orc';c().bookChoices.species='';wd().species=''");assert.equal(run('spellEntries(c()).filter(e=>e.key==="species:Hex"||e.key==="species:Disguise Self").length'),0);assert.equal(run('automaticResources(c()).filter(r=>r.key==="hexblood:token").length'),0);
console.log('PASS HEXBLOOD: catalog PT/EN, both sizes, Fey type, 3 casting abilities, permanent spells, independent daily uses, short/long rests and species removal');
assert.deepEqual(errors.map(String),[]);console.log('PASS 5.62: + and Start creation, blank/cancel paths, two completed sheets preserving existing HP, no render per name keystroke, haptic native/browser preference, subtle control selection, modal warmup pause and coalesced layout');process.exit(0);
