const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=process.env.ASSET_DIR573||path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));










run("SETTINGS48.language='en';db.chars=[fresh('Mage','Mago',3)];db.selected=db.chars[0].id;tab=2;render()");
function check(){const card=w.document.querySelector('.class-spells451');assert(card);const title=card.querySelector(':scope > .spell-parchment576');assert(title);assert(title.querySelector('.spell-heading540').textContent.includes('Spellcasting'));assert.equal(title.querySelectorAll('.spell-actions540 button').length,3);assert(!card.querySelector(':scope > .spell-title430'));assert.equal(w.getComputedStyle(title).paddingLeft,'16px');assert.equal(w.getComputedStyle(title).paddingRight,'16px');return {card,title};}
let {card,title}=check();title.click();assert([...card.children].filter(x=>x!==title).every(x=>x.classList.contains('panel-hidden469')));title.click();assert([...card.children].filter(x=>x!==title).every(x=>!x.classList.contains('panel-hidden469')));
run('render();render()');check();assert.equal(w.document.querySelectorAll('.spell-parchment576').length,1);
run('openSpellFilters540()');assert(w.document.getElementById('play-dialog').open);w.document.getElementById('play-dialog').close();
assert.deepEqual(errors,[]);console.log('PASS 5.76: shared full-width parchment, 16px symmetric insets, internal controls, rerender idempotence, collapse/expand and spell filters');process.exit(0);
