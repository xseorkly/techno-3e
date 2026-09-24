
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
  function chargerScript(src,test){
    return new Promise(function(resolve,reject){
      if(test()) return resolve();
      var s=document.createElement('script');
      s.src=src; s.async=true;
      s.onload=function(){ test()?resolve():reject(new Error('Bibliothèque indisponible')); };
      s.onerror=function(){ reject(new Error('Chargement impossible')); };
      document.head.appendChild(s);
    });
  }
  function nomPDF(){
    var n=(location.pathname.split('/').pop()||'correction').replace(/\.html?$/i,'');
    return n+'-correction.pdf';
  }

  async function genererPDFCorrection(cible,bouton){
    if(!cible || cible.hidden || !cible.innerHTML.trim()) return;
    var ancienTexte=bouton ? bouton.textContent : '';
    if(bouton){ bouton.disabled=true; bouton.textContent='Création du PDF…'; }
    var support=null;
    try{
      await chargerScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',function(){return !!(window.jspdf&&window.jspdf.jsPDF);});
      await chargerScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',function(){return !!window.html2canvas;});

      support=document.createElement('div');
      support.setAttribute('aria-hidden','true');
      support.style.cssText='position:absolute;left:-10000px;top:0;width:900px;background:#fff;color:#14262B;padding:34px 38px;font-family:Arial,sans-serif;font-size:17px;line-height:1.5;';
      var copie=cible.cloneNode(true);
      copie.hidden=false;
      copie.removeAttribute('id');
      copie.style.display='block';
      support.innerHTML='<div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#C2185B;margin-bottom:7px">Correction / synthèse</div>'+
        '<div style="font-size:28px;font-weight:700;line-height:1.15;color:#14262B;border-bottom:3px solid #0E6E6B;padding-bottom:16px;margin-bottom:22px">'+titrePage().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
      support.appendChild(copie);
      document.body.appendChild(support);

      Array.prototype.slice.call(support.querySelectorAll('h2,h3')).forEach(function(x){
        x.style.color='#0E6E6B'; x.style.marginTop='22px'; x.style.marginBottom='8px'; x.style.breakAfter='avoid';
      });
      Array.prototype.slice.call(support.querySelectorAll('table')).forEach(function(t){
        t.style.width='100%'; t.style.borderCollapse='collapse';
        Array.prototype.slice.call(t.querySelectorAll('th,td')).forEach(function(c){c.style.border='1px solid #D2DEDE';c.style.padding='7px';c.style.verticalAlign='top';});
      });
      Array.prototype.slice.call(support.querySelectorAll('img,svg,figure')).forEach(function(x){x.style.maxWidth='100%';});
      Array.prototype.slice.call(support.querySelectorAll('button,.actions,.vlire,iframe')).forEach(function(x){x.style.display='none';});

      var canvas=await window.html2canvas(support,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false,windowWidth:976});
      var jsPDF=window.jspdf.jsPDF;
      var doc=new jsPDF({unit:'mm',format:'a4',orientation:'portrait',compress:true});
      var pageW=210, pageH=297, margeX=14, haut=12, bas=12;
      var zoneW=pageW-2*margeX, zoneH=pageH-haut-bas;
      var pxParMm=canvas.width/zoneW;
      var tranchePx=Math.floor(zoneH*pxParMm);
      var yPx=0, page=1;
      while(yPx<canvas.height){
        if(page>1) doc.addPage();
        var hPx=Math.min(tranchePx,canvas.height-yPx);
        var morceau=document.createElement('canvas');
        morceau.width=canvas.width; morceau.height=hPx;
        morceau.getContext('2d').drawImage(canvas,0,yPx,canvas.width,hPx,0,0,canvas.width,hPx);
        var hMm=hPx/pxParMm;
        doc.addImage(morceau.toDataURL('image/jpeg',0.94),'JPEG',margeX,haut,zoneW,hMm,undefined,'FAST');
        doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(90,108,113);
        doc.text('Correction / synthèse',margeX,pageH-5);
        doc.text('Page '+page,pageW-margeX,pageH-5,{align:'right'});
        yPx+=hPx; page++;
      }
      doc.save(nomPDF());
    }catch(e){
      try{
        sessionStorage.setItem('techno3e_print_correction',JSON.stringify({title:titrePage(),html:cible.innerHTML}));
        sessionStorage.setItem('techno3e_print_return',location.href);
        location.href='print-correction.html';
      }catch(err){ window.print(); }
    }finally{
      if(support && support.parentNode) support.parentNode.removeChild(support);
      if(bouton){ bouton.disabled=false; bouton.textContent=ancienTexte; }
    }
  }

  function ajouterBoutonImpression(zone,cible){
    if(!zone || !cible || cible.hidden || !cible.innerHTML.trim()) return;
    if(zone.querySelector('.btn-print-correction')) return;
    var actions=document.createElement('div');
    actions.className='corr-print-actions';
    var b=document.createElement('button');
    b.type='button';
    b.className='btn-print-correction';
    b.textContent='Télécharger le PDF de la correction / synthèse';
    b.addEventListener('click',function(){ genererPDFCorrection(cible,b); });
    actions.appendChild(b);
    cible.insertAdjacentElement('afterend',actions);
  }

  var zone=document.getElementById('correction');
  var cible=document.getElementById('corr-contenu');

  if(zone && cible){
    var surveiller=function(){ ajouterBoutonImpression(zone,cible); };
    try{
      var obs=new MutationObserver(surveiller);
      obs.observe(cible,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true});
    }catch(e){}
    surveiller();
  }

  var cfg=window.CORRECTION_BILAN;
  if(cfg){
    var btn=document.getElementById('corr-btn'), inp=document.getElementById('corr-mdp'), refus=document.getElementById('corr-refus');
    if(zone && btn && inp && cible){
      function ouvrir(){
        if(empreinte(inp.value)!==cfg.empreinte){ refus.hidden=false; cible.hidden=true; return; }
        refus.hidden=true;
        try{
          var sections=JSON.parse(decode64(cfg.coffre));
          cible.innerHTML=sections.map(function(s){return '<section class="corr-section"><h3>'+s[0]+'</h3>'+rendreLignes(s[1])+'</section>';}).join('');
          cible.hidden=false; zone.classList.add('ouverte');
          ajouterBoutonImpression(zone,cible);
          cible.scrollIntoView({behavior:'smooth',block:'nearest'});
        }catch(e){ refus.textContent='Impossible de charger la correction.'; refus.hidden=false; }
      }
      btn.addEventListener('click',ouvrir);
      inp.addEventListener('keydown',function(e){if(e.key==='Enter') ouvrir();});
    }
  }

  document.querySelectorAll('.barre').forEach(function(barre){
    if(barre.querySelector('.btn-print-browser')) return;
    var b=document.createElement('button');
    b.type='button';
    b.className='lien btn-print-browser';
    b.textContent='Imprimer / PDF navigateur';
    b.addEventListener('click',function(){window.print();});
    var etat=barre.querySelector('.etat');
    barre.insertBefore(b,etat||null);
  });
})();
