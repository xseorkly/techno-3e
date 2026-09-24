
(function(){
'use strict';
const page=(location.pathname.split('/').pop()||'seq6').replace(/\.html$/,'');
const KEY='techno3e_'+page;
const fields=[...document.querySelectorAll('[data-save]')];
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
function save(){const d={};fields.forEach(el=>{if(el.type==='radio'){if(el.checked)d[el.name]=el.value;}else if(el.type==='checkbox'){d[el.id]=el.checked;}else d[el.id]=el.value;});document.querySelectorAll('canvas[data-sketch]').forEach(c=>{try{d['canvas_'+c.id]=c.toDataURL('image/png')}catch(e){}});localStorage.setItem(KEY,JSON.stringify(d));const et=document.querySelector('.etat');if(et)et.textContent='Enregistré automatiquement';}
function restore(){const d=read();fields.forEach(el=>{if(el.type==='radio')el.checked=d[el.name]===el.value;else if(el.type==='checkbox')el.checked=!!d[el.id];else if(Object.prototype.hasOwnProperty.call(d,el.id))el.value=d[el.id];});document.querySelectorAll('canvas[data-sketch]').forEach(c=>{const src=d['canvas_'+c.id];if(src){const im=new Image();im.onload=()=>{const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(im,0,0,c.width,c.height)};im.src=src;}})}
fields.forEach(el=>{el.addEventListener('input',save);el.addEventListener('change',save)});
const nav=document.getElementById('navfiches');if(nav)nav.addEventListener('change',function(){if(this.value)location.href=this.value});
const clear=document.getElementById('effacer');if(clear)clear.addEventListener('click',()=>{if(confirm('Effacer toutes les réponses de cette fiche ?')){localStorage.removeItem(KEY);location.reload()}});
function setupCanvas(c){const ctx=c.getContext('2d');ctx.lineWidth=2;ctx.lineCap='round';ctx.strokeStyle='#14262B';let drawing=false,last=null;function pos(e){const r=c.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return [(p.clientX-r.left)*c.width/r.width,(p.clientY-r.top)*c.height/r.height]};function start(e){drawing=true;last=pos(e);e.preventDefault()}function move(e){if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(...p);ctx.stroke();last=p;e.preventDefault()}function end(){if(drawing){drawing=false;save()}}c.addEventListener('mousedown',start);c.addEventListener('mousemove',move);window.addEventListener('mouseup',end);c.addEventListener('touchstart',start,{passive:false});c.addEventListener('touchmove',move,{passive:false});c.addEventListener('touchend',end);const b=document.querySelector('[data-clear-canvas="'+c.id+'"]');if(b)b.addEventListener('click',()=>{ctx.clearRect(0,0,c.width,c.height);save()});}
document.querySelectorAll('canvas[data-sketch]').forEach(setupCanvas);
function answerBlocks(){const out=[];document.querySelectorAll('.question[data-label]').forEach(q=>{let vals=[];q.querySelectorAll('[data-save]').forEach(el=>{if(el.type==='radio'){if(el.checked)vals.push(el.value)}else if(el.type==='checkbox'){if(el.checked)vals.push(el.getAttribute('data-text')||'Oui')}else{const v=(el.value||'').trim();if(v)vals.push(v)}});if(vals.length)out.push([q.dataset.label,vals.join(' · ')])});return out}
const pdf=document.getElementById('pdf');if(pdf)pdf.addEventListener('click',()=>{if(!(window.jspdf&&window.jspdf.jsPDF)){window.print();return}const nom=(document.getElementById('nom')?.value||'').trim(),pre=(document.getElementById('prenom')?.value||'').trim();if(!nom||!pre){const a=document.getElementById('alerte');if(a){a.hidden=false;a.textContent='Complète au moins ton nom et ton prénom avant de générer le PDF.'}return}const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:'mm',format:'a4'});let y=16;const M=15,W=180;function pc(h){if(y+h>282){doc.addPage();y=16}}function txt(s,size=10,bold=false,color=[20,38,43]){doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...color);const lines=doc.splitTextToSize(String(s||''),W);pc(lines.length*5+3);doc.text(lines,M,y);y+=lines.length*5+3}txt('Olympiades des Sciences de l’Ingénieur · Séquence 6',8,false,[90,108,113]);txt(document.querySelector('h1')?.textContent||'Fiche élève',14,true);txt(nom+' '+pre+' · '+(document.getElementById('classe')?.value||'')+' · équipe '+(document.getElementById('groupe')?.value||''),9,false,[90,108,113]);y+=2;answerBlocks().forEach(([lab,val])=>{txt(lab,10,true,[14,110,107]);txt(val,10)});document.querySelectorAll('canvas[data-sketch]').forEach((c,i)=>{try{pc(58);txt('Production graphique '+(i+1),10,true,[14,110,107]);doc.addImage(c.toDataURL('image/png'),'PNG',M,y,W,45);y+=50}catch(e){}});doc.save(page+'_'+nom.replace(/\W+/g,'-')+'_'+pre.replace(/\W+/g,'-')+'.pdf')});

