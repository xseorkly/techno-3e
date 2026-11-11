/* Garde d'accès unique de l'espace formation.
   Chargée en tête de chaque page : sans code mémorisé, renvoie vers l'accueil,
   qui ramène ensuite à la page demandée. Le code est mémorisé pour le navigateur.
   Copie sans code (Magistère) : remplacer ce fichier par un fichier vide. */
(function () {
  var CLE = "formation_teachers_unlocked_v1";
  if (location.protocol === "file:") return;
  var ok = false;
  try { ok = localStorage.getItem(CLE) === "1" || sessionStorage.getItem(CLE) === "1"; } catch (e) {}
  if (ok) return;
  var moi = document.currentScript;
  var base = moi && moi.src ? moi.src.replace(/garde\.js(\?.*)?$/, "") : "../";
  document.documentElement.style.visibility = "hidden";
  location.replace(base + "index.html?retour=" + encodeURIComponent(location.pathname + location.search + location.hash));
})();
