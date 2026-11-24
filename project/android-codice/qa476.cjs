const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));




run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=0;render()");
assert.equal(w.document.querySelector('#tabs').previousElementSibling.id,'persistent-abilities471');
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .ability-panel463').length,6);
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .ability-header463').length,6);
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .save-item463').length,6);
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .skill-item463').length,18);
assert.equal(w.document.querySelectorAll('.primary-ability-panel474,.primary-ability-grid474,.ability-detail-name474').length,0);
assert.equal(w.document.querySelectorAll('#view .checks-panels463').length,0);
const before=run('groupedChecks()');const original=w.document.createElement('div');original.innerHTML=before;
for(let i=0;i<6;i++)assert.equal(w.document.querySelectorAll('#persistent-abilities471 .ability-header463')[i].outerHTML,original.querySelectorAll('.ability-header463')[i].outerHTML);
run('cycleSkillTraining(0)');assert.equal(run('c().skills[0]'),1);assert.equal(w.document.querySelector('#persistent-abilities471 [data-skill="0"] .skill-training').getAttribute('aria-checked'),'true');
const save=w.document.querySelector('#persistent-abilities471 input[aria-label="Proficiência na salvaguarda de Força"]');save.checked=!save.checked;save.dispatchEvent(new w.Event('change',{bubbles:true}));assert(run('c().saves.includes(0)')===save.checked);
run('switchTab(2);render()');assert.equal(w.document.querySelectorAll('#persistent-abilities471 .ability-crest465').length,6);assert.equal(w.document.querySelectorAll('#view .ability-panel463').length,0);assert(w.document.querySelector('.class-spells451>.first-scroll-title'));
const title=w.document.querySelector('#persistent-abilities471>.card>.first-scroll-title');assert(title);title.click();assert.equal(title.getAttribute('aria-expanded'),'false');title.click();assert.equal(title.getAttribute('aria-expanded'),'true');
assert.equal(run('Object.keys(PORTRAITS454).length'),480);assert.equal(errors.length,0,errors.map(String).join('\n'));
console.log('PASS painéis completos acima das abas, seis brasões idênticos ao desenho anterior, seis salvaguardas, 18 perícias, controles funcionais, sem duplicação, pergaminhos e 480 retratos');dom.window.close();process.exit(0);
