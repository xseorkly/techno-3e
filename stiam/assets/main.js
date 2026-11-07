(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const ns='astro-v1:'+location.pathname;
const get=k=>{try{return localStorage.getItem(k)}catch{return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
function start(){
 // Ajouter la bibliographie au menu de toutes les pages, y compris les activités.
 const nav=document.querySelector('.navlinks');
 if(nav&&!nav.querySelector('a[href$="sources.html"]')){
  const sub=/\/(?:activites|niveau|outils)\//.test(location.pathname);
  const link=document.createElement('a');
  link.href=(sub?'../':'')+'sources.html';
  link.textContent='Sources';
  nav.append(link);
 }
 const menu=$('.menu-toggle'),links=$('.navlinks');if(menu&&links)menu.addEventListener('click',()=>{let o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o+'')});
 if(get('astro-contrast')==='1')document.body.classList.add('high-contrast');$('.contrast-toggle')?.addEventListener('click',()=>{document.body.classList.toggle('high-contrast');set('astro-contrast',document.body.classList.contains('high-contrast')?'1':'0')});
 let filter=$('[data-filter-target]');if(filter)filter.addEventListener('input',()=>{let q=filter.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();$$(filter.dataset.filterTarget).forEach(el=>{el.hidden=q&&!el.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(q);if(q&&!el.hidden&&el.matches('details'))el.open=true;})});
 $$('[data-gallery]').forEach(btn=>btn.addEventListener('click',()=>{$$('[data-gallery]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$$('.gallery-card').forEach(c=>c.hidden=btn.dataset.gallery!=='all'&&c.dataset.level!==btn.dataset.gallery)}));
 $$('[data-save]').forEach(el=>{
   const key=ns+':'+(el.id||el.name||'champ')+(el.type==='radio'?':'+el.value:'');
   const pk=['nom','prenom','classe','groupe','role'].includes(el.id)?'astro-profile:'+el.id:null;
   const val=get(key)??(pk?get(pk):null);
   if(val!==null){if(el.type==='checkbox'||el.type==='radio')el.checked=val==='true';else el.value=val;}
   const save=()=>{set(key,el.type==='checkbox'||el.type==='radio'?String(el.checked):el.value);if(pk)set(pk,el.value)};
   el.addEventListener('input',save);el.addEventListener('change',()=>{save();if(el.type==='radio')$$('input[type=radio][data-save]').filter(r=>r.name===el.name).forEach(r=>set(ns+':'+(r.id||r.name||'champ')+':'+r.value,String(r.checked)))});
 });
 const lesson=$('.lesson-page');if(lesson){const id=lesson.dataset.page;set('astro-visited:'+id,'1');
  $('[data-check-quiz]')?.addEventListener('click',e=>{let correct=0,total=0;$$('.qcm[data-quiz]').forEach(block=>{total++;let selected=$('input:checked',block),result=$('.quiz-feedback',block);$$('.choice',block).forEach(c=>c.classList.remove('correct','incorrect'));if(!selected){result.textContent='Choisis une réponse.';return}let good=Number(selected.value)===Number(block.dataset.answer);selected.closest('.choice').classList.add(good?'correct':'incorrect');result.textContent=(good?'✓ Bonne réponse. ':'↻ À revoir. ')+block.dataset.feedback;if(good)correct++});if(correct===total&&total){set('astro-done:'+id,'1');e.currentTarget.textContent='✓ QCM réussis !'}});
  $('[data-teacher-unlock]')?.addEventListener('click',()=>{let input=$('.teacher-unlock input'),result=$('.teacher-message');if(input.value===(window.ASTRO_CONFIG?.teacherCode||'')&&input.value){$$('.teacher-only').forEach(x=>x.hidden=false);result.textContent='Correction affichée.';input.value=''}else result.textContent='Code incorrect.'});
 }
 $$('.session').forEach(a=>{let m=a.getAttribute('href').match(/([a-z0-9]+-s\d+)\.html/);if(m&&get('astro-visited:'+m[1])==='1')a.classList.add('visited')});
 $$('[data-print]').forEach(btn=>btn.addEventListener('click',()=>{$$('textarea').forEach(el=>el.style.height=Math.max(el.scrollHeight,82)+'px');window.print()}));
 $('[data-export-json]')?.addEventListener('click',()=>{let fields={};$$('[data-save]').forEach(el=>{let id=el.id||el.name;if(!id)return;if(el.type==='radio'){if(el.checked)fields[id]=el.value}else fields[id]=el.type==='checkbox'?el.checked:el.value});const b=new Blob([JSON.stringify({document:location.pathname,date:new Date().toISOString(),reponses:fields},null,2)],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=(lesson?.dataset.page||'activite')+'-reponses.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)});
 $('[data-reset]')?.addEventListener('click',()=>{if(!confirm('Effacer les réponses de cette séance ?'))return;$$('[data-save]').forEach(el=>{let key=ns+':'+(el.id||el.name||'champ')+(el.type==='radio'?':'+el.value:'');try{localStorage.removeItem(key)}catch{}if(el.type==='radio'||el.type==='checkbox')el.checked=false;else el.value=''});$$('.quiz-feedback').forEach(x=>x.textContent='');window.scrollTo({top:0,behavior:'smooth'})});
 $('#navfiches')?.addEventListener('change',e=>{const file=e.target.value;if(/^[a-z0-9-]+-s\d{2}\.html$/.test(file))location.href=file});
 const d=$('#deposit-action'),url=window.ASTRO_CONFIG?.depositUrl;if(d&&/^https:\/\//.test(url||'')){d.innerHTML='';let a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.className='btn btn-primary';a.textContent='Ouvrir le formulaire de dépôt ↗';d.append(a)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
