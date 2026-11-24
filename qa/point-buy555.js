// 5.55 — press and hold Point Buy controls across touch, pen and mouse.
(()=>{
 let hold=null,timer=null,suppressClick=false;
 const read=button=>{const m=button?.getAttribute('onclick')?.match(/^\s*adjustPointBuy\(\s*([0-5])\s*,\s*(-?1)\s*\)\s*;?\s*$/);return m?{index:Number(m[1]),delta:Number(m[2])}:null;};
 const control=target=>target?.closest?.('#creation-wizard .point-buy-row button');
 function stop(){if(timer!==null)clearTimeout(timer);timer=null;const old=hold;hold=null;if(old?.repeated)suppressClick=true;try{if(old?.root.hasPointerCapture?.(old.pointer))old.root.releasePointerCapture(old.pointer);}catch{}}
 function repeat(){timer=null;const h=hold;if(!h)return;
  if(wizardIndex!==3||!h.root.open||c()?.id!==h.character||abilityMethod48()!=='point'){stop();return;}
  const button=[...h.root.querySelectorAll('.point-buy-row button')].find(b=>{const v=read(b);return v?.index===h.index&&v.delta===h.delta;});
  if(!button||button.disabled){stop();return;}
  const before=Number(wd().base[h.index]);h.repeated=true;
  try{adjustPointBuy(h.index,h.delta);}catch(error){stop();throw error;}
  if(!hold)return;
  if(Number(wd().base[h.index])===before){stop();return;}
  timer=setTimeout(repeat,120);
 }
 document.addEventListener('pointerdown',event=>{
  if(hold){if(event.pointerId!==hold.pointer)stop();return;}
  suppressClick=false;const button=control(event.target),value=read(button);
  if(!value||button.disabled||event.button!==0||event.isPrimary===false||wizardIndex!==3||abilityMethod48()!=='point')return;
  const root=document.getElementById('creation-wizard');
  hold={...value,root,pointer:event.pointerId,character:c()?.id,rect:button.getBoundingClientRect(),repeated:false};
  try{root.setPointerCapture?.(event.pointerId);}catch{}
  timer=setTimeout(repeat,350);
 },true);
 document.addEventListener('pointermove',event=>{if(!hold||event.pointerId!==hold.pointer)return;const r=hold.rect;if(event.clientX<r.left-12||event.clientX>r.right+12||event.clientY<r.top-12||event.clientY>r.bottom+12)stop();},true);
 for(const name of ['pointerup','pointercancel','lostpointercapture'])document.addEventListener(name,event=>{if(hold&&event.pointerId===hold.pointer){if(name==='pointerup'&&!hold.repeated)repeat();stop();}},true);
 document.addEventListener('click',event=>{if(event.detail===0)return;if(suppressClick||hold?.repeated){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}},true);
 document.addEventListener('contextmenu',event=>{if(control(event.target))event.preventDefault();},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 document.addEventListener('close',event=>{if(event.target.id==='creation-wizard')stop();},true);
 window.addEventListener('blur',stop);
 document.addEventListener('keydown',event=>{if(event.key==='Escape')stop();},true);
 const style=document.createElement('style');style.textContent='#creation-wizard .point-buy-row button[onclick^="adjustPointBuy"]{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}';document.head.appendChild(style);
})();
