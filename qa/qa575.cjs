const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=process.env.ASSET_DIR573||path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));









run("SETTINGS48.language='en';db.chars=[fresh('Avatar test','Guerreiro',1)];db.selected=db.chars[0].id;render();openAvatar571()");
assert(w.document.querySelector('select[onchange*="ears"]'));assert(w.document.querySelector('select[onchange*="tusks"]'));
const renders=new Set();for(const ears of ['small','normal','large','pointed']){run('setAvatarOption571("ears",'+JSON.stringify(ears)+')');const svg=run('avatarSvg571(avatarDraft571.options)');assert(svg.includes('data-avatar-part594="anatomy-ears-'+ears+'"'));assert(!/undefined|NaN/.test(svg.replace(/data:image\/webp;base64,[A-Za-z0-9+/=]+/g,"")));renders.add(svg);}assert.equal(renders.size,4);
run("setAvatarOption571('skin','#12ab34')");let ears=w.document.querySelector('#avatar-preview571 [data-avatar-part594^="anatomy-ears-"]');assert(ears.getAttribute('filter').includes('skin'));assert(run('avatarSvg571(avatarDraft571.options)').includes('#12ab34'));
run("setAvatarOption571('tusks','orc')");assert(w.document.querySelector('#avatar-preview571 [data-avatar-part594="anatomy-tusks-orc"]'));run("setAvatarOption571('tusks','none')");assert(!w.document.querySelector('#avatar-preview571 [data-avatar-part594="anatomy-tusks-orc"]'));
run("c().avatar571={...avatarDraft571.options,ears:'large',tusks:'orc'};save();openAvatar571()");assert.equal(run('avatarDraft571.options.ears'),'large');assert.equal(run('avatarDraft571.options.tusks'),'orc');assert.equal(JSON.parse(w.localStorage.getItem('codice2024')).chars[0].avatar571.ears,'large');
assert.equal(run('price510(10)'),'1 SP');assert.equal(run('price510(50)'),'5 SP');assert.equal(run('price510(100)'),'1 GP');assert.equal(run('price510(1)'),'1 CP');
run("SETTINGS48.language='pt'");assert.equal(run('price510(10)'),'1 PP');run("SETTINGS48.language='en'");assert.equal(run("avatarDefaults571({...c(),species:'Orc',avatar571:undefined}).tusks"),'orc');
assert.deepEqual(errors,[]);console.log('PASS 5.75: four distinct ear shapes, skin color binding, tusks toggle, saved options, inferred Orc defaults, silver SP/Portuguese PP prices');process.exit(0);
