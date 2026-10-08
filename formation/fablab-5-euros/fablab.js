(function(){
var KEY='fablab-5-euros-v1',st={};
try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){st={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));var s=document.getElementById('saved');if(s&&!window.SECT)s.textContent='Enregistré sur cet ordinateur ✓'}catch(e){var s2=document.getElementById('saved');if(s2)s2.textContent='Enregistrement impossible dans ce navigateur : copiez vos réponses avant de partir.'}}
function grow(t){t.style.height='auto';t.style.height=Math.max(t.scrollHeight+2,44)+'px'}
function num(v){v=parseFloat(String(v||'').replace(',','.'));return isNaN(v)?0:v}
function eur(x){return x.toFixed(2).replace('.',',')+' €'}
function budget(){
  var per=0,com=0,i;
  for(i=1;i<=8;i++){var o=st['ob'+i+'o'],c=num(st['ob'+i+'p'])*(st['ob'+i+'q']===undefined||st['ob'+i+'q']===''?1:num(st['ob'+i+'q']));var line=(o==='acheté')?c:0;per+=line;var el=document.querySelector('[data-line=ob'+i+']');if(el)el.textContent=eur(line)}
  for(i=1;i<=4;i++){var c2=num(st['cm'+i+'p'])*(st['cm'+i+'q']===undefined||st['cm'+i+'q']===''?1:num(st['cm'+i+'q']));com+=c2;var el2=document.querySelector('[data-line=cm'+i+']');if(el2)el2.textContent=eur(c2)}
  var nb=num(st.nbobj)||1,tot=per*nb+com;
  return {per:per,com:com,nb:nb,tot:tot};
}
function showBudget(){
  var b=budget();var s=document.getElementById('bsum');if(!s)return;
  [['obj',b.per,5],['tot',b.tot,50]].forEach(function(r){var e=s.querySelector('[data-bs='+r[0]+']');e.querySelector('b').textContent=eur(r[1]);e.className='bs '+(r[1]>r[2]?'over':(r[1]>0?'ok':''));e.querySelector('.bm').textContent=(r[1]>r[2]?'dépasse le maximum de ':'maximum ')+r[2]+' €'});
}
function echo(){var e=document.getElementById('echo-budget');if(!e)return;var b=budget();e.textContent='Vos totaux de l’étape 4 : un objet coûte '+eur(b.per)+' (maximum 5 €) ; matériel total '+eur(b.tot)+' pour '+b.nb+' objet'+(b.nb>1?'s':'')+' (maximum 50 €).';e.className='callout'+((b.per>5||b.tot>50)?' over':'')}
function cardCount(){var c=document.getElementById('ccount');if(!c)return;var n=document.querySelectorAll('input[data-card]:checked').length;c.textContent=n+(n>1?' cartes cochées':' carte cochée')+(n>6?' : essayez de n’en garder que 6 au plus':'')}
[].forEach.call(document.querySelectorAll('[data-k]'),function(el){
  var k=el.getAttribute('data-k');
  if(el.type==='radio'){el.checked=(st[k]===el.value);el.addEventListener('change',function(){if(el.checked){st[k]=el.value;save()}});}
  else if(el.type==='checkbox'){el.checked=(st[k]==='1');el.addEventListener('change',function(){st[k]=el.checked?'1':'';save();cardCount()});}
  else{if(st[k]!==undefined)el.value=st[k];if(el.tagName==='TEXTAREA')grow(el);
    var ev=(el.tagName==='SELECT')?'change':'input';
    el.addEventListener(ev,function(){st[k]=el.value;if(el.tagName==='TEXTAREA')grow(el);save();showBudget()});}
});
showBudget();cardCount();echo();
var tb=document.getElementById('tmr');
if(tb){
  var out=document.getElementById('tmrout'),iv=null;
  function show(end){var left=Math.max(0,Math.round((end-Date.now())/1000));var m=Math.floor(left/60),s=left%60;out.textContent=left>0?('Reste '+m+':'+(s<10?'0':'')+s):'Temps écoulé : passez à l’étape suivante.';if(left<=0&&iv){clearInterval(iv);iv=null}}
  tb.addEventListener('click',function(){var end=Date.now()+parseInt(tb.getAttribute('data-min'),10)*60000;try{sessionStorage.setItem('fab_tmr_'+location.pathname,end)}catch(e){}if(iv)clearInterval(iv);show(end);iv=setInterval(function(){show(end)},1000);tb.textContent='Relancer le minuteur'});
  try{var e0=parseInt(sessionStorage.getItem('fab_tmr_'+location.pathname)||'0',10);if(e0>Date.now()){show(e0);iv=setInterval(function(){show(e0)},1000);tb.textContent='Relancer le minuteur'}}catch(e){}
}
if(window.SECT){
  var o=document.getElementById('fiche-out'),txt='';
  window.SECT.forEach(function(s){
    var sec=document.createElement('section');sec.className='fsec2';
    var h=document.createElement('h2');h.textContent=s[0]+'. '+s[1];sec.appendChild(h);txt+='\n'+h.textContent+'\n';
    s[2].forEach(function(f){
      var d=document.createElement('div');d.className='fr';
      var l=document.createElement('div');l.className='fl';
      var a=document.createElement('div');
      if(f[0]==='@budget'){
        var b=budget();l.textContent='Budget';
        var rows=[];for(var i=1;i<=8;i++){if(st['ob'+i+'d'])rows.push('• '+st['ob'+i+'d']+' ('+(st['ob'+i+'o']||'origine non précisée')+', '+eur(num(st['ob'+i+'p']))+' × '+(st['ob'+i+'q']||1)+')')}
        var com=[];for(var j=1;j<=4;j++){if(st['cm'+j+'d'])com.push('• '+st['cm'+j+'d']+' ('+eur(num(st['cm'+j+'p']))+' × '+(st['cm'+j+'q']||1)+')')}
        var t='Pour un objet :\n'+(rows.join('\n')||'—')+'\nCoût d’un objet : '+eur(b.per)+' (maximum 5 €)\n\nMatériel partagé :\n'+(com.join('\n')||'—')+'\n\nNombre d’objets : '+b.nb+'\nMatériel total : '+eur(b.tot)+' (maximum 50 €)';
        a.className='fv'+((b.per>5||b.tot>50)?' over':'');a.textContent=t;txt+='\nBudget\n'+t+'\n';
      }else if(f[0]==='@cards'){
        l.textContent=f[1];var sel=(window.CARDS||[]).filter(function(c){return st['card_'+c[0]]==='1'});
        var t2=sel.length?sel.map(function(c){return c[0]+' · '+c[1]+' — '+c[2]}).join('\n'):'— (aucune carte cochée)';
        a.className='fv'+(sel.length?'':' empty');a.textContent=t2;txt+='\n'+f[1]+'\n'+t2+'\n';
      }else if(f[0].indexOf('@checks:')===0){
        var pp=f[0].split(':'),pre=pp[1],cnt=parseInt(pp[2],10),lst=(window.LISTS&&window.LISTS[pre])||[],pk=[];
        for(var q=0;q<cnt;q++){if(st[pre+q]==='1')pk.push('• '+(lst[q]||('élément '+(q+1))))}
        l.textContent=f[1];var t3=pk.length?pk.join('\n'):'— (rien de coché)';a.className='fv'+(pk.length?'':' empty');a.textContent=t3;txt+='\n'+f[1]+'\n'+t3+'\n';
      }else if(f[0]==='@seances'){
        l.textContent=f[1];var sp=[],tm=0;
        for(var z=1;z<=5;z++){if(st['se'+z+'t']||st['se'+z+'e']||st['se'+z+'p']){tm+=num(st['se'+z+'d']);sp.push('Séance '+z+' : '+(st['se'+z+'t']||'(sans titre)')+' ('+(st['se'+z+'d']||'?')+' min)\n  Élève : '+(st['se'+z+'e']||'—')+'\n  Enseignant : '+(st['se'+z+'p']||'—')+'\n  Trace : '+(st['se'+z+'r']||'—'))}}
        var t4=sp.length?sp.join('\n\n')+'\n\nTotal : '+tm+' min':'— (aucune séance décrite)';a.className='fv'+(sp.length?'':' empty');a.textContent=t4;txt+='\n'+f[1]+'\n'+t4+'\n';
      }else{
        l.textContent=f[1];var v=(st[f[0]]||'').trim();a.className='fv'+(v?'':' empty');a.textContent=v||'— (non rempli)';txt+='\n'+f[1]+'\n'+(v||'—')+'\n';
      }
      d.appendChild(l);d.appendChild(a);sec.appendChild(d);
    });
    o.appendChild(sec);
  });
  document.getElementById('print').addEventListener('click',function(){window.print()});
  document.getElementById('copy').addEventListener('click',function(){var b=this;function ok(){b.textContent='Copié ✓';setTimeout(function(){b.textContent='Copier le texte'},2000)}if(navigator.clipboard)navigator.clipboard.writeText('LE FABLAB À 5 EUROS : FICHE DE CONCEPTION\n'+txt).then(ok,function(){});});
}
})();
