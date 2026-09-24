
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

  function titrePage(){
    var h1=document.querySelector('h1');
    return h1 ? h1.textContent.trim() : document.title;
  }

  function imprimerCorrection(cible){
    if(!cible || cible.hidden) return;

    var ancien=document.querySelector('.print-correction-clone');
    if(ancien) ancien.remove();

    var copie=document.createElement('article');
    copie.className='print-correction-clone';
    copie.setAttribute('aria-hidden','true');
    copie.innerHTML=
      '<header class="print-correction-entete">'+
        '<div class="print-correction-kicker">Correction / synthèse</div>'+
        '<h1>'+echapper(titrePage())+'</h1>'+
      '</header>'+
      '<div class="corr print-correction-contenu">'+cible.innerHTML+'</div>';

    document.body.appendChild(copie);
    document.body.classList.add('print-correction');

    var nettoyer=function(){
      document.body.classList.remove('print-correction');
      var x=document.querySelector('.print-correction-clone');
      if(x) x.remove();
      window.removeEventListener('afterprint',nettoyer);
    };

    window.addEventListener('afterprint',nettoyer);
    window.print();

    /* Secours pour certains navigateurs mobiles où afterprint n'est pas toujours émis. */
    setTimeout(function(){
      if(document.body.classList.contains('print-correction')) nettoyer();
    },30000);
  }

  function echapper(t){
    return String(t||'').replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  var cfg=window.CORRECTION_BILAN;
  if(cfg){
    /* Compatibilité avec les anciennes pages (sans data-addon) et les nouvelles. */
    var zone=document.querySelector('#correction[data-addon="1"], #correction'), btn=document.getElementById('corr-btn'), inp=document.getElementById('corr-mdp'), refus=document.getElementById('corr-refus'), cible=document.getElementById('corr-contenu');
    if(zone && btn && inp && cible){
      function ajouterBoutonImpression(){
        if(zone.querySelector('.btn-print-correction')) return;
        var actions=document.createElement('div');
        actions.className='corr-print-actions';
        var b=document.createElement('button');
        b.type='button';
        b.className='btn-print-correction';
        b.textContent='Imprimer / enregistrer en PDF la correction / synthèse';
        b.addEventListener('click',function(){ imprimerCorrection(cible); });
        actions.appendChild(b);
        cible.insertAdjacentElement('afterend',actions);
      }

      function ouvrir(){
        if(empreinte(inp.value)!==cfg.empreinte){ refus.hidden=false; cible.hidden=true; return; }
        refus.hidden=true;
        try{
          var sections=JSON.parse(decode64(cfg.coffre));
          cible.innerHTML=sections.map(function(s){return '<section class="corr-section"><h3>'+s[0]+'</h3>'+rendreLignes(s[1])+'</section>';}).join('');
          cible.hidden=false; zone.classList.add('ouverte');
          ajouterBoutonImpression();
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
