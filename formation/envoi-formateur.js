/* Envoi des réponses des stagiaires vers le Drive du formateur.
   Réutilise le service Apps Script du dépôt (action "depot", répertoire "Formation").
   Inclusion :  <script defer src="../envoi-formateur.js" data-activite="FORMATION — Nom de l'atelier"></script>
   Options   :  data-source="#fiche-out"  → envoie le texte de cet élément (fiches récapitulatives)
                data-envoi="non" sur un champ → champ ignoré                                   */
(function () {
  "use strict";
  var URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwuJgRQ6J8b9-SYjbfhggTTjvK2y3r7uCngFUIphvgvEadESWg7cKuWzUhEvklsDDI1lw/exec";
  var CLE_ID = "envoi-formateur-identite";
  var CODE_DEPOT = "ZESE2027"; /* code unique de la formation, distinct des travaux de 3e6 */
  var me = document.currentScript;
  var ACTIVITE = (me && me.getAttribute("data-activite")) || ("FORMATION — " + document.title);
  var SOURCE = me && me.getAttribute("data-source");
  var CLE_ENVOI = "envoi-formateur-fait:" + location.pathname + location.search;

  function lire(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function ecrire(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function propre(s) { return String(s || "").replace(/\s+/g, " ").trim(); }

  /* ---------- Repérer l'intitulé d'un champ ---------- */
  function texteSans(el) {
    var c = el.cloneNode(true);
    [].forEach.call(c.querySelectorAll("textarea,input,select,button,small.hint,script,style"), function (x) { x.remove(); });
    return propre(c.textContent);
  }
  function intitule(el) {
    if (el.getAttribute("aria-label")) return propre(el.getAttribute("aria-label"));
    if (el.id) { var l = document.querySelector('label[for="' + el.id + '"]'); if (l) return texteSans(l); }
    var lab = el.closest("label");
    if (lab) { var t = texteSans(lab); if (t) return t; }
    var td = el.closest("td");
    if (td) {
      var tr = td.parentElement, row = tr && tr.cells[0] && tr.cells[0] !== td ? texteSans(tr.cells[0]) : "";
      var table = td.closest("table"), col = "";
      if (table) { var th = table.querySelectorAll("thead th, tr:first-child th")[td.cellIndex]; if (th) col = propre(th.textContent); }
      var r = [row, col].filter(Boolean).join(" — "); if (r) return r;
    }
    var bloc = el.closest(".question,.f,.fld,.wide,.lensq,.field,.champ");
    if (bloc) { var s = bloc.querySelector("strong,b,.lab,h3,h4,span"); if (s && propre(s.textContent)) return propre(s.textContent); }
    var p = el.previousElementSibling, n = 0;
    while (p && n < 4) { if (!p.matches("textarea,input,select,br") && propre(p.textContent)) return propre(p.textContent).slice(0, 200); p = p.previousElementSibling; n++; }
    return propre(el.getAttribute("placeholder") || el.getAttribute("data-k") || el.getAttribute("data-f") || el.getAttribute("data-save") || el.name || el.id || "Réponse");
  }
  function titreSection(el) {
    var all = document.querySelectorAll("main h2, main h3, body > h2");
    var best = "";
    [].forEach.call(all, function (h) { if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !h.closest(".envoi-formateur")) best = propre(h.textContent); });
    return best;
  }

  /* ---------- Collecter les réponses ---------- */
  function collecter() {
    if (SOURCE) {
      var src = document.querySelector(SOURCE);
      return src ? src.innerText.trim() : "";
    }
    var racine = document.querySelector("main") || document.body, lignes = [], vus = {}, sectionCourante = null;
    var champs = racine.querySelectorAll("textarea, input, select");
    [].forEach.call(champs, function (el) {
      if (el.closest(".envoi-formateur, nav, [data-envoi='non']") || el.getAttribute("data-envoi") === "non") return;
      if (el.readOnly || el.disabled) return;
      var type = (el.type || "").toLowerCase();
      if (/^(hidden|password|search|file|submit|button|reset|image)$/.test(type)) return;
      var valeur = "";
      if (type === "radio") {
        if (vus["r:" + el.name]) return; vus["r:" + el.name] = 1;
        var coche = racine.querySelector('input[type=radio][name="' + (window.CSS && CSS.escape ? CSS.escape(el.name) : el.name) + '"]:checked');
        if (!coche) return;
        valeur = intitule(coche);
        var q = el.closest(".question,.f,.fld,fieldset");
        var nom = q ? propre((q.querySelector("strong,legend,b,.lab") || {}).textContent || el.name) : el.name;
        ajouter(el, nom, valeur); return;
      }
      if (type === "checkbox") { if (!el.checked) return; ajouter(el, intitule(el), "☑ coché"); return; }
      if (el.tagName === "SELECT") { if (!el.value) return; valeur = el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : el.value; }
      else valeur = (el.value || "").trim();
      if (!valeur) return;
      ajouter(el, intitule(el), valeur);
    });
    function ajouter(el, question, reponse) {
      var sec = titreSection(el);
      if (sec && sec !== sectionCourante) { lignes.push("\n## " + sec); sectionCourante = sec; }
      lignes.push("\n### " + question + "\n" + reponse);
    }
    return lignes.join("\n").trim();
  }

  /* ---------- Envoi ---------- */
  function base64Utf8(s) {
    var bytes = new TextEncoder().encode(s), bin = "";
    for (var i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function slug(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  }

  function construirePanneau() {
    var css = document.createElement("style");
    css.textContent =
      ".envoi-formateur{margin:34px 0 10px;background:#fff;border:1px solid #bcd4d2;border-left:5px solid #0E6E6B;border-radius:14px;padding:20px 22px;font-size:16px;color:#14262B}" +
      ".envoi-formateur h2{margin:0 0 6px;font-size:19px;color:#0E6E6B}.envoi-formateur p{margin:0 0 12px;color:#5A6C71;font-size:14.5px}" +
      ".envoi-formateur .ef-grille{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin-bottom:10px}" +
      ".envoi-formateur label{display:block;font-size:13px;color:#5A6C71}.envoi-formateur input{width:100%;box-sizing:border-box;font:inherit;font-size:15px;padding:9px 10px;border:1px solid #D2DEDE;border-radius:8px;margin-top:3px;background:#fff;color:#14262B}" +
      ".envoi-formateur details{margin:4px 0 12px;font-size:14.5px}.envoi-formateur summary{cursor:pointer;color:#0E6E6B}" +
      ".envoi-formateur .ef-btns{display:flex;gap:10px;flex-wrap:wrap}.envoi-formateur button{font:inherit;font-weight:600;border-radius:9px;padding:11px 18px;cursor:pointer;border:1px solid #0E6E6B}" +
      ".envoi-formateur .ef-go{background:#0E6E6B;color:#fff}.envoi-formateur .ef-go:disabled{background:#9fb6b5;border-color:#9fb6b5}.envoi-formateur .ef-voir{background:#fff;color:#0E6E6B}" +
      ".envoi-formateur pre{white-space:pre-wrap;background:#F4F7F7;border-radius:8px;padding:12px;max-height:260px;overflow:auto;font-size:13.5px}" +
      ".envoi-formateur .ef-msg{margin-top:12px;font-size:15px}.envoi-formateur .ef-ok{color:#0b5a58}.envoi-formateur .ef-ko{color:#8e1244}" +
      "@media(max-width:640px){.envoi-formateur .ef-grille{grid-template-columns:1fr}}@media print{.envoi-formateur{display:none}}";
    document.head.appendChild(css);

    var id = lire(CLE_ID) || {}, fait = lire(CLE_ENVOI);
    var box = document.createElement("section");
    box.className = "envoi-formateur noprint";
    box.setAttribute("aria-label", "Envoyer mes réponses au formateur");
    box.innerHTML =
      "<h2>📤 Envoyer nos réponses au formateur</h2>" +
      "<p>Les réponses saisies sur cette page sont transmises au formateur pour préparer la synthèse collective de la formation. Un seul envoi par groupe suffit ; vous pouvez renvoyer une version mise à jour.</p>" +
      "<div class='ef-grille'>" +
      "<label>Nom<input id='ef-nom1' autocomplete='family-name'></label><label>Prénom<input id='ef-prenom1' autocomplete='given-name'></label>" +
      "</div>" +
      "<details><summary>Ajouter les autres membres du groupe</summary><div class='ef-grille' style='margin-top:8px'>" +
      "<label>Nom 2<input id='ef-nom2'></label><label>Prénom 2<input id='ef-prenom2'></label>" +
      "<label>Nom 3<input id='ef-nom3'></label><label>Prénom 3<input id='ef-prenom3'></label>" +
      "</div></details>" +
      "<label style='margin-bottom:12px'>Établissement / groupe <span>(facultatif)</span><input id='ef-groupe'></label>" +
      "<div class='ef-btns'><button type='button' class='ef-voir'>Voir ce qui sera envoyé</button><button type='button' class='ef-go'>Envoyer au formateur</button></div>" +
      "<pre hidden></pre><div class='ef-msg' role='status' aria-live='polite'></div>";

    ["nom1", "prenom1", "nom2", "prenom2", "nom3", "prenom3", "groupe"].forEach(function (k) {
      var inp = box.querySelector("#ef-" + k); inp.setAttribute("data-envoi", "non"); if (id[k]) inp.value = id[k];
      inp.addEventListener("input", function () { id[k] = inp.value; ecrire(CLE_ID, id); });
    });
    if (id.nom2 || id.nom3) box.querySelector("details").open = true;

    var msg = box.querySelector(".ef-msg"), pre = box.querySelector("pre"), go = box.querySelector(".ef-go");
    function info(t, k) { msg.textContent = t; msg.className = "ef-msg " + (k || ""); }
    if (fait) info("Déjà envoyé le " + fait + ". Vous pouvez renvoyer une version mise à jour.", "ef-ok");

    function membres() {
      var arr = [];
      for (var i = 1; i <= 3; i++) {
        var n = propre(box.querySelector("#ef-nom" + i).value), p = propre(box.querySelector("#ef-prenom" + i).value);
        if (n || p) { if (!n || !p) throw Error("Membre " + i + " : nom et prénom à compléter."); arr.push({ nom: n, prenom: p }); }
      }
      if (!arr.length) throw Error("Indiquez au moins un nom et un prénom.");
      return arr;
    }
    function document_(m) {
      var maintenant = new Date();
      return "# " + ACTIVITE + "\n\n" +
        "- Page : " + document.title + "\n- Adresse : " + location.href.split("#")[0] + "\n" +
        "- Participants : " + m.map(function (x) { return x.prenom + " " + x.nom; }).join(", ") + "\n" +
        (propre(box.querySelector("#ef-groupe").value) ? "- Groupe / établissement : " + propre(box.querySelector("#ef-groupe").value) + "\n" : "") +
        "- Envoyé le : " + maintenant.toLocaleString("fr-FR") + "\n\n---\n\n" + collecter() + "\n";
    }

    box.querySelector(".ef-voir").addEventListener("click", function () {
      var t = collecter(); pre.hidden = false; pre.textContent = t || "(aucune réponse saisie pour l’instant)";
    });
    go.addEventListener("click", async function () {
      var m, code, corps = collecter();
      try {
        m = membres(); code = CODE_DEPOT;
        if (!corps) throw Error("Aucune réponse à envoyer sur cette page pour l’instant.");
      } catch (e) { return info(e.message, "ef-ko"); }
      var texte = document_(m), d = new Date();
      var nomFichier = slug(ACTIVITE.replace(/^FORMATION\s*—\s*/, "")) + "_" + slug(m[0].nom + "-" + m[0].prenom) + "_" +
        d.toISOString().slice(0, 16).replace(/[-:T]/g, "") + ".txt";
      go.disabled = true; info("Envoi en cours…");
      try {
        var r = await fetch(URL_SCRIPT, {
          method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "depot", code: code, classe: "Formation", repertoire: "Formation", membres: m,
            groupe: propre(box.querySelector("#ef-groupe").value), activite: ACTIVITE, type: "text/plain", nom: nomFichier, fichier: base64Utf8(texte) })
        });
        if (!r.ok) throw Error("HTTP " + r.status);
        var data = await r.json();
        if (data.statut !== "OK") throw Error(data.message || "enregistrement non confirmé");
        var quand = d.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
        ecrire(CLE_ENVOI, quand);
        info("✓ Réponses reçues par le formateur (" + quand + "). Merci !", "ef-ok");
        if (window.umami && umami.track) umami.track("envoi-formateur", { activite: ACTIVITE });
      } catch (e) {
        info("L’envoi n’a pas abouti (" + e.message + "). Réessayez dans un instant ; vos réponses restent sur la page.", "ef-ko");
      } finally { go.disabled = false; }
    });

    var hote = document.querySelector("main") || document.body, pied = hote.querySelector(":scope > footer");
    if (pied) hote.insertBefore(box, pied); else hote.appendChild(box);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", construirePanneau);
  else construirePanneau();
})();
