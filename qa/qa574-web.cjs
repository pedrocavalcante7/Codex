const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=(process.env.ASSET_DIR573||'/workspace/sites/codice-web/.sites-checkout/dist'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://codice-aventureiro-pedro.richibis14.chatgpt.site/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));








run("SETTINGS48.language='en';db.chars=[fresh('First','Bruxo',5),fresh('Second','Mago',3)];db.selected=db.chars[0].id;render()");
run('characterMenu573()');assert.equal(w.document.querySelectorAll('.character-delete574').length,2);
run('confirmDelete574(db.chars[1].id)');assert(w.document.getElementById('play-body').textContent.includes('Permanently delete'));run('characterMenu573()');assert.equal(run('db.chars.length'),2);
run('deleteCharacter574(db.chars[1].id)');assert.equal(run('db.chars.length'),1);assert.equal(run('c().name'),'First');
run('deleteCharacter574(db.selected)');assert.equal(run('db.chars.length'),0);assert(w.document.querySelector('.character-menu573 .primary'));assert.equal(JSON.parse(w.localStorage.getItem('codice2024')).chars.length,0);
run("db.chars=[fresh('Magic user','Bruxo',5)];db.selected=db.chars[0].id;render();openAvatar571();openColor573('hairColor')");assert(w.document.getElementById('color-sample574'));run('colorDraft573.h=120;colorDraft573.s=1;colorDraft573.v=1;paintColor573()');assert.equal(w.document.getElementById('color-value574').textContent,'#00ff00');assert.equal(w.document.getElementById('color-sample574').style.backgroundColor,'rgb(0, 255, 0)');
assert.equal(run('ordinal574(1)'), '1st');assert.equal(run('ordinal574(2)'), '2nd');assert.equal(run('ordinal574(3)'), '3rd');assert.equal(run('ordinal574(11)'), '11th');
assert.equal(run("translatedText48('25 GP/unid.')"),'25 GP/Unit');
run("beam574={key:'test-beam',name:'Eldritch Blast',level:0,attr:5};beamResult574=spellAttackNumbers486(beam574)");assert.equal(run('beamResult574.note'),'2 rays; roll each ray separately.');assert.equal(run('beamResult574.parts[0].type'),'Force');
run("fire574={key:'test-fire',name:'Scorching Ray',level:2,attr:5};fireResult574=spellAttackNumbers486(fire574)");assert(run('fireResult574.note').includes('3 rays; roll each ray separately.'));assert(run('fireResult574.note').includes('2nd level.'));
run("playState().weapons.push({id:'weapon574',weapon:'Dagger',ability:'1',proficient:true});playState().spellAttacks486={true574:{weapon:'weapon574'}}");
run("strike574=spellAttackNumbers486({key:'true574',name:'True Strike',level:0,attr:5})");assert(!run('strike574.missing'));assert(run('strike574.note').includes('Choose Radiant damage or the weapon’s damage type.'));assert(!/\bou\b|Radiante|arma/i.test(run('strike574.note')));
run("cardEntries574=spellEntries;spellEntries=function(){return [{key:'origin574',name:'Light',id:'spell-light',level:0,source:'Magic Initiate (Wizard)',text:'Test',attr:3}]};openSpellCard('origin574')");assert(w.document.querySelector('.spell-source574').textContent.includes('Magic Initiate (Wizard)'));run('spellEntries=cardEntries574');
assert.deepEqual(errors,[]);console.log('PASS 5.74: deletion/cancel/last sheet persistence, live color square, English ordinals/prices/beam notes and spell source');process.exit(0);
