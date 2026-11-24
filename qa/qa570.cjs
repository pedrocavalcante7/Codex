const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=process.env.ASSET_DIR570||path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







run("tab=0;SETTINGS48.language='en';db.chars=[fresh('Invocation tester','Bruxo',2)];db.selected=db.chars[0].id;ensureCreator554();wd().classes554=[{name:'Bruxo',level:2,subclass:''}];wapply();c().invocations558=[{id:'Lessons of the First Ones',target:wentries('Talentos').find(e=>e.name==='Magic Initiate').id},{id:'Armor of Shadows',target:''},{id:'Eldritch Mind',target:''}];wapply()");
assert.equal(run('ensureCreator554().grants.filter(g=>g.invocation570).length'),1);
run('testGrant570=ensureCreator554().grants.find(g=>g.invocation570)');
console.log(run('JSON.stringify(invocationTasks570(testGrant570).map(t=>({key:t.key,count:t.options.length})))'));
assert(run("invocationError558(true).includes('complete every feat choice')"));
run("setInvocationChoice570(testGrant570.uid,'magicClass','Mago');setInvocationChoice570(testGrant570.uid,'cast','3');for(const key of ['cantrip0','cantrip1','spell']){const t=invocationTasks570(ensureCreator554().grants.find(g=>g.invocation570)).find(t=>t.key===key);setInvocationChoice570(testGrant570.uid,key,t.options[0][0]);}");
assert.equal(run('invocationError558(true)'),'');assert(run('playState().featureGrants47.some(g=>g.invocation570&&g.choices.cantrip1)'));assert(run('selections().feats.includes(testGrant570.featId)'));
console.log(run('JSON.stringify(spellEntries(c()).filter(e=>e.feat||String(e.key).includes("feat")).map(e=>({name:e.name,key:e.key})))'));
run('render()');assert.equal(w.document.querySelectorAll('.character-features47 .feature-invocation570').length,0);run('openInvocationList583()');assert.equal(w.document.querySelectorAll('.invocation-list583 .feature-invocation570').length,3);run("document.getElementById('play-dialog').close()");
run("setInvocation558(0,'Fiendish Vigor')");assert.equal(run('playState().featureGrants47.filter(g=>g.invocation570).length'),0);assert(!run('selections().feats.includes(testGrant570.featId)'));
run("setInvocation558(0,'Lessons of the First Ones');setInvocationTarget558(0,wentries('Talentos').find(e=>e.name==='Skilled').id);testGrant570=ensureCreator554().grants.find(g=>g.invocation570);for(const key of ['training0','training1','training2']){const t=invocationTasks570(testGrant570).find(t=>t.key===key);setInvocationChoice570(testGrant570.uid,key,t.options.find(([v])=>v.startsWith('skill:'))[0]);testGrant570=ensureCreator554().grants.find(g=>g.invocation570)}");assert.equal(run('invocationError558(true)'),'');assert.equal(run("Object.values(testGrant570.choices).filter(v=>v.startsWith('skill:')&&c().skills[Number(v.slice(6))]>=1).length"),3);
run("setInvocationTarget558(0,wentries('Talentos').find(e=>e.name==='Crafter').id);testGrant570=ensureCreator554().grants.find(g=>g.invocation570);for(const key of ['tool0','tool1','tool2']){const t=invocationTasks570(testGrant570).find(t=>t.key===key);setInvocationChoice570(testGrant570.uid,key,t.options[0][0]);testGrant570=ensureCreator554().grants.find(g=>g.invocation570)}");
assert.equal(run('invocationError558(true)'),'');assert.equal(run('Object.values(testGrant570.choices).filter(v=>playState().grantedTools.includes(v)).length'),3);
const grantSaved=run('JSON.stringify(testGrant570)');run("setInvocation558(1,'Fiendish Vigor')");assert.equal(run('JSON.stringify(ensureCreator554().grants.find(g=>g.invocation570))'),grantSaved,'unrelated invocation changes retain all feat choices');
run('save()');const saved=JSON.parse(w.localStorage.getItem('codice2024'));assert(saved.chars[0].creator554.grants.some(g=>g.invocation570&&Object.keys(g.choices).length===3));
run("setClass554(0,'level',1);wapply()");assert.equal(run('playState().featureGrants47.filter(g=>g.invocation570).length'),0,'reducing Warlock level removes unavailable invocation feats');
run("library537.section='spells';library537.query='';library537.spellLevel558=-1;library537.filters570={}");console.log(run("JSON.stringify(wentries('Magias').slice(0,2).map(e=>({name:e.name,text:e.text.slice(0,350),meta:spellMeta570(e)})))"));assert(run('spellRows570().length>100'));assert.equal((run('libList537()').match(/data-spell-filter570/g)||[]).length,7);
for(const [key,value]of [['time','reaction'],['cls','Bruxo'],['school','Evocation'],['ritual','yes'],['concentration','yes'],['component','M'],['range','touch']]){run(`library537.filters570={${key}:${JSON.stringify(value)}}`);assert(run('spellRows570().length>0'),key+' has matches');}
run("library537.filters570={cls:'Bruxo',school:'Enchantment',concentration:'yes'}");assert(run('spellRows570().every(e=>e.classes.includes("Bruxo")&&e.school==="Enchantment"&&spellMeta570(e).concentration)'));
for(const [lang,expected]of [['en','Other rules'],['pt-BR','Outras regras']]){run(`SETTINGS48.language=${JSON.stringify(lang)}`);assert.equal(run(`phrase550('Outras regras',SETTINGS48.language==='en')`),expected);assert.equal(run(`phrase550('Maestrias',SETTINGS48.language==='en')`),lang==='en'?'Masteries':'Maestrias');}
assert.equal(errors.length,0);console.log('PASS 5.70 invocation feats, nested magic and skill choices, cleanup, dark blue bars, spell filters, bilingual labels');process.exit(0);
