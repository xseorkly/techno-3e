(function(){
var KEY='atelier-conception-v1',st={};
try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){st={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));var s=document.getElementById('saved');if(s&&!window.SECT)s.textContent='Enregistré sur cet ordinateur ✓'}catch(e){var s2=document.getElementById('saved');if(s2)s2.textContent='Enregistrement impossible dans ce navigateur : copiez vos réponses avant de partir.'}}
function grow(t){t.style.height='auto';t.style.height=Math.max(t.scrollHeight+2,44)+'px'}
[].forEach.call(document.querySelectorAll('[data-k]'),function(el){
  var k=el.getAttribute('data-k');
  if(el.type==='radio'){el.checked=(st[k]===el.value);el.addEventListener('change',function(){if(el.checked){st[k]=el.value;save()}});}
  else if(el.type==='checkbox'){el.checked=(st[k]==='1');el.addEventListener('change',function(){st[k]=el.checked?'1':'';save()});}
  else{if(st[k])el.value=st[k];grow(el);el.addEventListener('input',function(){st[k]=el.value;grow(el);save()});}
});
var ep=document.getElementById('echo-phrase');if(ep&&st.phrase)ep.textContent=st.phrase;
// minuteur
var tb=document.getElementById('tmr');
if(tb){
  var out=document.getElementById('tmrout'),iv=null;
  function show(end){var left=Math.max(0,Math.round((end-Date.now())/1000));var m=Math.floor(left/60),s=left%60;out.textContent=left>0?('Reste '+m+':'+(s<10?'0':'')+s):'Temps écoulé : passez à l’étape suivante.';if(left<=0&&iv){clearInterval(iv);iv=null}}
  tb.addEventListener('click',function(){var end=Date.now()+parseInt(tb.getAttribute('data-min'),10)*60000;try{sessionStorage.setItem('atelier_tmr_'+location.pathname,end)}catch(e){}if(iv)clearInterval(iv);show(end);iv=setInterval(function(){show(end)},1000);tb.textContent='Relancer le minuteur'});
  try{var e0=parseInt(sessionStorage.getItem('atelier_tmr_'+location.pathname)||'0',10);if(e0>Date.now()){show(e0);iv=setInterval(function(){show(e0)},1000);tb.textContent='Relancer le minuteur'}}catch(e){}
}
// ma fiche
if(window.SECT){
  var o=document.getElementById('fiche-out'),txt='';
  window.SECT.forEach(function(s){
    var sec=document.createElement('section');sec.className='fsec2';
    var h=document.createElement('h2');h.textContent=(s[0]==='0'?'':s[0]+'. ')+s[1];sec.appendChild(h);txt+='\n'+h.textContent+'\n';
    s[2].forEach(function(f){
      var v=(st[f[0]]||'').trim();
      var d=document.createElement('div');d.className='fr';
      var l=document.createElement('div');l.className='fl';l.textContent=f[1];
      var a=document.createElement('div');a.className='fv'+(v?'':' empty');a.textContent=v||'— (non rempli)';
      d.appendChild(l);d.appendChild(a);sec.appendChild(d);txt+='\n'+f[1]+'\n'+(v||'—')+'\n';
    });
    o.appendChild(sec);
  });
  var sup=st.support?('Support choisi : '+st.support):'';
  document.getElementById('print').addEventListener('click',function(){window.print()});
  document.getElementById('copy').addEventListener('click',function(){var b=this;function ok(){b.textContent='Copié ✓';setTimeout(function(){b.textContent='Copier le texte'},2000)}if(navigator.clipboard)navigator.clipboard.writeText('FICHE DE CONCEPTION\n'+txt).then(ok,function(){});});
}
})();
