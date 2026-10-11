/* Tables fixes : chaque table garde son atelier pendant les 3 tours.
   Le « gardien » (1re personne de la table) ne bouge jamais.
   Avant le tour 2, la 2e personne de chaque table change de table ; avant le tour 3, c'est la 3e.
   Les décalages sont choisis pour que personne ne retombe sur l'atelier qu'il vient de quitter. */
window.ROT = (() => {
  const K_ORGA = 'ad_v3_orga';
  const read = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const orga = () => read(K_ORGA, {nb: 6, noms: ''});
  const setOrga = o => write(K_ORGA, o);
  const atelierDe = (k) => (k - 1) % 3;                       // table k → atelier 0, 1 ou 2
  const valide = (T, s) => { for (let k = 1; k <= T; k++) { const d = ((k - 1 + s) % T) + 1; if (atelierDe(d) === atelierDe(k)) return false; } return true; };
  function decalages(T) {
    const ok = []; for (let s = 1; s < T; s++) if (valide(T, s)) ok.push(s);
    const s2 = ok[0] || 1; const s3 = ok.find(s => s !== s2) || s2;
    return [s2, s3];
  }
  const dest = (k, s, T) => ((k - 1 + s) % T) + 1;
  function plan(o = orga()) {
    const T = Math.max(3, Math.min(8, parseInt(o.nb) || 6));
    const liste = (o.noms || '').split(/\n|;/).map(s => s.trim()).filter(Boolean);
    const tables = Array.from({length: T}, () => []);
    if (liste.length) liste.forEach((n, i) => tables[i % T].push(n));
    else for (let k = 0; k < T; k++) tables[k] = [1, 2, 3].map(p => `Table ${k + 1} · n°${p}`);
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
    return {T, tables, tours: [tour1, tour2, tour3], moves: [[], moves2, moves3]};
  }
  const reponses = k => read('ad_v3_t' + k, {});
  const setReponses = (k, st) => write('ad_v3_t' + k, st);
  return {orga, setOrga, atelierDe, plan, reponses, setReponses};
})();
