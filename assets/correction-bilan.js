
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
  function titrePage(){ var h1=document.querySelector('h1'); return h1 ? h1.textContent.trim() : document.title; }
  function echapper(t){
    return String(t||'').replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function imprimerCorrection(cible){
    if(!cible || cible.hidden) return;

    var ancien=document.getElementById('correction-print-frame');
    if(ancien) ancien.remove();

    var frame=document.createElement('iframe');
    frame.id='correction-print-frame';
    frame.setAttribute('title','Impression de la correction');
    frame.style.position='fixed';
    frame.style.right='0';
    frame.style.bottom='0';
    frame.style.width='1px';
    frame.style.height='1px';
    frame.style.border='0';
    frame.style.opacity='0';
    frame.style.pointerEvents='none';
    document.body.appendChild(frame);

    var doc=frame.contentWindow.document;
    var base=location.href.replace(/[^/]*$/,'');
    var html='<!doctype html><html lang="fr"><head><meta charset="utf-8">'+
      '<meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<base href="'+echapper(base)+'">'+
      '<title>'+echapper(titrePage())+' — Correction</title>'+
      '<style>'+ 
      '@page{size:A4;margin:12mm 14mm}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;color:#14262B}body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.45}header{border-bottom:2px solid #0E6E6B;padding-bottom:6mm;margin-bottom:7mm}.kicker{font-weight:700;font-size:9pt;text-transform:uppercase;letter-spacing:.05em;color:#C2185B;margin-bottom:2mm}h1{font-size:19pt;line-height:1.15;margin:0;color:#14262B}h2,h3{color:#0E6E6B;break-after:avoid}h3{font-size:14pt;margin:5mm 0 3mm}.corr-section{border-top:1px solid #D2DEDE;padding-top:5mm;margin-top:5mm}.corr-section:first-child{border-top:0;margin-top:0;padding-top:0}p,li{orphans:3;widows:3}img,svg,table,figure{max-width:100%!important;break-inside:avoid-page}table{width:100%;border-collapse:collapse}th,td{border:1px solid #D2DEDE;padding:6px;vertical-align:top}a{color:#14262B;text-decoration:none}.ret,.callout,.situation,.card{break-inside:avoid-page}'+
      '</style></head><body><header><div class="kicker">Correction / synthèse</div><h1>'+echapper(titrePage())+'</h1></header><main>'+cible.innerHTML+'</main></body></html>';

    var nettoyer=function(){
      setTimeout(function(){ var f=document.getElementById('correction-print-frame'); if(f) f.remove(); },500);
    };

    frame.onload=function(){
      var w=frame.contentWindow;
      try{
        w.addEventListener('afterprint',nettoyer,{once:true});
        setTimeout(function(){ w.focus(); w.print(); },350);
        setTimeout(nettoyer,30000);
      }catch(e){
        nettoyer();
        window.print();
      }
    };

    doc.open();
    doc.write(html);
    doc.close();
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
