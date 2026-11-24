// Android must paint AFTER every patch is installed. Existing sheets otherwise keep the old startup DOM.
window.CODICE_APP_VERSION569='5.69';
const settingsBefore569=openSettings48;openSettings48=function(){const out=settingsBefore569();const body=document.getElementById('play-body');body?.querySelector('.release-version569')?.remove();body?.insertAdjacentHTML('beforeend',`<p class="release-version569" style="font-size:12px;text-align:center;opacity:.8">${text554('Versão','Version')} 5.69</p>`);return out;};
if(location.hostname==='appassets.androidplatform.net')render();
