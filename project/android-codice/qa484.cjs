const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});

run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=2;render()");
function check(root){
 const card=root.querySelector('.class-spells451'),bar=card.querySelector('.spell-footer484'),sheet=card.querySelector('.spell-sheet430');
 assert(bar);assert.equal(bar.parentElement,card);assert(sheet.compareDocumentPosition(bar)&4);
 assert.equal(card.querySelectorAll('.spell-actions445').length,1);assert(!card.querySelector('.spell-title430'));
 assert(bar.querySelector('[onclick*="openManualSpell451"]'));assert(bar.querySelector('[onclick*="openSpellSettings445"]'));
 return {card,bar};
}
let {card,bar}=check(w.document);
bar.querySelector('.spell-settings445').click();assert(w.document.querySelector('dialog[open]'));w.document.querySelector('dialog[open]').open=false;
bar.querySelector('.spell-force430').click();assert(w.document.querySelector('dialog[open]'));w.document.querySelector('dialog[open]').open=false;
card.querySelector('.first-scroll-title').click();assert(bar.classList.contains('panel-hidden469'));
card.querySelector('.first-scroll-title').click();assert(!bar.classList.contains('panel-hidden469'));
run('render();render()');check(w.document);assert.equal(errors.length,0,errors.map(String).join('\n'));
console.log('PASS: footer order, unique actions, dialogs, collapse and repeated render');w.close();
