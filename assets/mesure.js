/* Mesure d'audience anonyme (Umami, sans cookies).
   Compte les actions importantes des fiches : aucun texte saisi par l'élève
   n'est jamais envoyé, seulement le nom de l'action et des libellés fixes. */
(function(){
  "use strict";
  function suivre(nom, donnees){
    try{ if(window.umami && typeof window.umami.track === "function") window.umami.track(nom, donnees); }catch(e){}
  }
  function texte(el){ return el ? String(el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80) : ""; }

  /* ---------- clics sur les boutons importants ---------- */
  document.addEventListener("click", function(e){
    var t = e.target;
    if(!t || !t.closest) return;
    var b;
    if((b = t.closest("#pdf")))                 return suivre("pdf-fiche");
    if((b = t.closest("#effacer")))             return suivre("effacer-reponses");
    if((b = t.closest(".vlire"))){
      var v = b.closest(".video");
      return suivre("video-lancee", { titre: texte(v && v.querySelector(".vt")) });
    }
    if((b = t.closest(".niveau[data-nolej]")))  return suivre("nolej-activite", { titre: b.getAttribute("data-titre") || "" });
    if((b = t.closest(".niveau[data-chapitre]"))) return suivre("livre-chapitre", { titre: b.getAttribute("data-titre") || "" });
    if((b = t.closest("[data-pp-verifier]")))   return suivre("prepa-verifier", { exercice: (b.getAttribute("data-pp-verifier") || "").replace("pp-e", "") });
    if((b = t.closest("#pp-pdf")))              return suivre("prepa-pdf-correction");
    if((b = t.closest("#eval-pdf")))            return suivre("evaluation-pdf");
    if((b = t.closest("form #bouton")))         return suivre("depot-envoi");
  }, true);

  /* ---------- menu « Aller à » ---------- */
  document.addEventListener("change", function(e){
    if(e.target && e.target.id === "navfiches" && e.target.value) suivre("aller-a", { cible: e.target.value });
  });

  /* ---------- correction, évaluation, volet d'entraînement réellement ouverts ---------- */
  function quandVisible(id, nom){
    var el = document.getElementById(id);
    if(!el || !window.MutationObserver) return;
    var fait = false;
    new MutationObserver(function(){
      if(!fait && !el.hidden){ fait = true; suivre(nom); }
    }).observe(el, { attributes: true, attributeFilter: ["hidden"] });
  }
  function demarrer(){
    quandVisible("corr-contenu", "correction-ouverte");
    quandVisible("eval-contenu", "evaluation-ouverte");
    var volet = document.getElementById("pp-volet");
    if(volet) volet.addEventListener("toggle", function(){ if(volet.open) suivre("prepa-ouverte"); });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
