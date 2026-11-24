/* Stable storage keys and recovery run BEFORE app.js reads the character database. */
window.CODICE_WEB_BACKUP_KEY='codice2024-web-backup-v1';
window.CODICE_WEB_PREVIOUS_KEY='codice2024-web-previous-v1';
window.codiceWebStorageStatus={saved:false,backup:false,recovered:false,persistent:false};
window.validCodiceWebDatabase=function(raw){try{const data=JSON.parse(raw);return data&&Array.isArray(data.chars)?data:null;}catch{return null;}};
window.backupCodiceWeb=function(){try{const raw=localStorage.getItem('codice2024');if(!window.validCodiceWebDatabase(raw))return;window.codiceWebStorageStatus.saved=true;const previous=localStorage.getItem(window.CODICE_WEB_BACKUP_KEY);if(raw!==previous){if(window.validCodiceWebDatabase(previous))localStorage.setItem(window.CODICE_WEB_PREVIOUS_KEY,previous);localStorage.setItem(window.CODICE_WEB_BACKUP_KEY,raw);}window.codiceWebStorageStatus.backup=localStorage.getItem(window.CODICE_WEB_BACKUP_KEY)===raw;}catch{window.codiceWebStorageStatus.backup=false;}};
try{if(!window.validCodiceWebDatabase(localStorage.getItem('codice2024'))){for(const key of [window.CODICE_WEB_BACKUP_KEY,window.CODICE_WEB_PREVIOUS_KEY]){const raw=localStorage.getItem(key);if(window.validCodiceWebDatabase(raw)){localStorage.setItem('codice2024',raw);window.codiceWebStorageStatus.recovered=true;break;}}}window.backupCodiceWeb();}catch{}
/* Browser adapter for the original Android export interface. No character data is sent to a server. */
window.CodiceAndroid={
 haptic(){try{navigator.vibrate?.(12);}catch{}},
 exportJson(data){const record=JSON.parse(data),name=String(record.name||'personagem').replace(/[\\/:*?"<>|]/g,'-').slice(0,80),blob=new Blob([data],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=name+'.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
};
window.addEventListener('error',event=>{if(!document.documentElement.classList.contains('codice-loading'))return;const notice=document.getElementById('web-loading');if(notice){notice.textContent='Não foi possível abrir o Códice. Recarregue a página.';notice.style.pointerEvents='auto';notice.onclick=()=>location.reload();}document.documentElement.classList.remove('codice-loading');});
