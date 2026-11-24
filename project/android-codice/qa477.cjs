const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));




run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;c().attrs=[10,14,16,8,18,8];tab=0;render()");
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .stats>.stat').length,6);
assert.equal(w.document.querySelector('#tabs').previousElementSibling.id,'persistent-abilities471');
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .ability-crest465,#persistent-abilities471 .checks-panels463').length,0);
assert.equal(w.document.querySelectorAll('#view .checks-panels463').length,1);assert.equal(w.document.querySelectorAll('#view .ability-crest465').length,6);assert.equal(w.document.querySelectorAll('#view .save-item463').length,6);assert.equal(w.document.querySelectorAll('#view .skill-item463').length,18);
assert.deepEqual([...w.document.querySelectorAll('#persistent-abilities471 .attribute-modifier415')].map(e=>e.textContent),['+0','+2','+3','-1','+4','-1']);
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .stat>label svg').length,6);
const field=w.document.querySelector('#persistent-abilities471 input');field.value='12';field.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(run('c().attrs[0]'),12);assert.equal(w.document.querySelector('#persistent-abilities471 .attribute-modifier415').textContent,'+1');
w.document.querySelector('#persistent-abilities471 .attribute-modifier415').click();assert.equal(run('pendingDice.bonus'),1);w.document.querySelector('#play-dialog').open=false;
run('switchTab(2);render()');assert.equal(w.document.querySelectorAll('#persistent-abilities471 .stat').length,6);assert.equal(w.document.querySelectorAll('#view .checks-panels463').length,0);assert(w.document.querySelector('.class-spells451>.first-scroll-title'));
run('switchTab(0);render();cycleSkillTraining(0)');assert.equal(run('c().skills[0]'),1);assert.equal(w.document.querySelector('#view [data-skill="0"] .skill-training').getAttribute('aria-checked'),'true');
assert.equal(run('Object.keys(PORTRAITS454).length'),480);assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS seis caixas simples acima das abas, ícones e valores da referência, edição e rolagem, seis brasões/salvaguardas e 18 perícias abaixo na aba Personagem, persistência entre abas, 480 retratos');dom.window.close();process.exit(0);
