
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

/* Règles communes d'impression injectées pour toute la séquence 6. */
const printStyle=document.createElement('style');
printStyle.id='seq6-print-fix';
printStyle.textContent=`
.print-correction-clone{display:none}
.corr-print-actions{display:flex;justify-content:flex-end;margin-top:16px;padding-top:14px;border-top:1px solid var(--trait,#D2DEDE)}
.btn-print-correction{font:600 14px Archivo,sans-serif;background:var(--magenta,#C2185B);color:#fff;border:0;border-radius:8px;padding:10px 15px;cursor:pointer}
@media print{
  .btn-print-browser,.corr-print-actions{display:none!important}
  body.print-correction>*:not(.print-correction-clone){display:none!important}
  body.print-correction{background:#fff!important;margin:0!important;padding:0!important}
  body.print-correction .print-correction-clone{display:block!important;max-width:none!important;margin:0!important;padding:12mm 14mm!important;color:#14262B!important;background:#fff!important;font-family:"Source Sans 3",Arial,sans-serif!important;font-size:11pt!important;line-height:1.45!important}
  body.print-correction .print-correction-entete{border-bottom:2px solid #0E6E6B;padding-bottom:6mm;margin-bottom:7mm}
  body.print-correction .print-correction-kicker{font:700 9pt Archivo,Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:#C2185B;margin-bottom:2mm}
  body.print-correction .print-correction-entete h1{font:700 19pt Archivo,Arial,sans-serif;line-height:1.15;margin:0;color:#14262B}
  body.print-correction .corr{display:block!important;margin:0!important}
  body.print-correction .corr-section{break-inside:avoid-page;border-top:1px solid #D2DEDE;padding-top:5mm;margin-top:5mm}
  body.print-correction .corr-section:first-child{border-top:0;margin-top:0;padding-top:0}
  body.print-correction h3{font:600 14pt Archivo,Arial,sans-serif;color:#0E6E6B;margin:0 0 3mm}
  body.print-correction img,body.print-correction svg,body.print-correction table,body.print-correction figure{max-width:100%!important;break-inside:avoid-page}
  body.print-correction a{color:#14262B;text-decoration:none}
}
`;
document.head.appendChild(printStyle);

/* Impression navigateur du cours. */
const barre=document.querySelector('.barre');
if(barre && !barre.querySelector('.btn-print-browser')){
  const b=document.createElement('button');
  b.type='button'; b.className='lien btn-print-browser'; b.textContent='Imprimer / PDF navigateur';
  b.addEventListener('click',()=>window.print());
  const etat=barre.querySelector('.etat'); barre.insertBefore(b,etat||null);
}

/* Impression isolée de la correction une fois celle-ci déverrouillée. */
function printCorrection(){
  const cible=document.getElementById('corr-contenu');
  if(!cible || cible.hidden) return;
  const old=document.querySelector('.print-correction-clone'); if(old) old.remove();
  const art=document.createElement('article'); art.className='print-correction-clone';
  const h1=document.querySelector('h1');
  art.innerHTML='<header class="print-correction-entete"><div class="print-correction-kicker">Correction / synthèse</div><h1>'+((h1&&h1.textContent)||document.title)+'</h1></header><div class="corr">'+cible.innerHTML+'</div>';
  document.body.appendChild(art); document.body.classList.add('print-correction');
  const clean=()=>{document.body.classList.remove('print-correction'); const x=document.querySelector('.print-correction-clone'); if(x)x.remove(); window.removeEventListener('afterprint',clean)};
  window.addEventListener('afterprint',clean); window.print(); setTimeout(clean,1500);
}
function ensureCorrectionPrint(){
  const cible=document.getElementById('corr-contenu'), zone=document.getElementById('correction');
  if(!cible||!zone||cible.hidden||zone.querySelector('.btn-print-correction')) return;
  const wrap=document.createElement('div'); wrap.className='corr-print-actions';
  const b=document.createElement('button'); b.type='button'; b.className='btn-print-correction'; b.textContent='Imprimer / enregistrer en PDF la correction / synthèse'; b.addEventListener('click',printCorrection);
  wrap.appendChild(b); cible.insertAdjacentElement('afterend',wrap);
}
const corr=document.getElementById('corr-contenu');
if(corr){
  const obs=new MutationObserver(ensureCorrectionPrint); obs.observe(corr,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true});
  ensureCorrectionPrint();
}

restore();
})();
