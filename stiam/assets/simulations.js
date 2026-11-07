(()=>{'use strict';
/* Simulateurs ASTROTECH. Modèles simplifiés : ils illustrent un principe, ils ne remplacent pas une observation ou une mesure. */
const main=document.querySelector('[data-simulator]');
if(!main)return;
const type=main.dataset.simulator,view=document.getElementById('sim-view'),controls=document.getElementById('sim-controls'),out=document.getElementById('sim-output');
const fr=(x,d=1)=>x.toFixed(d).replace('.',',');
const slider=(name,id,min,max,value,unit='',step=1)=>`<label for="${id}">${name} <strong id="${id}-value"></strong></label><input id="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}" data-unit="${unit}">`;
const svg=(w,h,body)=>`<svg role="img" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="13" fill="#f7fafb"/>${body}</svg>`;
const txt=(x,y,t,size=16,fill='#14262b',anchor='start',weight='normal')=>`<text x="${x}" y="${y}" font-family="Source Sans 3,Arial,sans-serif" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${t}</text>`;
const val=(id)=>Number(document.getElementById(id)?.value);
function refreshLabels(){controls.querySelectorAll('input[type=range]').forEach(r=>{const el=document.getElementById(r.id+'-value');if(el&&!r.dataset.custom)el.textContent=(Number(r.step)<1?fr(Number(r.value),Number(r.step)<0.1?2:1):r.value)+(r.dataset.unit||'')})}

/* ---------- Position du Soleil (algorithme de la NOAA), Vienne 48,21° N, 16,37° E ---------- */
const LAT=48.2082,LON=16.3738,rad=Math.PI/180;
function soleil(doy,heureLegale){
  const ete=doy>=88&&doy<298; // heure d'été 2026 : du 29 mars au 25 octobre
  const tu=heureLegale-(ete?2:1);
  const jd=2461041.5+(doy-1)+tu/24; // 1er janvier 2026 à 0 h TU
  const T=(jd-2451545)/36525;
  const L0=(280.46646+T*(36000.76983+T*0.0003032))%360,M=357.52911+T*(35999.05029-0.0001537*T),e=0.016708634-T*(0.000042037+0.0000001267*T);
  const C=Math.sin(M*rad)*(1.914602-T*(0.004817+0.000014*T))+Math.sin(2*M*rad)*(0.019993-0.000101*T)+Math.sin(3*M*rad)*0.000289;
  const om=125.04-1934.136*T,lam=L0+C-0.00569-0.00478*Math.sin(om*rad);
  const eps0=23+(26+(21.448-T*(46.815+T*(0.00059-T*0.001813)))/60)/60,eps=eps0+0.00256*Math.cos(om*rad);
  const dec=Math.asin(Math.sin(eps*rad)*Math.sin(lam*rad))/rad,y=Math.tan(eps/2*rad)**2;
  const eot=4*(y*Math.sin(2*L0*rad)-2*e*Math.sin(M*rad)+4*e*y*Math.sin(M*rad)*Math.cos(2*L0*rad)-0.5*y*y*Math.sin(4*L0*rad)-1.25*e*e*Math.sin(2*M*rad))/rad;
  const tst=((tu*60+eot+4*LON)%1440+1440)%1440,ha=tst/4-180;
  const cz=Math.sin(LAT*rad)*Math.sin(dec*rad)+Math.cos(LAT*rad)*Math.cos(dec*rad)*Math.cos(ha*rad);
  const elev=90-Math.acos(Math.max(-1,Math.min(1,cz)))/rad;
  const az=((Math.atan2(Math.sin(ha*rad),Math.cos(ha*rad)*Math.sin(LAT*rad)-Math.tan(dec*rad)*Math.cos(LAT*rad))/rad+180)%360+360)%360;
  return {elev,az,ete};
}
const DIRS=['nord','nord-est','est','sud-est','sud','sud-ouest','ouest','nord-ouest'];
const dirNom=(az)=>DIRS[Math.round(((az%360)+360)%360/45)%8];
const MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function dateNom(doy){const d=new Date(Date.UTC(2026,0,1)+(doy-1)*864e5);return d.getUTCDate()+(d.getUTCDate()===1?'er':'')+' '+MOIS[d.getUTCMonth()];}
function heureNom(h){const m=Math.round((h%1)*60);return Math.floor(h)+' h '+String(m).padStart(2,'0');}

function setup(){
  if(type==='ombres'){
    controls.innerHTML=slider('Date','jour',1,365,266,'')+slider('Heure à la montre','heure',5,21,12.75,'',0.25)+slider('Hauteur du bâton','tige',10,60,20,' cm')+
      '<p class="sim-caption">Le simulateur calcule la position réelle du Soleil vue depuis Vienne (48° N), en tenant compte de l’heure d’été.</p>';
    ['jour','heure'].forEach(id=>document.getElementById(id).dataset.custom='1');
  }
  if(type==='lune'){controls.innerHTML=slider('Jour de la lunaison','jour',0,29.5,7.4,'',0.1)+'<p class="sim-caption">Une lunaison dure en moyenne 29,5 jours. À droite : vue de dessus, depuis le nord.</p>';}
  if(type==='distances'){controls.innerHTML=slider('Échelle (mètres pour 1 UA)','echelle',0.5,3,2,' m',0.25)+'<p class="sim-caption">Seules les distances sont à l’échelle ; la taille des planètes est indiquée dans le résultat.</p>';}
  if(type==='ciel'){controls.innerHTML=slider('Luminosité artificielle du ciel','pollution',0,100,30,' %')+'<p class="sim-caption">Les 270 étoiles restent aux mêmes places ; seul le fond du ciel change. Valeurs relatives.</p>';}
  if(type==='pixels'){controls.innerHTML=slider('Paquets perdus :','pertes',0,5,2,' sur 8')+'<p class="sim-caption">Chaque ligne de l’image (16 bits) est envoyée dans un paquet numéroté de 0 à 7.</p>';}
  if(type==='rover'){
    controls.innerHTML=slider('Seuil d’arrêt','seuil',5,40,15,' cm')+slider('Vitesse du rover','vitesse',5,40,15,' cm/s')+
      '<label class="sim-check"><input type="checkbox" id="bas"> Capteur abaissé (détecte les obstacles bas)</label>'+
      '<p class="sim-caption">Campagne simulée de 20 essais : 4 parcours × 5 essais. Le robot n’a pas d’intelligence générale : il compare une mesure à un seuil.</p>';
  }
  controls.querySelectorAll('input').forEach(x=>x.addEventListener('input',draw));
  document.getElementById('sim-reset')?.addEventListener('click',()=>{controls.querySelectorAll('input').forEach(x=>{if(x.type==='checkbox')x.checked=false;else x.value=x.defaultValue});draw()});
  draw();
}

function draw(){
  refreshLabels();
  if(type==='ombres'){
    const doy=val('jour'),h=val('heure'),H=val('tige');
    document.getElementById('jour-value').textContent=dateNom(doy);
    document.getElementById('heure-value').textContent=heureNom(h);
    const s=soleil(doy,h);
    let body=txt(20,30,'Vue de dessus (nord en haut)',16,'#14262b','start','bold')+txt(370,30,'Vue de profil, face à l’ombre',16,'#14262b','start','bold');
    const cx=170,cy=210;
    body+=`<circle cx="${cx}" cy="${cy}" r="140" fill="#eef4f2" stroke="#c8d6d4"/>`+txt(cx,62,'N',16,'#5a6c71','middle','bold')+txt(cx,366,'S',16,'#5a6c71','middle','bold')+txt(cx-158,215,'O',16,'#5a6c71','middle','bold')+txt(cx+158,215,'E',16,'#5a6c71','middle','bold');
    if(s.elev<=0.5){
      body+=`<circle cx="${cx}" cy="${cy}" r="6" fill="#294b4a"/>`+txt(560,210,'Le Soleil est couché : pas d’ombre.',18,'#c2185b','middle');
      view.innerHTML=svg(760,390,body);
      out.innerHTML=`<b>${dateNom(doy)}, ${heureNom(h)} : le Soleil est sous l’horizon.</b><p>Choisis une heure entre le lever et le coucher du Soleil.</p>`;return;
    }
    const L=H/Math.tan(s.elev*rad),k=Math.min(4,125/Math.max(L,1)),Ls=L*k,ds=(s.az+180)*rad;
    const x2=cx+Ls*Math.sin(ds),y2=cy-Ls*Math.cos(ds),sx=cx+125*Math.sin(s.az*rad),sy=cy-125*Math.cos(s.az*rad);
    body+=`<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#c2185b" stroke-width="9" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="#294b4a"/><circle cx="${sx}" cy="${sy}" r="13" fill="#ffd36f" stroke="#e7a637" stroke-width="2"/>`;
    // profil
    const g=330,px=470,hp=Math.min(150,H*4),lp=Math.min(260,hp/Math.tan(s.elev*rad));
    body+=`<path d="M370 ${g} H745" stroke="#789b98" stroke-width="3"/><rect x="${px-5}" y="${g-hp}" width="10" height="${hp}" fill="#294b4a" rx="2"/><path d="M${px} ${g} H${px+lp}" stroke="#c2185b" stroke-width="9" stroke-linecap="round"/>`;
    const ux=-Math.cos(s.elev*rad),uy=-Math.sin(s.elev*rad),ssx=px+ux*130,ssy=g-hp+uy*130;
    body+=`<line x1="${px+lp}" y1="${g}" x2="${ssx}" y2="${ssy}" stroke="#e8a235" stroke-width="2.5" stroke-dasharray="7 6"/><circle cx="${ssx}" cy="${ssy}" r="16" fill="#ffd36f" stroke="#e7a637" stroke-width="2"/>`;
    body+=txt(px+lp/2,g+28,'ombre',15,'#c2185b','middle')+txt(560,380,'Soleil non à l’échelle',13,'#5a6c71','middle');
    view.innerHTML=svg(760,390,body);
    out.innerHTML=`<b>Ombre : environ ${Math.round(L)} cm, vers le ${dirNom(s.az+180)}</b><p>${dateNom(doy)}, ${heureNom(h)} (${s.ete?'heure d’été':'heure d’hiver'}) : le Soleil est vers le ${dirNom(s.az)}, à ${Math.round(s.elev)}° au-dessus de l’horizon. L’ombre est toujours du côté opposé au Soleil ; elle raccourcit quand le Soleil monte.</p>`;
  }
  if(type==='lune'){
    const f=val('jour')/29.5;
    const canvas=document.createElement('canvas');canvas.width=760;canvas.height=390;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Aspect de la Lune et position sur son orbite');view.replaceChildren(canvas);
    const c=canvas.getContext('2d');c.fillStyle='#0c1a2a';c.fillRect(0,0,760,390);
    c.fillStyle='#fff';c.font='16px Arial';c.fillText('Vue depuis la Terre (hémisphère Nord)',20,30);c.fillText('Vue de dessus, depuis le nord',420,30);
    const cx=170,cy=205,R=120,alpha=Math.PI-2*Math.PI*f;
    for(let y=-R;y<=R;y++){for(let x=-R;x<=R;x++){const nx=x/R,ny=y/R,q=nx*nx+ny*ny;if(q>1)continue;const nz=Math.sqrt(1-q),ill=nx*Math.sin(alpha)+nz*Math.cos(alpha);const n=(Math.sin(x*.45+y*.29)+Math.cos(x*.21-y*.11))*5;const b=ill>0?172+Math.round(n):22+Math.round(n*.3);c.fillStyle=`rgb(${b},${b},${Math.min(255,b+5)})`;c.fillRect(cx+x,cy+y,1,1)}}
    c.strokeStyle='#8c9bab';c.beginPath();c.arc(cx,cy,R,0,2*Math.PI);c.stroke();
    // vue de dessus : Soleil à gauche, révolution dans le sens inverse des aiguilles d'une montre
    const sx=395,ox=590,oy=210,rr=105;
    c.fillStyle='#ffd46f';c.beginPath();c.arc(sx,oy,22,0,2*Math.PI);c.fill();c.fillStyle='#fff';c.font='13px Arial';c.fillText('Soleil',sx-18,oy+40);
    c.strokeStyle='#ffd46f';c.lineWidth=2;for(const dy of[-60,0,60]){c.beginPath();c.moveTo(sx+30,oy+dy);c.lineTo(ox-rr-28,oy+dy);c.stroke()}
    c.strokeStyle='#8ca2b6';c.setLineDash([5,6]);c.beginPath();c.arc(ox,oy,rr,0,2*Math.PI);c.stroke();c.setLineDash([]);
    c.fillStyle='#66a3d0';c.beginPath();c.arc(ox,oy,24,0,2*Math.PI);c.fill();c.fillStyle='#fff';c.fillText('Terre',ox-16,oy+5);
    const th=Math.PI-2*Math.PI*f,mx=ox+rr*Math.cos(th),my=oy+rr*Math.sin(th);
    c.fillStyle='#3d4f66';c.beginPath();c.arc(mx,my,13,0,2*Math.PI);c.fill();
    c.fillStyle='#f3ead2';c.beginPath();c.arc(mx,my,13,Math.PI/2,3*Math.PI/2);c.fill();
    c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(ox,oy,rr+22,-2.2,-1.75);c.stroke();
    const ax=ox+(rr+22)*Math.cos(-2.2),ay=oy+(rr+22)*Math.sin(-2.2);c.beginPath();c.moveTo(ax,ay);c.lineTo(ax-2,ay+12);c.lineTo(ax+9,ay+6);c.closePath();c.fillStyle='#fff';c.fill();
    c.font='12px Arial';c.fillText('sens de révolution',ox-140,oy-rr-26);
    const phases=['Nouvelle Lune','Premier croissant','Premier quartier','Gibbeuse croissante','Pleine Lune','Gibbeuse décroissante','Dernier quartier','Dernier croissant'];
    const ix=Math.round(f*8)%8;
    out.innerHTML=`<b>${phases[ix]}</b><p>Jour ${fr(val('jour'))} sur 29,5. Partie éclairée visible : environ ${Math.round((1-Math.cos(2*Math.PI*f))*50)} %. La moitié de la Lune tournée vers le Soleil est toujours éclairée ; les phases ne sont pas l’ombre de la Terre.</p>`;
  }
  if(type==='distances'){
    const e=val('echelle');
    const planets=[['Mercure',.39],['Vénus',.72],['Terre',1],['Mars',1.52],['Jupiter',5.2],['Saturne',9.58],['Uranus',19.2],['Neptune',30.05]];
    const rows=planets.map((p,i)=>txt(25,72+i*34,p[0],15)+`<rect x="130" y="${58+i*34}" width="${Math.max(2,(p[1]/30.05)*440)}" height="17" rx="3" fill="${i<4?'#0e6e6b':'#c2185b'}"/>`+txt(735,72+i*34,fr(p[1]*e,2)+' m',14,'#14262b','end')).join('');
    view.innerHTML=svg(760,370,txt(25,30,`Distance au Soleil sur le parcours — 1 UA = ${fr(e,2)} m`,18,'#14262b','start','bold')+rows+txt(25,355,'Distances moyennes au Soleil ; la longueur des barres est proportionnelle à la distance.',13,'#5a6c71'));
    const terre=e*1000*12742/149.6e6,sol=e*100*1392000/149.6e6;
    out.innerHTML=`<b>Neptune : ${fr(30.05*e,2)} m du Soleil</b><p>Mars est à ${fr(1.52*e,2)} m. À cette échelle, le Soleil mesurerait ${fr(sol)} cm de diamètre et la Terre ${fr(terre,2)} mm : c’est pourquoi on ne les dessine pas à l’échelle des distances.</p>`;
  }
  if(type==='ciel'){
    const p=val('pollution');
    const canvas=document.createElement('canvas');canvas.width=650;canvas.height=390;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Champ d’étoiles simulé');view.replaceChildren(canvas);
    const c=canvas.getContext('2d'),bg=Math.floor(3+p*1.25);c.fillStyle=`rgb(${bg},${bg+Math.floor(p*.12)},${bg+Math.floor(p*.22)+11})`;c.fillRect(0,0,650,390);
    let visible=0;
    for(let i=0;i<270;i++){const x=((i*179+41)%640)+5,y=((i*127+29)%380)+5,m=((i*71)%100)/100,b=1-p/100-m*.85;if(b>0.12){visible++;c.fillStyle=`rgba(245,247,255,${Math.min(.95,b+.15)})`;c.beginPath();c.arc(x,y,0.8+m*1.4,0,Math.PI*2);c.fill()}}
    out.innerHTML=`<b>${visible} étoiles repérables sur 270 (modèle)</b><p>Le fond éclairci masque d’abord les étoiles les plus faibles. Elles brillent toujours : c’est le contraste qui diminue.</p>`;
  }
  if(type==='pixels'){
    const lost=val('pertes'),ordre=[2,6,1,4,7],missing=ordre.slice(0,lost);
    const IMG=[[0,0,0,0,1,1,1,1],[0,0,0,1,1,1,1,1],[0,0,1,1,1,2,2,1],[0,1,1,1,2,2,2,1],[1,1,1,2,2,2,1,1],[1,1,2,2,2,1,1,0],[1,1,1,2,1,1,0,0],[1,1,1,1,1,0,0,0]];
    const col=['#5da8c8','#73b77a','#d59d75'];
    const pix=(x,y,f)=>`<rect x="${x}" y="${y}" width="31" height="31" stroke="#fff" stroke-width="2" fill="${f}" rx="2"/>`;
    let body=txt(30,34,'IMAGE ENVOYÉE',17,'#14262b','start','bold')+txt(400,34,'IMAGE REÇUE',17,'#14262b','start','bold');
    for(let r=0;r<8;r++){body+=txt(18,79+r*33,r,12,'#5a6c71','end')+txt(388,79+r*33,r,12,'#5a6c71','end');for(let k=0;k<8;k++){body+=pix(28+k*33,57+r*33,col[IMG[r][k]])+pix(398+k*33,57+r*33,missing.includes(r)?'#ccd5d6':col[IMG[r][k]])}}
    view.innerHTML=svg(760,370,body+txt(30,350,'Bleu : eau (00) · vert : végétation (01) · orange : ville (10). Chaque ligne est un paquet numéroté.',13,'#5a6c71'));
    const recus=8-lost;
    out.innerHTML=`<b>${recus}/8 paquets reçus · ${fr(recus/8*100,1).replace(',0','')} %</b><p>${lost?'Lignes manquantes : '+missing.slice().sort((a,b)=>a-b).join(', ')+'. ':''}Grâce aux numéros, la station sait quelles lignes redemander. Une ligne manquante représente 16 bits.</p>`;
  }
  if(type==='rover'){
    const seuil=val('seuil'),v=val('vitesse'),bas=document.getElementById('bas').checked;
    const bruit=[0.4,-2,1.1,-0.7,1.8,-1.4,0.2,-1.9,0.9,1.5,-0.3,2,-1.1,0.6,-1.7,1.2,-0.5,0.8,-2,1.6];
    const arret=seuil-v*0.1-v*v/160; // distance d'arrêt : seuil − parcours pendant la réaction (0,1 s) − freinage (80 cm/s²)
    const espace4=[30,32,14,30,31];
    const parcours=['Obstacles hauts espacés','Obstacle bas','Couloir étroit (25 cm)','Angle fermé'];
    let rows='',ok=0,dmin=Infinity,coll=0,bloc=0;
    for(let p=0;p<4;p++){
      let cells='';
      for(let e=0;e<5;e++){
        const i=p*5+e;let d=Math.max(0,arret+bruit[i]),res='✓',cls='ok';
        if(p===1&&!bas&&(e===1||e===3)){d=0;}
        if(p===2&&seuil>25){res='blocage';cls='ko';bloc++;}
        else if(p===3&&seuil>espace4[e]){res='blocage';cls='ko';bloc++;}
        else if(d<2){res='contact';cls='ko';coll++;d=0;}
        if(cls==='ok')ok++;
        if(res!=='blocage')dmin=Math.min(dmin,d);
        cells+=`<td class="${cls}">${res==='✓'?'✓ '+fr(d,0)+' cm':res}</td>`;
      }
      rows+=`<tr><th>${parcours[p]}</th>${cells}</tr>`;
    }
    const taux=ok/20*100,valide=taux>=80&&dmin>=10;
    view.innerHTML=`<div><div class="scroll-table"><table class="sim-table"><thead><tr><th>Parcours</th><th>Essai 1</th><th>Essai 2</th><th>Essai 3</th><th>Essai 4</th><th>Essai 5</th></tr></thead><tbody>${rows}</tbody></table></div><p class="sim-caption">✓ : réussite, avec la distance minimale à l’obstacle. Contact : collision. Blocage : le rover refuse un passage plus étroit que son seuil.</p></div>`;
    out.innerHTML=`<b>${ok}/20 réussites · ${fr(taux,0)} % · distance minimale relevée : ${fr(isFinite(dmin)?dmin:0,0)} cm${coll?' (contact)':''}</b><p>${coll} contact(s), ${bloc} blocage(s). Exigences : au moins 80 % de réussite et distance minimale d’au moins 10 cm → ${valide?'<b>rover validé</b>.':'<b>rover non validé</b>.'} Un seuil trop petit fait s’arrêter le rover trop près ; un seuil trop grand le bloque dans les passages étroits ; une vitesse élevée allonge l’arrêt.</p>`;
  }
}
setup();
})();
