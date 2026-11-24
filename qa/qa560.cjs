const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};
// Settle dialog closes immediately in this functional DOM suite.
w.HTMLDialogElement.prototype.close=function(){this.open=false;};
(async()=>{
run("SETTINGS48.language='en';db.chars=[fresh('Controls','Bruxo',11)];db.selected=db.chars[0].id;render()");
assert.equal(run("phrase550('Arcano Místico',true)"),'Mystic Arcanum');assert.equal(run("translatedText48('Arcano Místico · Bruxo')"),'Mystic Arcanum · Warlock');assert.equal(run("translatedText48('choose arma')"),'Choose weapon');assert.equal(run("phrase550('Escolher arma…',true)"),'Choose weapon…');
run("SETTINGS48.language='pt'");assert.equal(run("phrase550('Mystic Arcanum',false)"),'Arcano Místico');
run("SETTINGS48.language='en';SETTINGS48.animations466={...ANIMATION_DEFAULTS466,wind:false,checkboxes:true};testPreferences560=JSON.stringify(SETTINGS48.animations466);setAllAnimations560(true)");assert.equal(run('animationEnabled466("background")'),false);assert.equal(run('animationEnabled466("checkboxes")'),false);assert(w.document.documentElement.classList.contains('animations-off560'));assert(w.document.getElementById('all-animations560').checked);assert.equal(run('effectTimers470.size'),0);run("document.createElement('div').animate([{opacity:0},{opacity:1}],{duration:400})");assert.equal(animations.at(-1).opts.duration,0,'master disables JavaScript animation duration');
run('setAllAnimations560(false)');assert.equal(run('JSON.stringify(SETTINGS48.animations466)'),run('testPreferences560'));assert.equal(run('animationEnabled466("wind")'),false);assert.equal(run('animationEnabled466("checkboxes")'),true);
run("document.getElementById('play-dialog').close();c().hp=7;c().maxhp=20;c().temp=3;updateHPDisplay();localize48()");
const bar=w.document.querySelector('#session-header .vitality-track');assert.equal(bar.dataset.hpHold560,'true');assert.equal(bar.querySelector('.vitality-base').getAttribute('aria-valuetext'),'7 of 20 hit points');
function pointer(type,x=100,y=100,extra={}){const e=new w.Event(type,{bubbles:true,cancelable:true});for(const [k,v]of Object.entries({button:0,pointerId:1,isPrimary:true,clientX:x,clientY:y,...extra}))Object.defineProperty(e,k,{value:v});bar.dispatchEvent(e);}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));pointer('pointerdown');await wait(490);assert(w.document.getElementById('hp-controls560'));assert.equal(run('c().hp'),7,'holding never changes HP');
run("document.getElementById('hp-control-amount560').value='5';changeHPControls560('hp',-1)");assert.equal(run('c().hp'),5,'temporary HP absorb damage first');assert.equal(run('c().temp'),0);
run("document.getElementById('hp-control-amount560').value='30';changeHPControls560('hp',1)");assert.equal(run('c().hp'),20,'healing is capped');
run("document.getElementById('hp-control-amount560').value='8';changeHPControls560('temp',1);document.getElementById('hp-control-amount560').value='3';changeHPControls560('temp',-1)");assert.equal(run('c().temp'),5);
run("document.getElementById('hp-control-amount560').value='0'");assert.equal(run("changeHPControls560('hp',-1)"),false);assert.equal(run('c().hp'),20);
run("document.getElementById('play-dialog').close()");pointer('pointerdown');pointer('pointermove',107,100);await wait(490);assert.equal(w.document.getElementById('play-dialog').open,false,'moving cancels hold');
pointer('pointerdown');pointer('pointerup');await wait(490);assert.equal(w.document.getElementById('play-dialog').open,false,'tap never opens hold controls');
run('setHPHold560(false)');assert.equal(w.document.getElementById('hold-hp560').checked,false);run("document.getElementById('play-dialog').close()");pointer('pointerdown');await wait(490);assert.equal(w.document.getElementById('play-dialog').open,false,'disabled preference is respected');
assert.equal(w.document.querySelector('#session-header .hp-plus'),null,'main HP panel is now read-only');
const crest=w.document.querySelector('.hero .seal .crest-frame');assert.equal(crest.getAttribute('preserveAspectRatio'),'xMidYMid meet');assert.equal(crest.getAttribute('viewBox'),'0 0 120 144');
run('saveSettings48()');assert.equal(run("JSON.parse(localStorage.getItem('codice-settings48')).holdHPControls560"),false);
assert.deepEqual(errors.map(String),[]);console.log('PASS 5.60 terms, master switch/preferences, HP hold/cancel/disabled controls, damage/heal/temp rules and proportional crest');process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
