
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

  function echapper(t){
    return String(t||'').replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  /* Styles injectés pour rendre l'impression correction indépendante des variantes CSS des anciennes pages. */
  if(!document.getElementById('correction-print-fix')){
    var ps=document.createElement('style');
    ps.id='correction-print-fix';
    ps.textContent='\
.print-correction-clone{display:none}\
@media print{\
  .btn-print-browser,.corr-print-actions{display:none!important}\
  body.print-correction>*:not(.print-correction-clone){display:none!important}\
  body.print-correction{background:#fff!important;margin:0!important;padding:0!important}\
  body.print-correction .print-correction-clone{display:block!important;max-width:none!important;margin:0!important;padding:12mm 14mm!important;color:#14262B!important;background:#fff!important;font-family:"Source Sans 3",Arial,sans-serif!important;font-size:11pt!important;line-height:1.45!important}\
  body.print-correction .print-correction-entete{border-bottom:2px solid #0E6E6B;padding-bottom:6mm;margin-bottom:7mm}\
  body.print-correction .print-correction-kicker{font:700 9pt Archivo,Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:#C2185B;margin-bottom:2mm}\
  body.print-correction .print-correction-entete h1{font:700 19pt Archivo,Arial,sans-serif;line-height:1.15;margin:0;color:#14262B}\
  body.print-correction .print-correction-contenu{display:block!important;margin:0!important}\
  body.print-correction .corr-section{break-inside:avoid-page;border-top:1px solid #D2DEDE;padding-top:5mm;margin-top:5mm}\
  body.print-correction .corr-section:first-child{border-top:0;margin-top:0;padding-top:0}\
  body.print-correction h3{font:600 14pt Archivo,Arial,sans-serif;color:#0E6E6B;margin:0 0 3mm}\
  body.print-correction img,body.print-correction svg,body.print-correction table,body.print-correction figure{max-width:100%!important;break-inside:avoid-page}\
  body.print-correction a{color:#14262B;text-decoration:none}\
}';
    document.head.appendChild(ps);
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

    setTimeout(function(){
      if(document.body.classList.contains('print-correction')) nettoyer();
    },30000);
  }

  var cfg=window.CORRECTION_BILAN;
  if(cfg){
    var zone=document.querySelector('#correction'), btn=document.getElementById('corr-btn'), inp=document.getElementById('corr-mdp'), refus=document.getElementById('corr-refus'), cible=document.getElementById('corr-contenu');
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
