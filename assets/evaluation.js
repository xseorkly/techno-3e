/* Évaluation protégée — révélation par mot de passe, saisie et export PDF.
   Le contenu est encodé et seule une empreinte du mot de passe est comparée :
   cela suffit pour un usage en classe, ce n'est pas une sécurité réelle. */
(function(){
  "use strict";
  var cfg = window.EVALUATION;
  if(!cfg) return;

  function id(x){ return document.getElementById(x); }
  function empreinte(t){
    var h = 5381;
    for(var i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0;
    return h;
  }
  function decode64(s){
    try{ return decodeURIComponent(escape(atob(s))); }catch(e){ return atob(s); }
  }
  function esc(t){ return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;"); }

  var prof = new URLSearchParams(location.search).get("prof") === "1";
  var btn = id("eval-btn"), champ = id("eval-mdp"), refus = id("eval-refus"), zone = id("eval-contenu");
  if(!btn || !champ || !zone) return;
  var data = null;

  function corrige(q){
    if(!prof || !q.corrige) return "";
    return '<div class="eval-corrige"><b>Attendu</b>' +
           q.corrige.map(function(c){ return "<p>" + c + "</p>"; }).join("") + "</div>";
  }

  function question(q, n){
    var s = '<div class="eval-q" data-q="' + q.id + '">';
    s += '<p class="eval-niv">' + esc(q.niveau) + '</p>';
    s += '<p class="eval-enonce">' + q.enonce + '</p>';

    if(q.type === "multi" || q.type === "radio"){
      var t = q.type === "multi" ? "checkbox" : "radio";
      if(q.type === "multi") s += '<p class="eval-note">Plusieurs réponses possibles.</p>';
      s += '<div class="eval-choix">';
      q.options.forEach(function(o, k){
        var ident = q.id + "-" + k;
        s += '<label><input type="' + t + '" name="' + q.id + '" id="' + ident + '" value="' + esc(o.l) + '">'
           + '<span class="lt">' + esc(o.l) + '</span><span>' + o.t + '</span></label>';
      });
      s += '</div>';
      if(q.suite) s += '<p class="eval-enonce" style="margin-top:12px">' + q.suite + '</p>'
                    + '<textarea id="' + q.id + '-just" rows="3" aria-label="Justification"></textarea>';
    }
    else if(q.type === "tab"){
      s += '<div class="eval-tab">';
      q.lignes.forEach(function(l, k){
        s += '<div class="eval-ligne"><span class="cle">' + l + '</span>';
        if(q.choix){
          s += '<select id="' + q.id + '-' + k + '" aria-label="Réponse pour ' + esc(l) + '"><option value="">Choisir…</option>';
          q.choix.forEach(function(c){ s += '<option>' + esc(c) + '</option>'; });
          s += '</select>';
        }else{
          s += '<input id="' + q.id + '-' + k + '" aria-label="Réponse pour ' + esc(l) + '">';
        }
        s += '</div>';
      });
      s += '</div>';
    }
    else{
      s += '<textarea id="' + q.id + '-rep" rows="' + (q.lignes || 5) + '" aria-label="Réponse"></textarea>';
    }
    return s + corrige(q) + '</div>';
  }

  function afficher(){
    var s = '<div class="eval-entete"><p class="eval-titre">' + data.titre + '</p>';
    if(data.competences) s += '<p class="eval-ref"><b>Compétence évaluée</b> ' + data.competences + '</p>';
    if(data.connaissances) s += '<p class="eval-ref"><b>Connaissances</b> ' + data.connaissances + '</p>';
    s += '</div>';
    s += '<div class="eval-identite">'
       + '<label>Nom <input id="eval-nom" autocomplete="family-name"></label>'
       + '<label>Prénom <input id="eval-prenom" autocomplete="given-name"></label>'
       + '<label>Classe <input id="eval-classe" placeholder="3e A"></label>'
       + '<label>Date <input id="eval-date" type="date"></label></div>';
    s += data.questions.map(question).join("");
    s += '<div class="eval-actions">'
       + '<button type="button" id="eval-pdf">Générer le PDF de l\'évaluation</button>'
       + '<button type="button" id="eval-print" class="secondaire">Imprimer</button></div>';
    zone.innerHTML = s;
    zone.hidden = false;
    champ.closest(".saisie").hidden = true;

    var d = new Date(), p = function(n){ return String(n).padStart(2, "0"); };
    id("eval-date").value = d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
    id("eval-print").addEventListener("click", function(){ window.print(); });
    id("eval-pdf").addEventListener("click", pdf);
  }

  function lireReponses(){
    return data.questions.map(function(q){
      var r = "";
      if(q.type === "multi" || q.type === "radio"){
        r = Array.prototype.slice.call(document.querySelectorAll('input[name="' + q.id + '"]'))
              .filter(function(i){ return i.checked; })
              .map(function(i){ return i.value; }).join(", ");
        var j = id(q.id + "-just");
        if(j && j.value.trim()) r += (r ? "\n" : "") + j.value.trim();
      }else if(q.type === "tab"){
        r = q.lignes.map(function(l, k){
          var c = id(q.id + "-" + k);
          return l + " : " + ((c && c.value.trim()) || "—");
        }).join("\n");
      }else{
        var t = id(q.id + "-rep");
        r = t ? t.value.trim() : "";
      }
      return [q.niveau, r];
    });
  }

  function propre(t){
    return String(t == null ? "" : t)
      .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
      .replace(/\u2026/g, "...").replace(/[\u2013\u2014]/g, "-")
      .replace(/\u00A0/g, " ").replace(/<[^>]+>/g, "");
  }

  function pdf(){
    var nom = (id("eval-nom").value || "").trim(),
        prenom = (id("eval-prenom").value || "").trim(),
        classe = (id("eval-classe").value || "").trim();
    if(!nom || !prenom || !classe){
      alert("Complète ton nom, ton prénom et ta classe avant de générer le PDF.");
      return;
    }
    if(!(window.jspdf && window.jspdf.jsPDF)){ window.print(); return; }
    var doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    var M = 14, LARG = 182, BAS = 279, y = 0, page = 1;
    var TEAL = [14,110,107], ENCRE = [20,38,43], DOUX = [110,125,130], TRAIT = [200,214,214];

    function pied(){
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5);
      doc.setTextColor(DOUX[0],DOUX[1],DOUX[2]);
      doc.text(propre(nom + " " + prenom + " - " + classe), M, 288);
      doc.text("Page " + page, 210 - M, 288, { align: "right" });
    }
    function nouvellePage(){
      pied(); doc.addPage(); page++;
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5);
      doc.setTextColor(DOUX[0],DOUX[1],DOUX[2]);
      doc.text(propre(data.titre), M, 12);
      doc.setDrawColor(TRAIT[0],TRAIT[1],TRAIT[2]); doc.setLineWidth(0.2);
      doc.line(M, 14.5, 210 - M, 14.5);
      y = 22;
    }
    function place(h){ if(y + h > BAS) nouvellePage(); }

    doc.setDrawColor(TEAL[0],TEAL[1],TEAL[2]); doc.setLineWidth(0.5);
    doc.roundedRect(M, 12, LARG, 20, 2, 2);
    doc.setFont("helvetica","bold"); doc.setFontSize(12);
    doc.setTextColor(TEAL[0],TEAL[1],TEAL[2]);
    doc.text(propre(data.titre), M + 6, 22);
    doc.setFont("helvetica","normal"); doc.setFontSize(7.5);
    doc.setTextColor(DOUX[0],DOUX[1],DOUX[2]);
    doc.text(propre(data.competences || ""), M + 6, 28, { maxWidth: LARG - 12 });
    y = 40;

    doc.setFillColor(240,246,246); doc.setDrawColor(TRAIT[0],TRAIT[1],TRAIT[2]); doc.setLineWidth(0.2);
    doc.roundedRect(M, y, LARG, 11, 1.5, 1.5, "FD");
    doc.setFont("helvetica","bold"); doc.setFontSize(9);
    doc.setTextColor(ENCRE[0],ENCRE[1],ENCRE[2]);
    doc.text(propre(nom.toUpperCase() + " " + prenom), M + 5, y + 7);
    doc.text(propre(classe), M + 96, y + 7);
    var dt = (id("eval-date").value || "").split("-");
    doc.text(dt.length === 3 ? dt[2] + "/" + dt[1] + "/" + dt[0] : "", M + 140, y + 7);
    y += 18;

    lireReponses().forEach(function(r){
      place(30);
      doc.setFont("helvetica","bold"); doc.setFontSize(10);
      doc.setTextColor(ENCRE[0],ENCRE[1],ENCRE[2]);
      doc.text(propre(r[0]), M + 1, y);
      y += 3;
      var lh = 4.7, pad = 3.2, minL = 3;
      doc.setFont("helvetica","normal"); doc.setFontSize(9.5);
      doc.setLineHeightFactor(lh * 2.83465 / 9.5);
      var lignes = r[1] ? doc.splitTextToSize(propre(r[1]), LARG - 2 * pad) : [];
      var i = 0;
      if(!lignes.length){
        var h0 = minL * lh + 2 * pad;
        place(h0);
        doc.setDrawColor(TRAIT[0],TRAIT[1],TRAIT[2]); doc.setLineWidth(0.25);
        doc.roundedRect(M, y, LARG, h0, 1.5, 1.5);
        y += h0 + 5;
      }else{
        while(i < lignes.length){
          if(BAS - y < lh + 2 * pad + 4) nouvellePage();
          var n = Math.min(Math.floor((BAS - y - 2 * pad) / lh), lignes.length - i);
          var nAff = (i === 0 && lignes.length <= minL) ? minL : n;
          var h = nAff * lh + 2 * pad;
          doc.setDrawColor(TRAIT[0],TRAIT[1],TRAIT[2]); doc.setLineWidth(0.25);
          doc.roundedRect(M, y, LARG, h, 1.5, 1.5);
          doc.setTextColor(ENCRE[0],ENCRE[1],ENCRE[2]);
          doc.text(lignes.slice(i, i + n), M + pad, y + pad + lh * 0.72);
          y += h + 5; i += n;
        }
      }
      doc.setLineHeightFactor(1.15);
    });

    pied();
    var net = function(t){
      return propre(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
    };
    doc.save([data.ref, net(nom).toUpperCase(), net(prenom), net(classe)].filter(Boolean).join("_") + ".pdf");
  }

  function ouvrir(){
    if(empreinte(champ.value.trim()) !== cfg.empreinte){
      refus.hidden = false; champ.value = ""; champ.focus(); return;
    }
    refus.hidden = true;
    try{
      data = JSON.parse(decode64(cfg.coffre));
      afficher();
    }catch(e){
      refus.textContent = "Impossible de charger l'évaluation.";
      refus.hidden = false;
    }
  }
  btn.addEventListener("click", ouvrir);
  champ.addEventListener("keydown", function(e){ if(e.key === "Enter") ouvrir(); });
})();
