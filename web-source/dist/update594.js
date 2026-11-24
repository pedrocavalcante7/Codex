/* Generated artwork, offline and shared by Android/Web. Saved option schema is unchanged. */
let avatarSerial594=0;
function avatarLayer594(key,x,y,w,h,filter='',extra=''){
 const a=AVATAR_ASSETS594[key];if(!a)return '';
 return `<image data-avatar-part594="${key}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="none" href="${a.src}" ${filter?`filter="url(#${filter})"`:''} ${extra}/>`;
}
function avatarTint594(id,color){
 const rgb=color.slice(1).match(/../g).map(v=>parseInt(v,16)/255);
 return `<filter id="${id}" data-color594="${color}" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer>${rgb.map((v,i)=>`<feFunc${'RGB'[i]} type="linear" slope="${v*1.45}" intercept="${v*.08}"/>`).join('')}</feComponentTransfer></filter>`;
}
avatarSvg571=function(options){
 if(!validAvatar571(options))throw Error('Invalid avatar option');
 const o={physique:'slim',fit:'loose',pants:'trousers',expression:'serious',age:'young',ears:'normal',tusks:'none',hairColor:'#463d38',lowerColor:'#3e4c4d',hornColor:'#dfc185',backgroundColor:'#213b43',...options};
 // Deterministic IDs allow stable preview comparisons and independent inline SVG instances.
 const id='avatar594-'+Object.values(o).join('-').replace(/[^a-z0-9]/gi,'');
 const tint=k=>id+'-'+k;
 const defs=['skin','cloth','lowerColor','hairColor','hornColor'].map(k=>avatarTint594(tint(k),o[k])).join('');
 const animal=['reptile','smallreptile','bird','fur','pterosaur'].includes(o.body);
 const bodyKey=o.body==='human'?'lower-body-'+o.physique:'body-'+o.body;
 const a=AVATAR_ASSETS594[bodyKey];
 const height=350,bodyWidth=height*a.w/a.h,bodyX=200-bodyWidth/2;
 const physiqueScale=o.body==='human'?1:({slim:1,strong:1.12,stocky:1.2,fat:1.35}[o.physique]||1);
 const broad=['broad','shortbroad'].includes(o.body)||['stocky','fat'].includes(o.physique);
 const headW=o.body==='shortbroad'?57:o.body==='slimsmall'?59:animal?58:46;
 const headY=o.body==='pterosaur'?75:40;
 const faceY=o.body==='shortbroad'?62:o.body==='slimsmall'?65:animal?63:59;
 const coatW=Math.max(146,bodyWidth*.93)*(o.fit==='loose'?1.05:.97)*(o.physique==='fat'?1.20:o.physique==='strong'?1.10:1);
 const waistW=Math.max(85,bodyWidth*(o.physique==='fat'?.66:.59));
 let layers='';
 if(o.tail!=='none')layers+=avatarLayer594('anatomy-tail-'+o.tail,212,230,100,135,tint('skin'));
 layers+=avatarLayer594(bodyKey,bodyX,40,bodyWidth,height,tint('skin'));
 // Lower garment starts under the belt; the original feet remain visible below it.
 const lowerH=o.pants==='shorts'?76:o.pants==='skirt'?125:165;
 layers+=avatarLayer594('lower-'+o.pants+'-'+o.fit,200-waistW/2,210,waistW,lowerH,tint('lowerColor'));
 layers+=avatarLayer594('clothes-'+o.clothes,200-coatW/2,94,coatW,187,tint('cloth'));
 if(!animal){
  layers+=avatarLayer594('anatomy-ears-'+o.ears,200-headW*.69,(['slimsmall','shortbroad'].includes(o.body)?headY+37:headY+18),headW*1.38,headW*.43,tint('skin'));
  // An opaque face base prevents doubled eyes from the underlying neutral body atlas.
  layers+=`<ellipse cx="200" cy="${faceY+16}" rx="${headW*.34}" ry="${headW*.44}" fill="${o.skin}"/>`;
  layers+=avatarLayer594('face-'+o.expression,200-headW*.32,faceY,headW*.64,headW*.67);
  if(o.age!=='young'){
   // Age lines occupy forehead and cheek regions, leaving the selected expression intact.
   layers+=`<g opacity="${o.age==='old'?.6:.3}" stroke="#584231" stroke-width=".8" fill="none"><path d="M188 ${faceY-3}q12-3 24 0m-22-3q10-2 20 0M184 ${faceY+18}l-2 9m34-9 2 9${o.age==='old'?`M184 ${faceY+10}l-4 2m36-2 4 2M188 ${faceY+27}l-2 6m26-6 2 6`:''}"/></g>`;
  }
 }else{
  // Expressions on nonhuman faces retain beaks and muzzles; only brow/eye strips overlay.
  layers+=`<svg x="${200-headW*.30}" y="${faceY}" width="${headW*.60}" height="${headW*.22}" viewBox="0 0 100 32" overflow="hidden">${avatarLayer594('face-'+o.expression,0,0,100,85)}</svg>`;
  if(o.age!=='young')layers+=`<path d="M182 ${faceY+14}l-4 2m40-2 4 2" stroke="#4b4035" stroke-width="${o.age==='old'?1.8:.8}"/>`;
 }
 if(o.tusks==='orc')layers+=avatarLayer594('anatomy-tusks-orc',200-headW*.24,faceY+headW*.48,headW*.48,headW*.22);
 if(o.hair!=='none'){
  const hairH={short:51,medium:76,long:112,crop:34,bob:77,pixie:42,curly:70,afro:68,braids:120,ponytail:96,bun:73,mohawk:75,undercut:57}[o.hair];
  const hw=headW*1.48,hy=headY-(o.hair==='mohawk'?30:o.hair==='bun'?24:6);
  layers+=avatarLayer594('hair-'+o.hair,200-hw/2,hy,hw,hairH*(headW/46),tint('hairColor'));
 }
 if(o.horns!=='none'){
  const hh={small:19,medium:34,large:59,simple:38,ram:48,branches:62,deer:70}[o.horns];
  const hw=headW*(o.horns==='ram'?2:1.75);
  layers+=avatarLayer594('anatomy-horn-'+o.horns,200-hw/2,Math.max(-8,headY+16-hh),hw,hh,tint('hornColor'));
 }
 if(o.body==='aasimar')layers+=`<ellipse cx="200" cy="25" rx="31" ry="7" fill="none" stroke="#e8ce81" stroke-width="3"/>`;
 const hands=[['left',200-bodyWidth*.43],['right',200+bodyWidth*.43]];
 for(const [side,hx]of hands){
  const key=o[side];if(key==='none')continue;const item=AVATAR_ASSETS594['hand-'+key];
  const long=['spear','scythe','halberd','glaive','staff','magicstaff','crook','greatsword','greataxe','bow'].includes(key);
  const ih=long?202:key==='shield'?94:key==='dagger'?78:120,iw=Math.min(key==='shield'?94:115,ih*item.w/item.h);
  // Per-object grip anchors, instead of aligning the arbitrary transparent bounding box.
  const grip={sword:[.5,.85],greatsword:[.5,.16],dagger:[.5,.22],rapier:[.5,.27],shield:[.5,.5],bow:[.52,.5],scythe:[.22,.68],lute:[.62,.32],flute:[.5,.5],violin:[.4,.36],lightcrossbow:[.5,.8],handcrossbow:[.82,.8],whip:[.2,.66]}[key]||[.5,.73];
  layers+=avatarLayer594('hand-'+key,hx-iw*grip[0],252-ih*grip[1],iw,ih);
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 440" width="400" height="440" role="img" aria-label="${text554('Prévia do avatar','Avatar preview')}" data-avatar-art594="generated"><defs>${defs}</defs><rect width="400" height="440" rx="28" fill="${o.backgroundColor}"/><circle cx="200" cy="185" r="153" fill="#e4ca91" opacity=".055"/><ellipse class="avatar-ground582" cx="200" cy="${o.size==='small'?410:421}" rx="${o.size==='small'?82:105}" ry="10" fill="#000" opacity=".2"/><g transform="${o.size==='small'?'translate(44 86) scale(.78)':'translate(0 0)'}"><g transform="translate(${200*(1-physiqueScale)} 24) scale(${physiqueScale} 1)">${layers}</g></g><rect x="12" y="12" width="376" height="416" rx="20" fill="none" stroke="#dfc185" stroke-width="2" opacity=".65"/></svg>`;
};
avatarLauncher571=function(){return `<section class="avatar-launch571"><h3>${text554('Retrato do personagem','Character portrait')}</h3><p>${text554('Combine peças ilustradas, roupas e equipamentos para criar seu avatar.','Combine illustrated parts, outfits and equipment to create your avatar.')}</p><button type="button" onclick="openAvatar571()">${text554('Criar ou editar avatar','Create or edit avatar')}</button></section>`;};
const settingsBefore594=openSettings48;openSettings48=function(){const r=settingsBefore594();const p=document.querySelector('.release-version569');if(p)p.textContent=text554('Versão','Version')+' 5.94';return r;};
window.CODICE_APP_VERSION594='5.94';
