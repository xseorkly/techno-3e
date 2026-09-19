(()=>{
  const p=location.pathname;
  if(/\/formation\/?(?:index\.html)?$/.test(p)) return;
  const already=[...document.querySelectorAll('button,a')].some(el=>/imprimer|enregistrer en pdf|pdf/i.test(el.textContent||'') && (el.onclick || /print/i.test(el.getAttribute('onclick')||'')));
  if(already) return;
  const style=document.createElement('style');
  style.textContent=`
    .formation-print-tools{position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;gap:8px;padding:9px;background:rgba(255,255,255,.96);border:1px solid #D2DEDE;border-radius:13px;box-shadow:0 10px 28px rgba(20,38,43,.16);backdrop-filter:blur(8px)}
    .formation-print-tools button{border:0;border-radius:9px;padding:10px 14px;background:#0E6E6B;color:#fff;font:700 14px "Source Sans 3",system-ui,sans-serif;cursor:pointer}
    .formation-print-tools button:hover{background:#0A5A58}
    @media(max-width:600px){.formation-print-tools{left:12px;right:12px;bottom:12px}.formation-print-tools button{width:100%}}
    @media print{.formation-print-tools{display:none!important}}
  `;
  document.head.appendChild(style);
  const bar=document.createElement('div');
  bar.className='formation-print-tools';
  bar.id='printFormationTools';
  const btn=document.createElement('button');
  btn.type='button';
  btn.textContent='Imprimer / enregistrer en PDF';
  btn.setAttribute('aria-label','Imprimer cet atelier ou l’enregistrer au format PDF');
  btn.addEventListener('click',()=>window.print());
  bar.appendChild(btn);
  document.body.appendChild(bar);
})();