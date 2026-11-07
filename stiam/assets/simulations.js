(()=>{'use strict';
const main=document.querySelector('[data-simulator]');if(!main)return;
const type=main.dataset.simulator,view=document.getElementById('sim-view'),controls=document.getElementById('sim-controls'),out=document.getElementById('sim-output');
const label=(name,id,min,max,value,unit='',step=1)=>`<label for="${id}">${name} <strong id="${id}-value">${value}${unit}</strong></label><input id="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}">`;
const svg=(body)=>`<svg role="img" viewBox="0 0 650 390" xmlns="http://www.w3.org/2000/svg"><rect width="650" height="390" rx="13" fill="#f7fafb"/>${body}</svg>`;
const text=(x,y,t,size=17,fill='#14262b',weight='normal')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${fill}" font-weight="${weight}">${t}</text>`;
const val=(id)=>Number(document.getElementById(id)?.value);
const measure=(id,unit)=>{let el=document.getElementById(id+'-value');if(el)el.textContent=val(id)+unit};
function setup(){
 if(type==='ombres'){controls.innerHTML=label('Hauteur du Soleil','elevation',12,85,35,'°')+label('Hauteur du bâton','tige',10,80,30,' cm');}
 if(type==='lune'){controls.innerHTML=label('Jour de la lunaison','jour',0,29.53,7.4,'',0.1)+'<p class="sim-caption">Déplace le curseur sur un cycle moyen de 29,53 jours.</p>';}
 if(type==='distances'){controls.innerHTML=label('Échelle en mètres par UA','echelle',0.5,3,1,' m',0.25)+'<p class="sim-caption">Les diamètres ne sont jamais reproduits à l’échelle des distances.</p>';}
 if(type==='ciel'){controls.innerHTML=label('Luminosité artificielle du ciel','pollution',0,100,30,' %')+'<p class="sim-caption">Valeurs relatives : ce n’est pas une mesure de luminance réelle.</p>';}
 if(type==='pixels'){controls.innerHTML=label('Paquets perdus sur 8','pertes',0,5,2,'')+'<p class="sim-caption">Chaque ligne est envoyée comme un paquet de 8 pixels. Les pertes sont déterministes.</p>';}
 if(type==='rover'){controls.innerHTML=label('Distance mesurée devant le rover','distance',5,50,18,' cm')+label('Seuil de sécurité','seuil',10,30,15,' cm')+'<p class="sim-caption">Le robot n’a pas d’intelligence générale : il applique une condition explicite.</p>';}
 controls.querySelectorAll('input').forEach(x=>x.addEventListener('input',draw));document.getElementById('sim-reset')?.addEventListener('click',()=>{controls.querySelectorAll('input').forEach(x=>x.value=x.defaultValue);draw()});draw();
}
function draw(){
 if(type==='ombres'){
  measure('elevation','°');measure('tige',' cm');const e=val('elevation'),h=val('tige'),long=h/Math.tan(e*Math.PI/180),scale=2.4,px=Math.min(300,long*scale),y=285,x=300;
  view.innerHTML=svg(`<rect x="0" y="290" width="650" height="100" fill="#edf3ef"/><path d="M0 290 H650" stroke="#789b98" stroke-width="3"/><rect x="${x-7}" y="${y-h*scale}" width="14" height="${h*scale}" fill="#294b4a" rx="3"/><path d="M${x} ${y} L${x+px} ${y}" stroke="#c2185b" stroke-width="11" stroke-linecap="round"/><path d="M${x} ${y-h*scale} L${x+px} ${y}" stroke="#e8a235" stroke-width="3" stroke-dasharray="7 6"/><circle cx="${x-140}" cy="70" r="36" fill="#ffd36f" stroke="#e7a637" stroke-width="3"/>${text(25,30,'Modèle : vue de profil (Soleil non à l’échelle)',16)}${text(305,312,'Bâton',16)}${text(450,312,'Ombre',16,'#c2185b')}`);
  out.innerHTML=`<b>Ombre ≈ ${long.toFixed(1)} cm</b><p>Pour un bâton de ${h} cm, on utilise une relation géométrique simplifiée : longueur = hauteur / tan(angle). L’ombre devient plus courte quand le Soleil monte.</p>`;
 }
 if(type==='lune'){
  measure('jour','');const f=val('jour')/29.53;let canvas=document.createElement('canvas');canvas.width=650;canvas.height=390;view.replaceChildren(canvas);let c=canvas.getContext('2d');c.fillStyle='#0c1a2a';c.fillRect(0,0,650,390);
  c.fillStyle='#fff';c.font='16px Arial';c.fillText('Vue de la Lune depuis la Terre',34,35);c.fillText('Vue schématique de l’orbite',390,35);
  const cx=175,cy=198,R=124,alpha=Math.PI-2*Math.PI*f;
  for(let y=-R;y<=R;y++){for(let x=-R;x<=R;x++){let nx=x/R,ny=y/R,q=nx*nx+ny*ny;if(q>1)continue;let nz=Math.sqrt(1-q),illum=nx*Math.sin(alpha)+nz*Math.cos(alpha);let n=(Math.sin(x*.45+y*.29)+Math.cos(x*.21-y*.11))*5;let bright=illum>0?172+Math.round(n):19+Math.round(n*.3);c.fillStyle=`rgb(${bright},${bright},${Math.min(255,bright+5)})`;c.fillRect(cx+x,cy+y,1,1);}}
  c.strokeStyle='#8c9bab';c.lineWidth=1;c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.stroke();
  const ox=515,oy=190,rr=106; c.strokeStyle='#8ca2b6';c.setLineDash([5,6]);c.lineWidth=2;c.beginPath();c.arc(ox,oy,rr,0,2*Math.PI);c.stroke();c.setLineDash([]);c.fillStyle='#66a3d0';c.beginPath();c.arc(ox,oy,30,0,2*Math.PI);c.fill();c.fillStyle='#fff';c.font='14px Arial';c.fillText('Terre',ox-18,oy+5);
  const th=-Math.PI+2*Math.PI*f;let mx=ox+rr*Math.cos(th),my=oy+rr*Math.sin(th);c.fillStyle='#d9dfe0';c.beginPath();c.arc(mx,my,12,0,Math.PI*2);c.fill();c.fillStyle='#ffd46f';c.fillRect(385,340,36,12);c.fillStyle='#fff';c.font='13px Arial';c.fillText('Soleil : éclairage venant de la gauche',388,328);
  const phases=['Nouvelle Lune','Premier croissant','Premier quartier','Gibbeuse croissante','Pleine Lune','Gibbeuse décroissante','Dernier quartier','Dernier croissant'];let ix=Math.round(f*8)%8;
  out.innerHTML=`<b>${phases[ix]}</b><p>Jour ${val('jour').toFixed(1)} sur 29,53. Portion éclairée visible ≈ ${Math.round((1-Math.cos(2*Math.PI*f))*50)} %. Les phases ne sont pas causées par l’ombre terrestre.</p>`;
 }
 if(type==='distances'){
  measure('echelle',' m');const e=val('echelle');let planet=[['Mercure',.39],['Vénus',.72],['Terre',1],['Mars',1.52],['Jupiter',5.2],['Saturne',9.58],['Uranus',19.2],['Neptune',30.05]];
  let rows=planet.map((a,i)=>`${text(27,68+i*34,a[0],15)}<rect x="132" y="${54+i*34}" width="${(a[1]/30.05)*445}" height="17" rx="3" fill="${i<4?'#0e6e6b':'#c2185b'}"/>${text(590,68+i*34,(a[1]*e).toFixed(2)+' m',14)}`).join('');
  view.innerHTML=svg(text(25,28,`Distance sur le parcours — 1 UA = ${e.toFixed(2)} m`,19,'#14262b','bold')+rows+text(25,361,'Distance moyenne au Soleil uniquement : les diamètres sont hors échelle.',13,'#5a6c71'));
  out.innerHTML=`<b>Neptune : ${(30.05*e).toFixed(2)} m</b><p>La Terre serait à ${e.toFixed(2)} m et Mars à ${(1.52*e).toFixed(2)} m du Soleil. Cette maquette ne représente pas les diamètres des planètes.</p>`;
 }
 if(type==='ciel'){
  measure('pollution',' %');let p=val('pollution');let canvas=document.createElement('canvas');canvas.width=650;canvas.height=390;view.replaceChildren(canvas);let c=canvas.getContext('2d');let bg=Math.floor(3+p*1.25);c.fillStyle=`rgb(${bg},${bg+Math.floor(p*.12)},${bg+Math.floor(p*.22)+11})`;c.fillRect(0,0,650,390);
  let visible=0;for(let i=0;i<270;i++){let x=((i*179+41)%640)+5,y=((i*127+29)%380)+5,magnitude=((i*71)%100)/100;let brightness=1-p/100-magnitude*.85;if(brightness>0.12){visible++;c.fillStyle=`rgba(245,247,255,${Math.min(.95,brightness+.15)})`;c.beginPath();c.arc(x,y,0.8+magnitude*1.4,0,Math.PI*2);c.fill();}}
  out.innerHTML=`<b>${visible} étoiles repérables (modèle)</b><p>Le fond lumineux masque progressivement les sources les plus faibles. Le nombre est simulé ; il ne constitue pas un relevé astronomique réel.</p>`;
 }
 if(type==='pixels'){
  measure('pertes','');let lost=val('pertes'),colors=['#3778ba','#3aa96c','#edb45c','#c75b77'],missing=[1,3,4,6,7].slice(0,lost);
  const pix=(x,y,col)=>`<rect x="${x}" y="${y}" width="30" height="30" stroke="#fff" stroke-width="2" fill="${col}" rx="2"/>`;
  let body=text(29,34,'IMAGE À ENVOYER',18)+text(352,34,'IMAGE RECONSTRUITE',18),count=0;
  for(let r=0;r<8;r++){for(let col=0;col<8;col++){let value=(Math.floor(r/2)+Math.floor(col/2)+((r*col)%3))%4,x=28+col*33,y=60+r*33;body+=pix(x,y,colors[value]);body+=pix(352+col*33,y,missing.includes(r)?'#ccd5d6':colors[value]);if(!missing.includes(r))count++;}}
  view.innerHTML=svg(body+text(30,362,'Chaque ligne est transmise comme un paquet numéroté.',14,'#5a6c71'));
  out.innerHTML=`<b>${8-lost}/8 paquets reçus · ${Math.round((8-lost)/8*100)} %</b><p>Une ligne manquante laisse 8 pixels inconnus. Numéroter les paquets permet de détecter les absences ; il faudrait ensuite demander une retransmission ou restaurer une sauvegarde.</p>`;
 }
 if(type==='rover'){
  measure('distance',' cm');measure('seuil',' cm');const d=val('distance'),s=val('seuil'),stop=d<s;
  view.innerHTML=svg(`<rect x="30" y="74" width="590" height="248" rx="16" fill="#ead6c1"/>`+Array.from({length:24},(_,i)=>`<circle cx="${55+(i*77)%550}" cy="${92+(i*57)%210}" r="${3+(i%4)*2}" fill="#b88f6d"/>`).join('')+`<rect x="428" y="150" width="100" height="84" rx="10" fill="#ab6d55" stroke="#75503f" stroke-width="3"/><rect x="155" y="164" width="82" height="62" rx="8" fill="#3b7886"/><circle cx="160" cy="234" r="15" fill="#33414c"/><circle cx="230" cy="234" r="15" fill="#33414c"/><rect x="225" y="188" width="15" height="13" fill="#253a4a"/><path d="M240 195 H420" stroke="#0e6e6b" stroke-width="3" stroke-dasharray="6 5"/>${text(34,40,'Modèle local : capteur de distance → programme → moteurs',18)}${text(158,282,'Rover',17)}${text(418,274,'Obstacle',17)}${text(265,172,`${d} cm`,18,'#0e6e6b','bold')}`);
  out.innerHTML=`<b>${stop?'ARRÊTER / CONTOURNER':'AVANCER'}</b><p>Mesure = ${d} cm ; seuil = ${s} cm. Si distance &lt; seuil, le programme déclenche une réaction. Cette simulation ne calcule ni freinage réel ni trajectoire sur Mars.</p>`;
 }
}
setup();
})();
