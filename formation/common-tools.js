(function(){
  function addIoTNavigation(){
    const path=location.pathname;
    if(!path.includes('/formation/objets-connectes/')) return;

    const inP3=path.includes('/point-3/'), inP4=path.includes('/point-4/');
    const prefix=(inP3||inP4)?'../':'';
    const overview=prefix+'index.html';
    const p1=prefix+'point-1.html';
    const p2=prefix+'point-2.html';
    const p3=prefix+'point-3/index.html';
    const p4=prefix+'point-4/index.html';
    const formation=(inP3||inP4)?'../../index.html':'../index.html';

    // Corrige les anciens liens ambigus : index.html est la vue d'ensemble, pas le point 1.
    document.querySelectorAll('a').forEach(a=>{
      const txt=(a.textContent||'').toLowerCase();
      if(txt.includes('point 1') && a.getAttribute('href')==='index.html') a.href=p1;
    });

    // Navigation identique et très visible sur toutes les pages du parcours IoT.
    let nav=document.querySelector('.iot-global-nav');
    if(!nav){
      nav=document.createElement('nav');
      nav.className='iot-global-nav';
      nav.setAttribute('aria-label','Navigation du parcours objets connectés');
      nav.innerHTML=`<a href="${formation}">← Formation</a><a href="${overview}">☰ Vue d’ensemble</a><a href="${p1}">1 · Architecture</a><a href="${p2}">2 · Wi‑Fi & ThingSpeak</a><a href="${p3}">3 · TP guidé</a><a href="${p4}">4 · Classe connectée</a>`;
      const main=document.querySelector('main')||document.body;
      main.insertBefore(nav,main.firstChild);
    }
    const style=document.createElement('style');
    style.textContent=`.iot-global-nav{position:sticky;top:0;z-index:50;display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px;padding:10px;background:rgba(244,247,247,.96);backdrop-filter:blur(8px);border:1px solid #D2DEDE;border-radius:14px}.iot-global-nav a{display:inline-block;text-decoration:none;border-radius:999px;padding:9px 12px;font-weight:700;border:1px solid #D2DEDE;background:#fff;color:#0A5A58}.iot-global-nav a:hover{background:#E2EFEE}@media(max-width:650px){.iot-global-nav{position:static}.iot-global-nav a{font-size:14px;padding:8px 10px}}@media print{.iot-global-nav{display:none!important}}`;
    document.head.appendChild(style);
  }
  function addTools(){
    addIoTNavigation();
    if(document.getElementById('formation-print-tools')) return;
    const style=document.createElement('style');
    style.textContent=`
      .formation-tools{margin:30px 0 8px;padding:16px 18px;background:#fff;border:1px solid #D2DEDE;border-radius:14px;display:flex;align-items:center;justify-content:space-between;gap:16px;box-shadow:0 8px 26px rgba(20,38,43,.05)}
      .formation-tools-copy strong{display:block;font-family:Archivo,sans-serif;color:#14262B;margin-bottom:2px}.formation-tools-copy span{color:#5A6C71;font-size:14px}
      .formation-tools-btn{border:0;border-radius:10px;padding:11px 15px;background:#0E6E6B;color:#fff;font:700 15px "Source Sans 3",system-ui,sans-serif;cursor:pointer;white-space:nowrap}.formation-tools-btn:hover{background:#0A5A58}
      @media(max-width:650px){.formation-tools{align-items:flex-start;flex-direction:column}.formation-tools-btn{width:100%}}
      @media print{.formation-tools{display:none!important}}
    `;
    document.head.appendChild(style);
    const box=document.createElement('section');
    box.id='formation-print-tools';
    box.className='formation-tools';
    box.innerHTML='<div class="formation-tools-copy"><strong>Conserver une trace de cet atelier</strong><span>Utilisez l’impression du navigateur puis choisissez « Enregistrer au format PDF ».</span></div><button type="button" class="formation-tools-btn">🖨️ Imprimer / enregistrer en PDF</button>';
    box.querySelector('button').addEventListener('click',()=>window.print());
    const footer=document.querySelector('.footer, footer');
    if(footer && footer.parentNode) footer.parentNode.insertBefore(box,footer); else (document.querySelector('main')||document.body).appendChild(box);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addTools); else addTools();
})();