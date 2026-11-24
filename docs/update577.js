// 5.77 — matching title parchments and independent collapsible inventory/attacks.
function inventoryParchments577(){
 for(const card of document.querySelectorAll('#view .attack-table,#view .inventory526')){
  const title=card.querySelector(':scope > h2,:scope > h3');if(!title)continue;
  const kind=card.classList.contains('attack-table')?'attacks':'inventory',key='panel577|'+c()?.id+'|'+kind;
  title.classList.add('first-scroll-title','panel-parchment577','collapsible-scroll469');
  if(kind==='attacks')decorate512();title.classList.remove('title-settings59');const gear=title.querySelector('.attack-config512');if(gear){gear.setAttribute('aria-label',text554('Configurações de Armas e Ataques','Weapons and Attacks settings'));gear.title=text554('Configurações de Armas e Ataques','Weapons and Attacks settings');}
  let caption=title.querySelector('.panel-heading577');if(!caption){caption=document.createElement('span');caption.className='panel-heading577';for(const node of [...title.childNodes])if(!(node.nodeType===1&&node.matches('button,.panel-actions577')))caption.append(node);title.prepend(caption);}
  const buttons=[...title.querySelectorAll(':scope > button')];if(buttons.length){let actions=title.querySelector('.panel-actions577');if(!actions){actions=document.createElement('span');actions.className='panel-actions577';title.append(actions);}actions.append(...buttons);}
  const apply=()=>{const closed=Boolean(collapsedPanels469.get(key));title.setAttribute('aria-expanded',String(!closed));for(const child of card.children)if(child!==title)child.classList.toggle('panel-hidden469',closed);};
  title.setAttribute('role','button');title.tabIndex=0;
  title.onclick=e=>{if(e.target.closest('button,a,input,select'))return;collapsedPanels469.set(key,!collapsedPanels469.get(key));apply();};
  title.onkeydown=e=>{if(e.target!==title)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();title.click();}};
  apply();
 }
}
const renderBefore577=render;render=function(){const out=renderBefore577();inventoryParchments577();return out;};
const style577=document.createElement('style');style577.textContent=style576.textContent.replaceAll('.class-spells451>','.card>').replaceAll('.spell-parchment576','.panel-parchment577').replaceAll('.spell-heading540','.panel-heading577').replaceAll('.spell-actions540','.panel-actions577');document.head.append(style577);
const settingsBefore577=openSettings48;openSettings48=function(){const out=settingsBefore577();const p=document.querySelector('.release-version569');if(p)p.textContent=text554('Versão','Version')+' 5.77';return out;};
window.CODICE_APP_VERSION577='5.77';render();
