const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=process.env.ASSET_DIR573||path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8');
const dom=new JSDOM(html,{url:process.env.WEB583==='1'?'https://codice-aventureiro-pedro.richibis14.chatgpt.site/':'https://appassets.androidplatform.net/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};w.confirm=()=>true;w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});w.CodiceAndroid={exportJson(){}};w.requestIdleCallback=()=>1;w.cancelIdleCallback=()=>{};
const errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));
run("db.chars=[fresh('Avatar QA','Bruxo',5)];db.selected=db.chars[0].id;ensureCreator554();tab=3;render();openAvatar571()");
assert.equal(run('Object.keys(AVATAR_ASSETS594).length'),100);
const original=run('JSON.stringify(c())');
for(const key of ['body','hair','clothes','horns','tail','physique','fit','pants','expression','age','ears','tusks','size','left','right']){
 const values=run('AVATAR_OPTIONS571.'+(['left','right'].includes(key)?'hand':key));const seen=new Set();
 for(const [value]of values){run(`avatarDraft571.options[${JSON.stringify(key)}]=${JSON.stringify(value)}`);const svg=run('avatarSvg571(avatarDraft571.options)');assert(!/undefined|NaN/.test(svg.replace(/data:image\/webp;base64,[A-Za-z0-9+/=]+/g,"")));assert(svg.includes('data:image/webp;base64,'));seen.add(svg);}
 assert.equal(seen.size,values.length,key);
}
assert.equal(run('JSON.stringify(c())'),original,'preview must not mutate saved character');
const samples=[];
for(const [label,opts]of [['Human warrior',{body:'human',clothes:'Guerreiro',left:'sword',right:'shield',hair:'short',horns:'none',tail:'none',skin:'#bd8c68'}],['Hexblood warlock',{body:'slimsmall',clothes:'Bruxo',left:'wand',right:'none',hair:'long',horns:'branches',tail:'none',skin:'#9976ac'}],['Reptilian druid',{body:'reptile',clothes:'Druida',left:'crook',right:'shield',hair:'none',horns:'none',tail:'lizard',skin:'#71866b'}],['Stocky bard',{body:'human',physique:'fat',clothes:'Bardo',left:'lute',right:'rapier',hair:'curly',horns:'none',tail:'none',skin:'#bd8c68'}]]){
 const svg=run(`avatarSvg571({...avatarDefaults571(c()),...${JSON.stringify(opts)}})`);samples.push(`<article><h2>${label}</h2>${svg}</article>`);
}
if(process.env.PREVIEW594)fs.writeFileSync(process.env.PREVIEW594,`<!doctype html><meta charset="utf-8"><style>body{background:#111;color:#ecd9ab;font:16px Georgia;display:flex;flex-wrap:wrap}article{width:400px}svg{width:400px;height:440px}</style>${samples.join('')}`);
assert.deepEqual(errors,[]);dom.window.close();console.log('PASS594: 100 offline assets, every option distinct, no missing layers/NaN, preview preserves character');process.exit(0);
