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
run("SETTINGS48.language='en';db.chars=[fresh('A very long character title that must wrap inside its own column','Bruxo',5)];db.selected=db.chars[0].id;render();c().hp=7;c().maxhp=20;c().temp=3;updateHPDisplay();localize48()");
function readonly(){const header=w.document.getElementById('session-header');assert.equal(header.querySelectorAll('.hp-end,.hp-quantity,.hp-quantity547,.hp-quantity549,.temp-hp-add').length,0);assert(header.querySelector('.vitality-track'));assert.equal(header.querySelector('.hp-current550 b').textContent,run('c().hp+" / "+c().maxhp'));assert.equal(header.querySelector('.hp-temp550 b').textContent,run('String(c().temp)'));}
readonly();const crest=w.document.querySelector('.hero>.seal');assert.equal(crest.querySelector('.crest-frame').getAttribute('preserveAspectRatio'),'xMidYMid meet');assert.equal(w.getComputedStyle(w.document.querySelector('.hero')).gridTemplateColumns,'minmax(0,1fr) var(--level-crest-width561)');
run('openHPControls560()');let popup=w.document.getElementById('hp-controls560');assert(popup.querySelector('.session-vitals.hp-dialog561'));assert(popup.querySelector('.hp-bar-assembly .hp-minus'));assert(popup.querySelector('.hp-bar-assembly .hp-plus'));assert.equal(popup.querySelectorAll('.temp-hp-controls .temp-hp-add').length,2);assert(popup.querySelector('.hp-reset549'));assert(popup.querySelector('.hp-amount549'));assert.equal(popup.querySelector('#hp-control-amount560').type,'hidden');
const originalPopupBar=popup.querySelector('.vitality-track');run("document.getElementById('hp-control-amount560').value='5';changeHPControls560('hp',-1)");assert.equal(run('c().hp'),5);assert.equal(run('c().temp'),0);assert.equal(popup.querySelector('.hp-current550 b').textContent,'5 / 20');assert.equal(popup.querySelector('.vitality-track'),originalPopupBar,'HP actions update the existing themed controls without rebuilding them');readonly();
function nativePress(button){const down=new w.Event('pointerdown',{bubbles:true,cancelable:true});for(const [k,v]of Object.entries({button:0,pointerId:9,isPrimary:true,clientX:100,clientY:100}))Object.defineProperty(down,k,{value:v});button.dispatchEvent(down);button.dispatchEvent(new w.Event('pointerup',{bubbles:true}));button.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));}
run('hpAdjustment=1');nativePress(popup.querySelector('.hp-bar-assembly .hp-plus'));assert.equal(run('c().hp'),6,'native plus applies exactly once');readonly();
run('c().temp=3;updateHPDisplay()');nativePress(popup.querySelector('.temp-hp-remove561'));assert.equal(run('c().temp'),2,'themed temporary minus works through native pointer controls');readonly();run('c().temp=0;hpAdjustment=5;updateHPDisplay()');
run('increaseHPAmount()');assert.equal(popup.querySelector('.hp-amount549').textContent,'10');run('resetHPAmount549()');assert.equal(popup.querySelector('.hp-amount549').textContent,'1');
run("document.getElementById('hp-control-amount560').value='30';changeHPControls560('hp',1)");assert.equal(run('c().hp'),20);readonly();
run("document.getElementById('hp-control-amount560').value='8';changeHPControls560('temp',1)");assert.equal(run('c().temp'),8);assert(popup.querySelector('.vitality-temp'));readonly();
run("document.getElementById('hp-control-amount560').value='3';changeHPControls560('temp',-1)");assert.equal(run('c().temp'),5);assert.equal(popup.querySelector('.hp-temp550 b').textContent,'5');readonly();
run("document.getElementById('play-dialog').close();setHPHold560(false);document.getElementById('play-dialog').close();render()");readonly();assert.equal(run('openHPControls560()'),false);assert(!w.document.querySelector('#session-header .hp-plus'));
assert.deepEqual(errors.map(String),[]);console.log('PASS 5.61: header reserves crest width; HP panel stays read-only; hold dialog reuses themed controls; updates preserve nodes and damage/healing/temp rules; disabled hold has no inline fallback');process.exit(0);
