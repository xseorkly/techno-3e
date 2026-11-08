const CACHE='astrotech-v4';
const CORE=['./','./index.html','./stiam.html','./assets/style.css','./assets/fonts.css','./assets/main.js','./assets/config.js','./assets/simulations.js','./activites.html','./connaissances.html','./ressources.html','./outils.html','./sources.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin||req.url.includes('/telechargements/'))return;
  const garder=r=>{if(r.ok){const copie=r.clone();caches.open(CACHE).then(c=>c.put(req,copie))}return r};
  // Pages, scripts et feuilles de style : le réseau d'abord, pour toujours afficher la dernière version.
  if(req.mode==='navigate'||/\.(html|js|css)$/.test(new URL(req.url).pathname)){
    e.respondWith(fetch(req).then(garder).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  // Images et polices : le cache d'abord.
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(garder)));
});
