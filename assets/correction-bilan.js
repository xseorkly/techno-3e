
(function(){
  "use strict";
  function rendreLignes(lignes){
    var html = "", tampon = [];
    function vider(){
      if(tampon.length){
        html += "<ul>" + tampon.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>";
        tampon = [];
      }
    }
    lignes.forEach(function(x){
      if(/^\s*<(ul|ol|div|svg|p|a|table|figure|img|h[1-6]|blockquote)\b/i.test(x)){ vider(); html += x; }
      else tampon.push(x);
    });
    vider();
    return html;
  }
  
  function empreinte(t){ var h=5381; for(var i=0;i<t.length;i++) h=((h*33)^t.charCodeAt(i))>>>0; return h; }
  function decode64(s){ try{return decodeURIComponent(escape(atob(s)));}catch(e){return atob(s);} }
  var cfg=window.CORRECTION_BILAN;
  if(cfg){
    var zone=document.querySelector('#correction[data-addon="1"]'), btn=document.getElementById('corr-btn'), inp=document.getElementById('corr-mdp'), refus=document.getElementById('corr-refus'), cible=document.getElementById('corr-contenu');
    if(zone && btn && inp && cible){
      function ouvrir(){
        if(empreinte(inp.value)!==cfg.empreinte){ refus.hidden=false; cible.hidden=true; return; }
        refus.hidden=true;
        try{
          var sections=JSON.parse(decode64(cfg.coffre));
          cible.innerHTML=sections.map(function(s){return '<section class="corr-section"><h3>'+s[0]+'</h3>'+rendreLignes(s[1])+'</section>';}).join('');
          cible.hidden=false; zone.classList.add('ouverte');
          cible.scrollIntoView({behavior:'smooth',block:'nearest'});
        }catch(e){ refus.textContent='Impossible de charger la correction.'; refus.hidden=false; }
      }
      btn.addEventListener('click',ouvrir); inp.addEventListener('keydown',function(e){if(e.key==='Enter') ouvrir();});
    }
  }
  document.querySelectorAll('.barre').forEach(function(barre){
    if(barre.querySelector('.btn-print-browser')) return;
    var b=document.createElement('button'); b.type='button'; b.className='lien btn-print-browser'; b.textContent='Imprimer / PDF navigateur'; b.addEventListener('click',function(){window.print();});
    var etat=barre.querySelector('.etat'); barre.insertBefore(b,etat||null);
  });
})();
