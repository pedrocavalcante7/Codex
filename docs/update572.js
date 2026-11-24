// Switching to Character changes visibility; it must not regenerate the complete sheet.
const switchBefore572=switchTab;
switchTab=function(next){
 if(!c()||![0,1,2,3].includes(next)||!visibleSheetTabs().includes(next))return;
 if(next===tab){window.sheetPager559?.clear();return;}
 if(next!==3&&tab!==3)return switchBefore572(next);
 window.sheetPager559?.clear();
 const view=document.getElementById('view');
 if(next===3){
  const held=document.createElement('div');held.append(...view.childNodes);
  window.sheetPages559.remember(tab,held);tab=3;
  view.classList.remove('inventory-tab48');document.body.classList.remove('inventory-active48');
 }else window.sheetPages559.activate(next,()=>{tab=next;render();});
 mountCharacter571();observeEffects470();seedEmittedSparks();
};
// Keep SVG icons, labels and user text stable when only the active tab changes.
const mountTabsBefore572=mountTabs419;
function setAttribute572(node,key,value){if(node.getAttribute(key)!==String(value))node.setAttribute(key,String(value));}
mountTabs419=function(){const root=document.getElementById('tabs');if(!c()||!root?.querySelector('[data-character-tab571]')||root.querySelectorAll('button[role=tab]').length!==4)return mountTabsBefore572();const labels=[text554('Visão Geral','Overview'),text554('Inventário','Inventory'),text554('Magias','Spells'),text554('Personagem','Character')];for(const button of root.querySelectorAll('button[role=tab]')){const n=Number(button.getAttribute('onclick')?.match(/switchTab\((\d+)\)/)?.[1]);if(!Number.isInteger(n))continue;setAttribute572(button,'aria-selected',n===tab);setAttribute572(button,'aria-label',labels[n]);setAttribute572(button,'title',labels[n]);button.classList.toggle('active',n===tab);}};
decorateSubtitle571=function(){const node=document.getElementById('subtitle'),x=c();if(!node||!x)return;if(x.subtitle571){if(node.textContent!==x.subtitle571)node.textContent=x.subtitle571;setAttribute572(node,'data-user-content571','true');}else if(node.hasAttribute('data-user-content571'))node.removeAttribute('data-user-content571');setAttribute572(node,'role','button');if(node.tabIndex!==0)node.tabIndex=0;setAttribute572(node,'title',text554('Segure para editar a descrição','Hold to edit the description'));setAttribute572(node,'aria-label',text554('Descrição do personagem. Segure para editar.','Character description. Hold to edit.'));};
// The legacy render already translates once. Include outer panel moves in that batch,
// discarding redundant observer records instead of scanning the same subtrees again.
const renderBefore572=render;let renderDepth572=0;
render=function(){const outer=renderDepth572++===0;if(outer)languageObserver559.disconnect();try{return renderBefore572();}finally{renderDepth572--;if(outer){languageObserver559.disconnect();languageRoots559.clear();seedEmittedSparks();languageObserver559.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt','aria-valuetext','open']});}}};
// Timers never continue on detached pages, hidden Character panels or closed dialogs.
effectVisible470=function(el){return Boolean(el?.isConnected)&&!document.hidden&&!el.closest('[hidden],[inert],dialog:not([open]),.effects-offscreen470,.panel-hidden469');};
seedEmittedSparks=function(){for(const [source,timer]of effectTimers470){clearTimeout(timer);delete source.dataset.emitting;}effectTimers470.clear();if(!animationEnabled466('other')&& !animationEnabled466('checkboxes')||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;for(const source of document.querySelectorAll('.inspiration-active .star-art,.skill-training.state-2 .training-box')){const kind=source.closest('.skill-training')?'checkboxes':'other';if(effectVisible470(source)&&animationEnabled466(kind)){source.dataset.emitting='true';effectTimers470.set(source,setTimeout(()=>{effectTimers470.delete(source);emitSpark470(source);},400));}}};
const settingsBefore572=openSettings48;openSettings48=function(){const out=settingsBefore572();const p=document.querySelector('.release-version569');if(p)p.textContent=text554('Versão','Version')+' 5.72';return out;};
window.CODICE_APP_VERSION572='5.72';
if(location.hostname==='appassets.androidplatform.net')render();
