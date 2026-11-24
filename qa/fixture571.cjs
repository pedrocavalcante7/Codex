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

const fixture=JSON.parse(run('JSON.stringify(c())'));fixture.id='codice-web-test-character-v1';fixture.name='Ficha de testes';fs.writeFileSync('/workspace/sites/codice-aventureiro-web/qa/test-character.json',JSON.stringify(fixture,null,2));process.exit(0);
