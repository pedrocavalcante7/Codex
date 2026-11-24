// 5.78 — finish the same compact modifier controls after every dashboard render.
const renderBefore578=render;render=function(){const out=renderBefore578();compactModifiers510();return out;};
const settingsBefore578=openSettings48;openSettings48=function(){const out=settingsBefore578();const p=document.querySelector('.release-version569');if(p)p.textContent=text554('Versão','Version')+' 5.78';return out;};
window.CODICE_APP_VERSION578='5.78';render();
