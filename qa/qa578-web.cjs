const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=(process.env.ASSET_DIR573||'/workspace/sites/codice-web/.sites-checkout/dist'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://codice-aventureiro-pedro.richibis14.chatgpt.site/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));












run("SETTINGS48.language='en';db.chars=[fresh('First','Mago',3)];db.selected=db.chars[0].id;tab=1;render()");
function controls(){const root=w.document.querySelector('.attack-table .global-roll-modifiers');assert(root.classList.contains('compact-modifiers510'));assert.equal(root.querySelectorAll('.modifier-toggle56').length,2);assert.equal(root.querySelectorAll('.bonus-expression48').length,2);assert(!root.querySelector('input[type=checkbox],h4'));return root;}
let root=controls();root.querySelector('.modifier-toggle56').click();assert.equal(run('globalMods46().attack.enabled'),true);root=controls();assert.equal(root.querySelector('.modifier-toggle56').getAttribute('aria-pressed'),'true');root.querySelectorAll('.modifier-toggle56')[1].click();assert.equal(run('globalMods46().damage.enabled'),true);
run("setGlobalMod46('attack','bonus',3);setGlobalMod46('damage','bonus',2);render();render()");root=controls();assert(root.querySelectorAll('.bonus-expression48')[0].textContent.includes('3'));assert(root.querySelectorAll('.bonus-expression48')[1].textContent.includes('2'));root.querySelector('.bonus-expression48').click();assert(w.document.getElementById('play-dialog').open);w.document.getElementById('play-dialog').close();
run("SETTINGS48.language='pt';render()");root=controls();assert(root.querySelector('.modifier-toggle56').textContent.includes('Ataques'));assert.equal(run('globalMods46().attack.bonus'),3);assert.equal(run('globalMods46().damage.bonus'),2);
assert.deepEqual(errors,[]);console.log('PASS 5.78: attack/damage modifier controls match skills/saves, enabled toggles and numeric editing remain functional, values survive rerender and language changes');process.exit(0);
