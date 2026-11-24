// 5.75 — silver prices, inset scroll titles and selectable ears/tusks.
Object.assign(AVATAR_OPTIONS571,{
 ears:[['small','Pequenas','Small'],['normal','Normais','Normal'],['large','Grandes','Large'],['pointed','Pontudas','Pointed']],
 tusks:[['none','Sem presas','No tusks'],['orc','Presas de orc','Orc tusks']]
});
Object.assign(AVATAR_LABELS571,{ears:['Orelhas','Ears'],tusks:['Presas','Tusks']});
const defaultsBefore575=avatarDefaults571;
avatarDefaults571=function(x){const n=normBook(x.species||'');return {ears:/elf|elfo|orc|goblin/.test(n)?'pointed':'normal',tusks:/orc/.test(n)?'orc':'none',...defaultsBefore575(x)};};
function avatarEars575(o){const skin=o.skin,shape={
 small:'<ellipse cx="164" cy="129" rx="5" ry="9"/><ellipse cx="236" cy="129" rx="5" ry="9"/>',
 normal:'<ellipse cx="162" cy="129" rx="8" ry="13"/><ellipse cx="238" cy="129" rx="8" ry="13"/>',
 large:'<ellipse cx="159" cy="129" rx="12" ry="18"/><ellipse cx="241" cy="129" rx="12" ry="18"/>',
 pointed:'<path d="M170 121 145 107Q148 139 168 142ZM230 121 255 107Q252 139 232 142Z"/>'
 }[o.ears||'normal'];return `<g data-avatar-ears575="${o.ears||'normal'}" fill="${skin}" stroke="#243638" stroke-width="2">${shape}</g>`;}
function avatarTusks575(o){return o.tusks==='orc'?'<g data-avatar-tusks575="orc" fill="#f5ead0" stroke="#665b4c" stroke-width="1.5"><path d="M183 161Q181 151 184 143Q186 152 192 160Z"/><path d="M217 161Q219 151 216 143Q214 152 208 160Z"/></g>':'';}
const priceBefore575=price510;
price510=function(cp){if(SETTINGS48.language!=='en')return priceBefore575(cp);if(cp===0)return '0 GP';if(cp>=100)return (cp/100).toLocaleString('en-US',{maximumFractionDigits:2})+' GP';if(cp%10===0)return cp/10+' SP';return cp+' CP';};
const style575=document.createElement('style');style575.textContent=`body #view .class-spells451>.first-scroll-title,body #view .class-spells451 .spell-title430{padding-inline:16px!important;box-sizing:border-box}body #view .class-spells451 .spell-actions540{margin-right:0!important}`;document.head.append(style575);
const settingsBefore575=openSettings48;openSettings48=function(){const out=settingsBefore575();const p=document.querySelector('.release-version569');if(p)p.textContent=text554('Versão','Version')+' 5.75';return out;};
window.CODICE_APP_VERSION575='5.75';render();
