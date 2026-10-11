/* Outils communs : sauvegarde locale, minuteurs, écran plein. */
window.PZ = (() => {
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  function store(key) {
    let st = {};
    try { st = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
    const saved = document.getElementById('saved');
    const save = () => {
      try { localStorage.setItem(key, JSON.stringify(st)); if (saved) saved.textContent = 'Enregistré à ' + new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'}); }
      catch (e) { if (saved) saved.textContent = 'Enregistrement impossible dans ce navigateur'; }
    };
    const bind = (root = document) => root.querySelectorAll('[data-f]').forEach(el => {
      el.value = st[el.dataset.f] || '';
      el.addEventListener('input', () => { st[el.dataset.f] = el.value; save(); });
    });
    const reset = () => { st = {}; try { localStorage.removeItem(key); } catch (e) {} };
    return {get st() { return st; }, save, bind, reset};
  }
  function timers() {
    document.querySelectorAll('.timer').forEach(b => {
      let left = b.dataset.min * 60, id = null;
      const fmt = () => `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
      b.textContent = '▶ ' + fmt();
      b.addEventListener('click', () => {
        if (left <= 0) { left = b.dataset.min * 60; b.classList.remove('end'); b.textContent = '▶ ' + fmt(); return; }
        if (id) { clearInterval(id); id = null; b.classList.remove('run'); b.textContent = '▶ ' + fmt(); return; }
        b.classList.add('run'); b.textContent = '❚❚ ' + fmt();
        id = setInterval(() => { left--; b.textContent = '❚❚ ' + fmt(); if (left <= 0) { clearInterval(id); id = null; b.classList.remove('run'); b.classList.add('end'); b.textContent = 'Temps écoulé'; } }, 1000);
      });
    });
  }
  function full(id, render) {
    const el = document.getElementById(id);
    const open = () => { el.querySelector('.fs').innerHTML = render(); el.classList.add('open'); el.querySelector('.fs-close').focus(); };
    el.querySelector('.fs-close').onclick = () => el.classList.remove('open');
    document.addEventListener('keydown', e => { if (e.key === 'Escape') el.classList.remove('open'); });
    return open;
  }
  const val = (st, k) => st[k] && String(st[k]).trim() ? esc(st[k]) : '<span class="empty">à compléter</span>';
  return {esc, store, timers, full, val};
})();
