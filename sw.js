const V='defensa-v3';const CORE=['./','index.html','manifest.json','icon-96.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok&&(n.type==='basic'||/fonts\.g|cdnjs/.test(e.request.url)))caches.open(V).then(c=>c.put(e.request,n.clone()));return n.clone?n:n}).catch(()=>caches.match('index.html'))))});
