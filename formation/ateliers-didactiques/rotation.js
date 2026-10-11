/* Tables fixes : chaque table garde son atelier pendant les 3 tours.
   Le « gardien » (1re personne de la table) ne bouge jamais.
   Avant le tour 2, la 2e personne de chaque table change de table ; avant le tour 3, c'est la 3e.
   Les décalages sont choisis pour que personne ne retombe sur l'atelier qu'il vient de quitter. */
window.ROT = (() => {
  /* Nombre de tables : participants / 4, arrondi (au moins 3). Les tables font 3 à 5 personnes. */
  const K_ORGA = 'ad_v3_orga';
  const read = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const orga = () => read(K_ORGA, {n: 20, noms: '', nb: 0});
  const setOrga = o => write(K_ORGA, o);
  const atelierDe = (k) => (k - 1) % 3;                       // table k → atelier 0, 1 ou 2
  const valide = (T, s) => { for (let k = 1; k <= T; k++) { const d = ((k - 1 + s) % T) + 1; if (atelierDe(d) === atelierDe(k)) return false; } return true; };
  function decalages(T) {
    const ok = []; for (let s = 1; s < T; s++) if (valide(T, s)) ok.push(s);
    const s2 = ok[0] || 1; const s3 = ok.find(s => s !== s2) || s2;
    return [s2, s3];
  }
  const dest = (k, s, T) => ((k - 1 + s) % T) + 1;
  const nbTablesAuto = N => Math.max(3, Math.round(N / 4));     // groupes de 4 : parfois 3 ou 5
  function plan(o = orga()) {
    const liste = (o.noms || '').split(/\n|;/).map(s => s.trim()).filter(Boolean);
    const N = liste.length || Math.max(6, Math.min(40, parseInt(o.n) || 20));
    const T = Math.max(3, Math.min(10, parseInt(o.nb) || nbTablesAuto(N)));
    const base = Math.floor(N / T), rem = N % T;
    const tables = []; let idx = 0;
    for (let k = 0; k < T; k++) { const size = base + (k < rem ? 1 : 0); const m = []; for (let j = 0; j < size; j++) { m.push(liste[idx] || `Participant ${idx + 1}`); idx++; } tables.push(m); }
  const [s2, s3] = decalages(T);
    const tour1 = tables.map(m => m.slice());
    const tour2 = tour1.map(m => m.slice()); const moves2 = [];
    tables.forEach((m, i) => { if (m[1]) { const d = dest(i + 1, s2, T); moves2.push({nom: m[1], de: i + 1, vers: d}); } });
    moves2.forEach(mv => { tour2[mv.de - 1] = tour2[mv.de - 1].filter(n => n !== mv.nom); });
    moves2.forEach(mv => tour2[mv.vers - 1].push(mv.nom));
    const tour3 = tour2.map(m => m.slice()); const moves3 = [];
    tables.forEach((m, i) => { if (m[2]) { const d = dest(i + 1, s3, T); moves3.push({nom: m[2], de: i + 1, vers: d}); } });
    moves3.forEach(mv => { tour3[mv.de - 1] = tour3[mv.de - 1].filter(n => n !== mv.nom); });
    moves3.forEach(mv => tour3[mv.vers - 1].push(mv.nom));
    return {N, T, auto: !parseInt(o.nb), tables, tours: [tour1, tour2, tour3], moves: [[], moves2, moves3]};
  }
  const reponses = k => read('ad_v3_t' + k, {});
  const setReponses = (k, st) => write('ad_v3_t' + k, st);
  return {orga, setOrga, atelierDe, plan, nbTablesAuto, reponses, setReponses};
})();
