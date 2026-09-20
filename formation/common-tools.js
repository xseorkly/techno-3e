(function(){
  function addIoTNavigation(){
    const path=location.pathname;
    if(!path.includes('/formation/objets-connectes/')) return;
    document.querySelectorAll('.nav').forEach(nav=>{
      const hasPoint3=[...nav.querySelectorAll('a')].some(a=>a.getAttribute('href')&&a.getAttribute('href').includes('point-3'));
      if(hasPoint3) return;
      const a=document.createElement('a');
      a.href=path.includes('/point-3/')?'index.html':'point-3/index.html';
      a.textContent='Point 3 · TP guidé →';
      nav.appendChild(a);
    });
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