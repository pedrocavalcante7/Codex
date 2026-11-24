/* Network-first shell, with no offline cache: each reload obtains the current published app. */
const VERSION='5.95-web.1';
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim());});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate')event.respondWith(fetch(new Request(event.request,{cache:'no-store'})));});