const printStyle=document.createElement('style');
printStyle.id='seq6-print-fix';
printStyle.textContent=`
.corr-print-actions{display:flex;justify-content:flex-end;margin-top:16px;padding-top:14px;border-top:1px solid var(--trait,#D2DEDE)}
.btn-print-correction{font:600 14px Archivo,sans-serif;background:var(--magenta,#C2185B);color:#fff;border:0;border-radius:8px;padding:10px 15px;cursor:pointer}
.btn-print-correction:disabled{opacity:.65;cursor:wait}
@media print{.btn-print-browser,.corr-print-actions{display:none!important}}
`;
document.head.appendChild(printStyle);

const barre=document.querySelector('.barre');
if(barre && !barre.querySelector('.btn-print-browser')){
  const b=document.createElement('button');
  b.type='button'; b.className='lien btn-print-browser'; b.textContent='Imprimer / PDF navigateur';
  b.addEventListener('click',()=>window.print());
  const etat=barre.querySelector('.etat'); barre.insertBefore(b,etat||null);
}

function chargerHtml2Canvas(){
  return new Promise((resolve,reject)=>{
    if(window.html2canvas) return resolve();
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.async=true;
    s.onload=()=>window.html2canvas?resolve():reject(new Error('html2canvas indisponible'));
    s.onerror=()=>reject(new Error('chargement html2canvas impossible'));
    document.head.appendChild(s);
  });
}
async function pdfCorrection(bouton){
  const cible=document.getElementById('corr-contenu');
  if(!cible||cible.hidden||!cible.innerHTML.trim())return;
  const ancien=bouton.textContent;
  bouton.disabled=true; bouton.textContent='Création du PDF…';
  let support=null;
  try{
    if(!(window.jspdf&&window.jspdf.jsPDF)) throw new Error('jsPDF indisponible');
    await chargerHtml2Canvas();
    support=document.createElement('div');
    support.setAttribute('aria-hidden','true');
    support.style.cssText='position:absolute;left:-10000px;top:0;width:900px;background:#fff;color:#14262B;padding:34px 38px;font-family:Arial,sans-serif;font-size:17px;line-height:1.5;';
    const titre=(document.querySelector('h1')?.textContent||document.title);
    const copie=cible.cloneNode(true); copie.hidden=false; copie.removeAttribute('id'); copie.style.display='block';
    support.innerHTML='<div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#C2185B;margin-bottom:7px">Correction / synthèse</div><div style="font-size:28px;font-weight:700;line-height:1.15;color:#14262B;border-bottom:3px solid #0E6E6B;padding-bottom:16px;margin-bottom:22px">'+titre.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
    support.appendChild(copie); document.body.appendChild(support);
    support.querySelectorAll('h2,h3').forEach(x=>{x.style.color='#0E6E6B';x.style.marginTop='22px';x.style.marginBottom='8px'});
    support.querySelectorAll('table').forEach(t=>{t.style.width='100%';t.style.borderCollapse='collapse';t.querySelectorAll('th,td').forEach(c=>{c.style.border='1px solid #D2DEDE';c.style.padding='7px';c.style.verticalAlign='top'})});
    support.querySelectorAll('img,svg,figure').forEach(x=>x.style.maxWidth='100%');
    support.querySelectorAll('button,.actions,.vlire,iframe').forEach(x=>x.style.display='none');
    const canvas=await window.html2canvas(support,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false,windowWidth:976});
    const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'mm',format:'a4',orientation:'portrait',compress:true});
    const pageW=210,pageH=297,margeX=14,haut=12,bas=12,zoneW=pageW-2*margeX,zoneH=pageH-haut-bas;
    const pxParMm=canvas.width/zoneW,tranchePx=Math.floor(zoneH*pxParMm); let yPx=0,p=1;
    while(yPx<canvas.height){
      if(p>1)doc.addPage();
      const hPx=Math.min(tranchePx,canvas.height-yPx),morceau=document.createElement('canvas');
      morceau.width=canvas.width;morceau.height=hPx;morceau.getContext('2d').drawImage(canvas,0,yPx,canvas.width,hPx,0,0,canvas.width,hPx);
      doc.addImage(morceau.toDataURL('image/jpeg',0.94),'JPEG',margeX,haut,zoneW,hPx/pxParMm,undefined,'FAST');
      doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(90,108,113);doc.text('Correction / synthèse',margeX,pageH-5);doc.text('Page '+p,pageW-margeX,pageH-5,{align:'right'});
      yPx+=hPx;p++;
    }
    doc.save(page+'-correction.pdf');
  }catch(e){
    window.print();
  }finally{
    if(support&&support.parentNode)support.parentNode.removeChild(support);
    bouton.disabled=false;bouton.textContent=ancien;
  }
}
function ensureCorrectionPrint(){
  const cible=document.getElementById('corr-contenu'), zone=document.getElementById('correction');
  if(!cible||!zone||cible.hidden||zone.querySelector('.btn-print-correction')) return;
  const wrap=document.createElement('div'); wrap.className='corr-print-actions';
  const b=document.createElement('button'); b.type='button'; b.className='btn-print-correction'; b.textContent='Télécharger le PDF de la correction / synthèse'; b.addEventListener('click',()=>pdfCorrection(b));
  wrap.appendChild(b); cible.insertAdjacentElement('afterend',wrap);
}
const corr=document.getElementById('corr-contenu');
if(corr){
  const obs=new MutationObserver(ensureCorrectionPrint); obs.observe(corr,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true});
  ensureCorrectionPrint();
}

restore();
})();
