const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};
const results={en:[],pt:[],errors:[]},seen={en:new Set(),pt:new Set()};
function audit(root,lang,context){if(!root)return;const walk=w.document.createTreeWalker(root,w.NodeFilter.SHOW_TEXT);let n;while(n=walk.nextNode()){if(n.parentElement.closest('script,style,input,textarea,[data-user-text550]'))continue;const text=n.data.trim();if(!text||text==='Português (Brasil)')continue;const bad=lang==='en'?/[áéíóúâêôãõç]|\b(?:arma|armas|arcano|místico|escolha|escolher|restantes|salvaguarda|vantagem|magia)\b/i:/\b(?:the|your|you|choose|level|spell|damage|strength|wisdom|armor|weapon|cantrip|invocation|requires|background|equipment)\b/i;if(bad.test(text)&&!seen[lang].has(text)){seen[lang].add(text);results[lang].push({context,text});}}}
for(const lang of ['en','pt'])for(const cls of run('CLASSES')){try{run(`SETTINGS48.language='${lang==='pt'?'pt-BR':'en'}';db.chars=[fresh('Audit',${JSON.stringify(cls)},20)];db.selected=db.chars[0].id;render();selections().subclasses[${JSON.stringify(cls)}]=Object.keys(PROGRESSION47[${JSON.stringify(cls)}].subclasses)[0];render();localize48()`);audit(w.document.getElementById('view'),lang,cls+' sheet');const rows=run('progressionRows47().length');for(let i=0;i<rows;i++){run(`openCharacterFeature47(${i});localize48()`);audit(w.document.getElementById('play-body'),lang,cls+' feature '+i);run("document.querySelectorAll('dialog[open]').forEach(d=>d.close())");}for(const id of run(`Object.keys(PROGRESSION47[${JSON.stringify(cls)}].subclasses)`)){run(`openSubclass47(${JSON.stringify(id)});localize48()`);audit(w.document.getElementById('play-body'),lang,cls+' subclass '+id);run("document.querySelectorAll('dialog[open]').forEach(d=>d.close())");}}catch(e){results.errors.push({lang,cls,error:String(e)})}}
const report=process.env.CODICE_QA_OUTPUT||path.resolve(__dirname,'../qa-output/audit560-results.json');fs.mkdirSync(path.dirname(report),{recursive:true});fs.writeFileSync(report,JSON.stringify(results,null,2));console.log(JSON.stringify({english:results.en.length,portuguese:results.pt.length,errors:results.errors.length}));process.exit(0);
