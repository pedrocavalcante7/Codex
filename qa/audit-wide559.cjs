const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};

run("SETTINGS48.language='en';db.chars=[fresh('Test','Bruxo',5)];db.selected=db.chars[0].id;render();seedCreator548();ensureCreator554();wd().species=SAURIAN556;wd().lineage='Asa de Couro';wd().background=wentries('Antecedentes')[0].id;openCreationWizard()");
const missing=new Set();function audit(root){const walker=w.document.createTreeWalker(root,w.NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement.closest('script,style,input,textarea'))continue;const t=n.data.trim();if(/[áéíóúâêôãõç]/i.test(t))missing.add(t);}}
for(let i=0;i<=7;i++){run(`wizardIndex=${i};wrender();localize48()`);audit(w.document.getElementById('wizard-body'));}
run("document.getElementById('creation-wizard').close();openRulesMenu()");for(const section of ['home','classes','species','masteries','equipment']){run(`librarySection537('${section}');localize48()`);audit(w.document.getElementById('rules-menu-body'));}
console.log(JSON.stringify([...missing],null,2));process.exit(0);
