(function(){
var K='atelier_fcode';
function b2u(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
async function dec(enc,code){
  var p=enc.split('.').map(b2u);
  var km=await crypto.subtle.importKey('raw',new TextEncoder().encode(code),'PBKDF2',false,['deriveKey']);
  var key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:p[0],iterations:150000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
  var out=await crypto.subtle.decrypt({name:'AES-GCM',iv:p[1]},key,p[2]);
  return new TextDecoder().decode(out);
}
async function openBox(box,code){
  try{
    var h=await dec(box.getAttribute('data-enc'),code);
    var holder=box.closest('.section')||box;
    var d=document.createElement('div');d.className='funlocked';d.innerHTML=h;
    holder.replaceWith(d);
    try{sessionStorage.setItem(K,code)}catch(e){}
    var det=d.closest('details');if(det)det.open=true;
    return true;
  }catch(e){return false}
}
function init(){
  if(!(window.crypto&&crypto.subtle))return;
  var boxes=[].slice.call(document.querySelectorAll('.fgate'));
  boxes.forEach(function(box){
    var f=box.querySelector('form');
    f.addEventListener('submit',async function(ev){
      ev.preventDefault();
      var v=f.querySelector('input').value;
      var ok=await openBox(box,v);
      if(!ok){var e=box.querySelector('.ferr');if(e)e.hidden=false}
    });
  });
  var saved=null;try{saved=sessionStorage.getItem(K)}catch(e){}
  if(saved)boxes.forEach(function(b){openBox(b,saved)});
}
init();
})();
