/* Atelier « Du projet à la conception » — classe puzzle sur les séquences 1 à 6 du site Technologie 3e.
   Données partagées : postes, cartes, contrats, objections, et calcul de l'organisation. */
(() => {
const S = '../../';   /* racine du site élève */

const CARTES = [
  {n:1, t:'Le problème', q:'Qui formule le problème à résoudre ?'},
  {n:2, t:'Le besoin et l’utilisateur', q:'Pour qui, pour quel usage ?'},
  {n:3, t:'Les critères de réussite', q:'Qui fixe les exigences et leurs niveaux ?'},
  {n:4, t:'Les pistes de solution', q:'Qui imagine plusieurs possibilités ?'},
  {n:5, t:'Le choix', q:'Qui choisit, avec quels critères et quels poids ?'},
  {n:6, t:'Le principe et les composants', q:'Qui décide comment ça marche et avec quoi ?'},
  {n:7, t:'L’algorithme ou la procédure', q:'Qui décide de l’enchaînement des actions ?'},
  {n:8, t:'Les réglages', q:'Seuil, cotes, adresses, valeurs : qui les fixe ?'},
  {n:9, t:'Le protocole de test', q:'Qui décide de ce qu’on teste, et comment ?'},
  {n:10, t:'La preuve d’apprentissage', q:'Qu’est-ce qui montre que l’élève a compris ?'}
];
const ZONES = ['—','Imposé','Choix guidé','Décidé par l’élève','Absent'];

const SEQ = {
  1:{t:'Le smartphone', th:'Innovation & société · OST', s:[
    ['Lancement : du téléphone du grand-père au smartphone','30 min','seq1-act1.html'],
    ['Du téléphone au smartphone 1 : comprendre l’évolution','55 min','seq1-act2-p1.html'],
    ['Du téléphone au smartphone 2 : frise et smartphone 2030','55 min','seq1-act2-p2.html'],
    ['L’IA dans notre poche','1 h 30','seq1-act3.html']]},
  2:{t:'La circulation de l’information', th:'Réseaux · SFC', s:[
    ['Hub, switch, routeur et Wi-Fi','55 min','seq2-act1-p1.html'],
    ['Jeu sans ordinateur : IP, routage, débit','55 min','seq2-act1-p2.html'],
    ['Configurer un réseau avec Filius','55 min','seq2-act1-p3.html'],
    ['Lire une table et analyser le routage','55 min','seq2-act1-p4.html']]},
  3:{t:'Programmer un objet', th:'Programmation & IA', s:[
    ['La micro:bit 1 : le dé','55 min','seq3-act1-p1.html'],
    ['La micro:bit 2 : radio, algorithme, logigramme','55 min','seq3-act1-p2.html'],
    ['L’IA qui reconnaît 1 : trois caméras','55 min','seq3-act2-p1.html'],
    ['L’IA qui reconnaît 2 : entraîner sa propre IA','55 min','seq3-act2-p2.html'],
    ['L’IA qui reconnaît 3 : tester les limites','55 min','seq3-act2-p3.html'],
    ['Jouer contre la machine 1 : je conçois','55 min','seq3-act3-p1.html'],
    ['Jouer contre la machine 2 : je réalise et je teste','55 min','seq3-act3-p2.html']]},
  4:{t:'L’arrosage automatique', th:'Automatisation & données', s:[
    ['De la plante aux données','55 min','seq4-act1.html'],
    ['Calibrer le capteur','55 min','seq4-act2.html'],
    ['Je conçois le programme','55 min','seq4-act3.html'],
    ['Les opérateurs logiques','55 min','seq4-act4.html'],
    ['Enregistrer les données','55 min','seq4-act5.html'],
    ['Diagnostiquer et alerter','55 min','seq4-act6.html']]},
  5:{t:'Porte-courrier augmenté', th:'OSI · démarche de projet guidée', s:[
    ['Un objet encore utile ?','55 min','seq5-act1.html'],
    ['Avec quoi interagit-il ?','55 min','seq5-act2.html'],
    ['Pourquoi l’existant pose-t-il problème ? (Ishikawa)','55 min','seq5-act3.html'],
    ['Construire le cahier des charges','55 min','seq5-act4.html'],
    ['Imaginer et choisir une solution','55 min','seq5-act5.html'],
    ['Du croquis au modèle 3D','55 min','seq5-act6.html'],
    ['Tester, améliorer et convaincre','55 min','seq5-act7.html']]},
  6:{t:'J’invente, j’innove', th:'OSI · projet ouvert, 14 séances', s:[
    ['Créer notre startup et observer la ville','55 min','seq6-act1.html'],
    ['Persona et 5 Pourquoi','55 min','seq6-act2.html'],
    ['Transformer un besoin en défi d’innovation','55 min','seq6-act3.html'],
    ['Innovation ou déjà-vu ?','55 min','seq6-act4.html'],
    ['Organiser le projet','55 min','seq6-act5.html'],
    ['Décrire les usages avec SysML','55 min','seq6-act6.html'],
    ['Construire le cahier des charges','55 min','seq6-act7.html'],
    ['Prévoir le fonctionnement : l’algorigramme','55 min','seq6-act8.html'],
    ['Choisir les solutions techniques','55 min','seq6-act9.html'],
    ['Construire l’architecture du système','55 min','seq6-act10.html'],
    ['Programmer, tester, corriger','55 min','seq6-act11.html'],
    ['Du concept au croquis coté','55 min','seq6-act12.html'],
    ['Modéliser la solution en 3D','55 min','seq6-act13.html'],
    ['Valider et convaincre','55 min','seq6-act14.html']]}
};
const L = (seq, i) => S + SEQ[seq].s[i - 1][2];

const POSTES = {
  A:{c:'#245d8a', t:'Analyser, est-ce déjà concevoir ?', seqs:[1,2],
    enjeu:'Deux séquences d’analyse (OST, réseaux). On n’y attend pas un projet. Mais les élèves y prennent-ils une seule décision qui prépare la conception ? Et quand la conception apparaît, est-elle un vrai problème ou un exercice d’imagination ?',
    q:[
      {k:'A1', w:[2,1], t:'La partie 1 s’ouvre sur un vrai problème de conception : « quels matériels utiliser et comment les relier ? » pour équiper une salle. À quel moment de la séance l’élève décide-t-il de l’architecture de la salle ? Qu’est-ce qui décide à sa place ?', h:'Si l’élève devait proposer son schéma avant de voir les huit images, quelles erreurs plausibles produirait-il ? Lesquelles seraient précieuses pour la suite ?'},
      {k:'A2', w:[2,3], t:'Filius : 55 minutes guidées par quatre tutoriels vidéo. Que prouve un élève qui réussit ? Que prouve un élève qui échoue ? Comparez avec la partie 4 (N4c, N4d) : où l’élève raisonne-t-il le plus ?', h:'Regardez la trace demandée en fin de partie 3, puis celle de la partie 4.'},
      {k:'A3', w:[1,3], t:'Le seul moment où l’élève imagine un objet est le « smartphone du futur 2030 » (N4). Avec quelles contraintes, quels critères ? Une proposition peut-elle y être moins bonne qu’une autre ? Si ce n’est pas le cas, qu’apprend-on en la faisant ?', h:'Réécrivez la consigne N4 avec deux contraintes et un critère qui rendent certaines propositions meilleures que d’autres.'},
      {k:'A4', w:[1,2], t:'Les rubriques « Mon problème à résoudre » et « Mes idées pour le résoudre » reviennent dans presque toutes les fiches. Ce que l’élève y écrit change-t-il quelque chose à la suite de la séance ? Que devrait faire l’enseignant dans les dix minutes suivantes pour que cela compte ?', h:'Comparez, dans la partie 1 de l’activité 2, la question formulée par l’élève et les activités N1 à N2 qui suivent.'},
      {k:'A5', w:[1,4], t:'« L’IA dans notre poche » : les quatre essais sont conçus par l’enseignant et réalisés sur son poste. Concevoir un essai qui prouve quelque chose, c’est déjà concevoir un protocole. Faudrait-il laisser la classe concevoir un cinquième essai ? Qu’est-ce que cela coûterait ?', h:'Pensez au temps, au cadre éthique (rien d’identifiant ne doit être saisi) et à ce que la classe devrait comprendre pour inventer un essai utile.'},
      {k:'A6', w:[1,3], t:'Les menus déroulants (frise N3, identification des matériels, liaisons) rendent la correction rapide et l’autonomie possible. Qu’enlèvent-ils ? Choisissez un menu que vous garderiez, un que vous supprimeriez, et justifiez.', h:'Un menu déroulant transforme une production en reconnaissance : quand est-ce acceptable ?'}
    ]},
  B:{c:'#9a6900', t:'Programmer, est-ce concevoir ?', seqs:[3,4],
    enjeu:'Deux séquences où l’on programme beaucoup. Les fiches annoncent souvent « tu conçois, puis tu programmes ». Où l’élève décide-t-il vraiment de l’algorithme, du réglage, du test ? Et où la décision lui est-elle demandée… puis reprise ?',
    q:[
      {k:'B1', w:[3,2], t:'Les élèves écrivent l’algorithme en français (12 min), puis le logigramme (13 min). Ensuite, sept étapes numérotées construisent le programme. Comparez les étapes 1 à 7 à ce qu’un élève aurait pu écrire : que reste-t-il à décider ? Que mesure alors la synthèse « À quoi sert d’écrire l’algorithme avant de programmer ? »', h:'Que se passe-t-il pour l’élève dont l’algorithme était différent des étapes, mais juste ?'},
      {k:'B2', w:[3,6], t:'« Cette séance ne sert pas à programmer. Elle sert à concevoir. » Listez les décisions réellement laissées à l’élève. Le tri de la boîte à outils (indispensable, peut servir, inutile) est-il une décision ou une reconnaissance ? Qu’est-ce qui rend cette séance différente de l’activité 1, partie 2 ?', h:'Regardez aussi les trois coups de pouce : que donnent-ils, que gardent-ils ?'},
      {k:'B3', w:[4,3], t:'Le seuil de 50 % est « choisi pour le prototype ». Puis on demande : « Quel seuil choisirais-tu pour le potager ? » Que devient cette réponse ensuite ? Proposez une version où le seuil découle des mesures de la séance 2. Qu’est-ce que cela coûte ?', h:'Pensez aux groupes qui n’auront pas le même seuil, à la correction, et à ce qu’il se passe quand l’indice oscille autour du seuil.'},
      {k:'B4', w:[4,6], t:'Les élèves formulent trois hypothèses et un protocole pour trancher. Puis le document annonce : « La cause la plus probable est un réservoir vide » et donne l’algorithme. À quel moment le diagnostic cesse-t-il d’appartenir à l’élève ? Que faudrait-il pour que leur protocole décide ?', h:'Matériel, temps, données : de quoi aurait-on besoin pour tester réellement deux hypothèses ?'},
      {k:'B5', w:[4,2], t:'Ouvrez la séance 2 et regardez la zone de réponse de la question N3 (« Construire l’indice relatif ») avant d’y écrire. Que remarquez-vous ? Qu’est-ce que cela change pour la compétence visée au niveau N3 ?', h:'Lisez aussi la consigne de la partie « Je modifie le programme ».'},
      {k:'B6', w:[3,6], t:'Les deux séquences proposent des « coups de pouce — à n’ouvrir qu’en cas de blocage ». Qui décide qu’il y a blocage ? Que perd l’élève qui l’ouvre à la deuxième minute, et comment l’enseignant le saurait-il ? Proposez une règle d’usage.', h:'Comparez le coup de pouce de la séquence 3 (trois indices gradués) et celui de la séquence 4, séance 3 (les briques mélangées).'}
    ]},
  C:{c:'#c2185b', t:'La démarche de projet : guidée ou ouverte ?', seqs:[5,6],
    enjeu:'Deux projets OSI. L’un est guidé, sept séances, un même problème pour tous. L’autre est ouvert, quatorze séances, un problème par équipe. Les outils de la démarche sont tous là. Servent-ils à prendre des décisions, ou à remplir des cases dans le bon ordre ?',
    q:[
      {k:'C1', w:[5,7], t:'La séance 7 demande de « tester le prototype » sur huit exigences. Quel prototype existe à ce moment-là (la séance 6 produit un modèle Tinkercad) ? Lesquelles des huit exigences peut-on vraiment vérifier sur un modèle 3D ? Lesquelles demandent un objet réel ?', h:'Classez les huit exigences : vérifiable sur le modèle, estimable, impossible sans objet.'},
      {k:'C2', w:[5,5], t:'Dans la matrice de décision, les poids sont imposés (ergonomie ×3, stabilité ×3… esthétique ×1). Qui décide de ce qui compte le plus pour l’utilisateur ? Que se passerait-il si chaque équipe fixait ses poids à partir du besoin ? Que perdrait l’enseignant ?', h:'Une matrice dont les poids sont donnés peut-elle conduire deux équipes à des choix différents pour de bonnes raisons ?'},
      {k:'C3', w:[5,4], t:'Le cahier des charges propose « Afficher des valeurs possibles » (≤ 30 × 15 cm, ≥ 10 enveloppes, ≤ 8 €…). Le cahier des charges est-il construit ou recopié ? D’où les élèves pourraient-ils tirer eux-mêmes un niveau comme « 10 enveloppes » ? Combien de temps cela coûterait-il ?', h:'Mesurer un vrai bureau, interroger un utilisateur, peser un courrier : laquelle de ces sources est réaliste en 55 min ?'},
      {k:'C4', w:[6,7], t:'Dans la séquence 6, repérez la séance où le concept est choisi, celle où le cahier des charges est écrit, celle où les composants sont choisis, celle où l’on programme et celle où l’objet est dessiné. Que produit cet ordre ? Proposez un réordonnancement sans ajouter de séance.', h:'Un cahier des charges écrit après le choix du concept sert-il à choisir, ou à justifier ?'},
      {k:'C5', w:[6,1], t:'La mission de la séance 1 demande « une solution intégrant intelligemment le numérique ou l’IA ». La séance 2 avertit : « si votre phrase contient déjà IA, vous décrivez une solution ». Contradiction, ou contrainte du concours ? Comment l’expliquer aux élèves sans fermer la recherche ?', h:'Relisez aussi la question finale de la séance 3 : « Une IA est pertinente dans un projet lorsque… ».'},
      {k:'C6', w:[5,1], t:'Séquence 5 : sept séances, un même problème, des outils guidés. Séquence 6 : quatorze séances, chaque équipe son problème. Dans laquelle les élèves décident-ils le plus ? Dans laquelle apprennent-ils le plus de savoirs communs ? Dans laquelle l’enseignant doit-il en savoir le plus ?', h:'Où placeriez-vous le curseur pour une classe de 3e ordinaire, et pourquoi ?'}
    ]}
};

const CONTRATS = [
  {k:'K1', seq:4, ou:'Séquence 4 · séances 2 et 3', lien:[4,3],
    a:{t:'Le seuil devient une décision des élèves', d:'Chaque groupe fixe son seuil à partir de ses propres mesures de la séance 2, et doit le justifier.', cartes:'8'},
    b:{t:'Le seuil reste imposé, le test se libère', d:'Le seuil de 50 % reste imposé. Ce sont les élèves qui conçoivent les essais qui prouvent que le programme arrose quand il faut, et seulement quand il faut.', cartes:'9'}},
  {k:'K2', seq:2, ou:'Séquence 2 · parties 1 et 3', lien:[2,1],
    a:{t:'Les élèves conçoivent le réseau de la salle', d:'Avant toute identification de matériel, chaque groupe propose l’architecture de la salle (postes, imprimante, tablettes, accès Internet), puis la confronte au matériel réel.', cartes:'6'},
    b:{t:'L’architecture reste donnée, le test se libère', d:'Le schéma reste fourni. Dans Filius, les élèves conçoivent eux-mêmes les essais qui prouvent que chaque poste joint bien ce qu’il doit joindre.', cartes:'9'}},
  {k:'K3', seq:5, ou:'Séquence 5 · séances 5 à 7', lien:[5,5],
    a:{t:'Chaque équipe fixe les poids de sa matrice', d:'Les poids ne sont plus donnés : chaque équipe les fixe à partir du besoin et du cahier des charges, et doit les défendre.', cartes:'5'},
    b:{t:'La matrice reste imposée, le test devient réel', d:'La séance 7 doit tester un vrai prototype, pas un modèle 3D. Lequel, fabriqué quand, avec quel temps récupéré ?', cartes:'9'}},
  {k:'K4', seq:3, ou:'Séquence 3 · activité 1, partie 2', lien:[3,2],
    a:{t:'Le programme naît du logigramme de l’élève', d:'Les sept étapes numérotées disparaissent. Le programme se construit à partir du logigramme que l’élève vient d’écrire.', cartes:'7'},
    b:{t:'Les étapes restent, le test se libère', d:'Les sept étapes restent. Les élèves conçoivent les parties de test qui prouvent que le jeu donne toujours le bon gagnant.', cartes:'9'}},
  {k:'K5', seq:6, ou:'Séquence 6 · ordre des 14 séances', lien:[6,7],
    a:{t:'Le cahier des charges avant le concept', d:'Réordonnez les séances pour que le cahier des charges serve à choisir le concept, et non à le justifier après coup.', cartes:'3 et 5'},
    b:{t:'L’ordre reste, une vraie itération apparaît', d:'L’ordre reste. Ajoutez une boucle prototype → test → modification qui change réellement la solution, sans ajouter de séance.', cartes:'9'}},
  {k:'K6', seq:1, ou:'Séquence 1 · activité 2, partie 2', lien:[1,3],
    a:{t:'Le smartphone 2030 devient un vrai problème', d:'La consigne N4 reçoit des contraintes et des critères : certaines propositions doivent pouvoir être meilleures que d’autres.', cartes:'3 et 5'},
    b:{t:'On assume une séquence d’analyse', d:'N4 disparaît. Le temps récupéré rend la frise (N3) vraiment analytique : l’élève choisit et justifie ses ruptures, sans menus déroulants.', cartes:'aucune : la décision rendue est l’analyse'}}
];

const OBJECTIONS = [
  'Si chaque groupe a son propre seuil, je ne peux plus corriger vingt-huit programmes différents.',
  'Sans les étapes numérotées, la moitié de la classe n’aura rien qui fonctionne à la fin de l’heure.',
  'Les menus déroulants, c’est ce qui permet à mes élèves fragiles d’avancer seuls.',
  'Fabriquer un vrai prototype ? Je n’ai ni le temps ni l’imprimante 3D pour huit équipes.',
  'Au concours, le jury regarde surtout le dossier et le pitch.',
  'Si on laisse le diagnostic ouvert, ils vont tester des hypothèses absurdes pendant une heure.',
  'Le programme est déjà chargé : je n’ai pas le temps d’ouvrir des décisions partout.',
  'Ouvrir, c’est bien pour les bons élèves. Les autres attendent la correction.'
];

const ETAPES = [
  {id:'lancement', n:1, t:'Lancement', min:5, lieu:'Table de base', c:'#0e6e6b'},
  {id:'experts', n:2, t:'Experts', min:25, lieu:'Poste d’experts', c:'#245d8a'},
  {id:'retour', n:3, t:'Retour', min:25, lieu:'Table de base', c:'#9a6900'},
  {id:'confrontation', n:4, t:'Confrontation', min:15, lieu:'Table du groupe partenaire', c:'#c2185b'},
  {id:'bilan', n:5, t:'Bilan', min:20, lieu:'Plénière', c:'#0a5a58'}
];

/* ---------- Organisation de la classe puzzle ---------- */
const K = 'pc3_orga';
const read = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const orga = () => read(K, {n: 22, noms: ''});
const setOrga = o => write(K, o);
const P3 = ['A','B','C'];

function plan(o = orga()) {
  const liste = (o.noms || '').split(/\n|;/).map(s => s.trim()).filter(Boolean);
  const N = liste.length >= 6 ? liste.length : Math.max(6, Math.min(40, parseInt(o.n) || 22));
  const noms = liste.length >= 6 ? liste : Array.from({length: N}, (_, i) => `Participant ${i + 1}`);
  const G = Math.floor(N / 3), extra = N - 3 * G;
  const groupes = []; let idx = 0;
  for (let g = 0; g < G; g++) { const size = 3 + (g < extra ? 1 : 0); const m = []; for (let j = 0; j < size; j++) m.push({nom: noms[idx++]}); groupes.push(m); }
  const cnt = {A: 0, B: 0, C: 0};
  groupes.forEach(m => m.slice(0, 3).forEach((p, j) => { p.poste = P3[j]; cnt[P3[j]]++; }));
  groupes.forEach(m => m.slice(3).forEach(p => { const best = ['C','B','A'].reduce((a, b) => cnt[b] < cnt[a] ? b : a); p.poste = best; cnt[best]++; }));
  /* tables d'experts : 5 personnes au plus par table */
  const postes = {}; let tno = 0;
  P3.forEach(P => { const n = cnt[P], t = Math.max(1, Math.ceil(n / 5)); postes[P] = []; for (let i = 0; i < t; i++) postes[P].push({table: ++tno, membres: []}); });
  P3.forEach(P => { let r = 0; groupes.forEach((m, g) => m.forEach(p => { if (p.poste === P) { const tb = postes[P][r % postes[P].length]; tb.membres.push(p.nom); p.tableExpert = tb.table; r++; } })); });
  /* contrats et confrontations */
  const infos = groupes.map((m, g) => ({g: g + 1, membres: m, contrat: Math.floor(g / 2) % CONTRATS.length, variante: g % 2 ? 'b' : 'a'}));
  infos.forEach((x, i) => {
    if (i % 2 === 0 && i + 1 < G) { x.hote = true; x.avec = [i + 2]; infos[i + 1].hote = false; infos[i + 1].va = i + 1; infos[i + 1].avec = [i + 1]; }
  });
  if (G % 2 === 1) { const last = infos[G - 1]; if (G >= 3) { const h = infos[G - 3]; last.contrat = h.contrat; last.variante = 'a'; last.hote = false; last.va = h.g; last.avec = [h.g, infos[G - 2].g]; h.avec.push(last.g); infos[G - 2].avec.push(last.g); } else { last.hote = true; last.avec = []; } }
  return {N, G, noms, groupes: infos, postes, cnt, tablesExperts: tno};
}
function route(p, nom) {
  for (const x of p.groupes) { const m = x.membres.find(y => y.nom === nom); if (m) return {groupe: x, moi: m}; }
  return null;
}
/* lien de partage : #o=<base64url du JSON> */
const enc = o => btoa(unescape(encodeURIComponent(JSON.stringify({n: o.n, noms: o.noms || ''})))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const dec = s => { try { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch (e) { return null; } };

window.PC = {S, CARTES, ZONES, SEQ, L, POSTES, CONTRATS, OBJECTIONS, ETAPES, orga, setOrga, plan, route, enc, dec, read, write};
})();
