function download(name,content,type='text/plain'){const u=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1500)}function csv(rows){return '\uFEFF'+rows.map(r=>r.map(v=>{v=String(v??'');if(/^[=+@-]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'}).join(';')).join('\r\n')}async function copyText(id){const e=document.getElementById(id);try{await navigator.clipboard.writeText(e.value??e.textContent)}catch{const t=document.createElement('textarea');t.value=e.value??e.textContent;document.body.append(t);t.select();document.execCommand('copy');t.remove()}}
function exportPractice(button){
  const area=button.closest('[data-practice]');
  if(!area)return;
  const title=area.dataset.practice;
  const fields=Array.from(area.querySelectorAll('textarea[data-question]'));
  const protect=v=>/^[\s\u0000-\u001f]*[=+@-]/.test(v)||/^[\t\r\n]/.test(v)?"'"+v:v;
  download('retour-experience-'+title+'.csv',csv([['Atelier','Moment','Question','Réponse'],...fields.map((e,i)=>[title,i<3?'Avant':'Après',e.dataset.question,protect(e.value)])]),'text/csv;charset=utf-8');
}
function openTargetDetails(){
  if(!location.hash)return;
  let id;
  try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
  const target=document.getElementById(id);
  if(!target)return;
  let el=target;
  while(el){if(el.tagName==='DETAILS')el.open=true;el=el.parentElement;}
}
window.addEventListener('hashchange',openTargetDetails);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',openTargetDetails);else openTargetDetails();
