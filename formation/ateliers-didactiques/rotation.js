/* Rotation des groupes : 3 ateliers de 20 min, puis le bilan.
   Le groupe n fait les ateliers dans l'ordre décalé de (n-1) : G1 = 1,2,3 · G2 = 2,3,1 · G3 = 3,1,2 · G4 = 1,2,3… */
window.ROT = (() => {
  const K_GROUPE = 'ad_v2_groupe', K_ORGA = 'ad_v2_orga';
  const read = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const ordre = g => [0, 1, 2].map(t => (g - 1 + t) % 3);           // indices d'ateliers pour les tours 1, 2, 3
  const tourDe = (g, a) => ordre(g).indexOf(a) + 1;                   // tour (1-3) où le groupe g fait l'atelier a
  const groupe = () => { const g = parseInt(read(K_GROUPE, 0)); return g > 0 ? g : 0; };
  const setGroupe = g => write(K_GROUPE, g);
  const orga = () => read(K_ORGA, {noms: '', nb: 0});
  const setOrga = o => write(K_ORGA, o);
  const noms = o => (o.noms || '').split(/\n|,|;/).map(s => s.trim()).filter(Boolean);
  const nbConseille = n => Math.max(2, Math.min(6, Math.ceil(n / 4)));
  function repartition(o) {
    const liste = noms(o); const nb = o.nb || nbConseille(liste.length || 12);
    const groupes = Array.from({length: nb}, () => []);
    liste.forEach((nom, i) => groupes[i % nb].push(nom));
    return {nb, groupes};
  }
  const membresConnus = g => { const r = repartition(orga()); return (r.groupes[g - 1] || []).join(', '); };
  const reponses = g => read('ad_v2_g' + g, {});
  const setReponses = (g, st) => write('ad_v2_g' + g, st);
  const TOURS = [{t: 1, debut: 5}, {t: 2, debut: 25}, {t: 3, debut: 45}];
  return {ordre, tourDe, groupe, setGroupe, orga, setOrga, noms, nbConseille, repartition, membresConnus, reponses, setReponses, TOURS};
})();
