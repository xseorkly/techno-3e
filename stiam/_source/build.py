# -*- coding: utf-8 -*-
"""Générateur du site ASTROTECH (dossier stiam).

Usage : python3 _source/build.py
Toutes les pages pédagogiques sont produites à partir des fichiers contenu_*.py.
Ne pas modifier à la main les pages générées : modifier le contenu, puis relancer ce script.
"""
import html
import os
import re
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(ICI)
sys.path.insert(0, ICI)

import contenu_cm1, contenu_cm2, contenu_6e, contenu_5e, contenu_4e, contenu_3e  # noqa: E402
from figures_registre import FIGURES, PHOTOS  # noqa: E402

NIVEAUX = [m.NIVEAU for m in (contenu_cm1, contenu_cm2, contenu_6e, contenu_5e, contenu_4e, contenu_3e)]
NB_SEANCES = sum(len(n["seances"]) for n in NIVEAUX)
NB_CARTES = sum(len(n["cartes"]) for n in NIVEAUX)
OUTILS = {"ombres": "outils/ombres.html", "lune": "outils/lune.html", "distances": "outils/distances.html",
          "ciel": "outils/ciel.html", "pixels": "outils/pixels.html", "rover": "outils/rover.html"}
VERSION_DOCS = "V4"


# ---------------------------------------------------------------- outils texte
def typo(s):
    return s.replace("'", "’")


def t(s):
    """Texte affiché : apostrophes typographiques puis échappement HTML."""
    return html.escape(typo(s), quote=False)


def a(s):
    """Valeur d'attribut."""
    return html.escape(typo(s), quote=True)


def code(s):
    return html.escape(s, quote=False)


def lettre(i):
    return "ABCDEFGH"[i]


def carte(niv, cid):
    for c in niv["cartes"]:
        if c["id"] == cid:
            return c
    raise KeyError(cid)


def seance_id(niv, n):
    return "%s-s%02d" % (niv["id"], n)


def phase_labels(s):
    return ["S'interroger", s["enquete"].get("court", "Enquêter"), "Retenir", "Agir", "Bilan"]


def deroule(s):
    return " ; ".join("%s %d min" % (lab, d) for lab, d in zip(phase_labels(s), s["phases"]))


# ---------------------------------------------------------------- gabarit
def head(titre, prof, description="Astronomie et technologies spatiales — parcours pédagogique du CM1 à la 3e"):
    p = "../" * prof
    return ('<!doctype html><html lang="fr"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0E6E6B">'
            '<meta name="description" content="%s"><link rel="icon" type="image/svg+xml" href="%sassets/favicon.svg">'
            '<link rel="manifest" href="%smanifest.webmanifest"><link rel="stylesheet" href="%sassets/fonts.css">'
            '<link rel="stylesheet" href="%sassets/style.css"><script defer src="%sassets/config.js"></script>'
            '<script defer src="%sassets/main.js"></script><title>%s — Astronomie &amp; technologies</title></head><body>'
            % (a(description), p, p, p, p, p, p, t(titre)))


def nav(prof, actif=""):
    p = "../" * prof
    liens = [("index.html", "Accueil"), ("connaissances.html", "Connaissances"), ("activites.html", "Activités"),
             ("outils.html", "Simulations"), ("ressources.html", "Téléchargements"), ("enseignants.html", "Enseignants"),
             ("sources.html", "Sources")]
    items = "".join('<a href="%s%s" class="%s">%s</a>' % (p, h, "active" if h == actif else "", t(l)) for h, l in liens)
    return ('<div class="navsite"><div class="navinside"><a class="nav-logo" href="%sindex.html" aria-label="Accueil du parcours">'
            '<span class="logo-orbit" aria-hidden="true">✦</span><span>ASTRO<span class="logo-em">TECH</span></span></a>'
            '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">☰ Menu</button>'
            '<nav id="primary-nav" class="navlinks" aria-label="Navigation principale">%s</nav>'
            '<button class="contrast-toggle" title="Changer le contraste" aria-label="Changer le contraste">◐</button></div></div>'
            % (p, items))


def footer(prof):
    p = "../" * prof
    return ('<footer><div><b>ASTROTECH · Du CM1 à la 3e</b><p>Un parcours de culture astronomique, d’investigation et de technologie.</p></div>'
            '<div><b>Fehmi KLABI</b><p>Professeur de technologie · Formateur · Lycée français de Vienne</p>'
            '<small>Site pédagogique autonome · %d séances · %d fiches de connaissances</small></div></footer>'
            '<script>if(\'serviceWorker\' in navigator && location.protocol.startsWith(\'http\')) navigator.serviceWorker.register(\'%ssw.js\').catch(()=>{});</script>'
            '</body></html>' % (NB_SEANCES, NB_CARTES, p))


def ecrire(chemin_relatif, contenu):
    chemin = os.path.join(SITE, chemin_relatif)
    os.makedirs(os.path.dirname(chemin), exist_ok=True)
    with open(chemin, "w", encoding="utf-8") as f:
        f.write(contenu)


def figure_html(nom, prof, deja=None, classe="lesson-img"):
    if deja is not None:
        if nom in deja:
            return ""
        deja.add(nom)
    p = "../" * prof
    if nom in FIGURES:
        alt, legende = FIGURES[nom]["alt"], FIGURES[nom]["legende"]
        src = "%sassets/figures/%s" % (p, nom)
    else:
        alt, legende = PHOTOS[nom]["alt"], PHOTOS[nom]["legende"]
        src = "%sassets/photos/%s" % (p, nom)
        classe = "lesson-photo"
    return ('<figure class="%s"><img src="%s" alt="%s" loading="lazy"><figcaption>%s</figcaption></figure>'
            % (classe, src, a(alt), t(legende)))


def visuel_html(v, prof, deja):
    if not v:
        return ""
    kind, nom = v.split(":", 1)
    return figure_html(nom, prof, deja)


def table_html(d):
    if not d:
        return ""
    th = "".join("<th>%s</th>" % t(c) for c in d["colonnes"])
    rows = "".join("<tr>%s</tr>" % "".join("<td>%s</td>" % t(c) for c in r) for r in d["lignes"])
    note = '<small>%s</small>' % t(d["note"]) if d.get("note") else ""
    return ('<div class="data-exhibit"><h3>%s</h3><div class="scroll-table"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>%s</div>'
            % (t(d["titre"]), th, rows, note))


def code_html(c, titre="Programme"):
    if not c:
        return ""
    return '<div class="code-block"><p class="code-title">%s</p><pre><code>%s</code></pre></div>' % (t(titre), code(c))


def ol(items, classe="steps"):
    if not items:
        return ""
    return '<ol class="%s">%s</ol>' % (classe, "".join("<li>%s</li>" % t(x) for x in items))


def ul(items):
    return "<ul>%s</ul>" % "".join("<li>%s</li>" % t(x) for x in items)


def docs_de_seance(niv, n):
    return [d for d in niv["documents"] if d.get("seance") == n]


def doc_html(d):
    return ('<div class="source-link"><b>Document à consulter</b><a href="%s" target="_blank" rel="noopener">%s · %s ↗</a><p>%s</p></div>'
            % (a(d["url"]), t(d["titre"]), t(d["source"]), t(d["question"])))


def avec_essais(s):
    txt = " ".join(s["agir"].get("etapes", [])).lower()
    return "test" in txt or "essai" in txt


# ---------------------------------------------------------------- page activité
def select_activites(courant):
    groupes = []
    for niv in NIVEAUX:
        opts = "".join('<option value="%s.html"%s>Séance %02d · %s</option>'
                       % (seance_id(niv, s["n"]), " selected" if seance_id(niv, s["n"]) == courant else "", s["n"], t(s["titre"]))
                       for s in niv["seances"])
        groupes.append('<optgroup label="%s">%s</optgroup>' % (a(niv["label"]), opts))
    return '<select id="navfiches">%s</select>' % "".join(groupes)


def page_activite(niv, s):
    sid = seance_id(niv, s["n"])
    total = len(niv["seances"])
    deja = set()
    labels = phase_labels(s)
    ancres = ["situation", "enquete", "retenir", "agir", "bilan"]
    chrono = "".join('<a href="#%s"><b>%d′</b>%s</a>' % (an, d, t(lab)) for an, d, lab in zip(ancres, s["phases"], labels))
    duree = sum(s["phases"])
    assert duree == niv["duree"], (sid, duree)
    h = [head("%s · Séance %d · %s" % (niv["label"], s["n"], s["titre"]), 1), nav(1, "activites.html")]
    h.append('<main class="page lesson-page" data-page="%s">' % sid)
    h.append('<nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="../index.html">Accueil</a> <span>›</span> '
             '<a href="../niveau/%s.html">%s</a> <span>›</span> <span aria-current="page">Séance %d</span></nav>' % (niv["id"], t(niv["label"]), s["n"]))
    h.append('<div class="lesson-switch"><a href="../niveau/%s.html" class="btn btn-outline">← Parcours %s</a>'
             '<label for="navfiches">Aller à une autre séance %s</label></div>' % (niv["id"], t(niv["label"]), select_activites(sid)))
    h.append('<header class="lesson-hero"><div class="brandline"><span class="brand-seal small">✦</span><span>%s · Séance %d sur %d · %d min</span>'
             '<span class="grade-pill">%s</span></div><h1>%s</h1><p>%s</p><nav class="chrono" aria-label="Étapes de la séance">%s</nav></header>'
             % (t(niv["discipline"]), s["n"], total, duree, t(niv["label"]), t(s["titre"]), t(s["but"]), chrono))
    h.append('<section class="identity" aria-label="Identité de l’élève">'
             '<div><label for="nom">Nom</label><input id="nom" data-save autocomplete="family-name"></div>'
             '<div><label for="prenom">Prénom</label><input id="prenom" data-save autocomplete="given-name"></div>'
             '<div><label for="classe">Classe</label><input id="classe" data-save placeholder="%s"></div>'
             '<div><label for="groupe">Groupe</label><input id="groupe" data-save></div>'
             '<div><label for="role">Rôle dans le groupe</label><input id="role" data-save placeholder="mesure, notes, matériel…"></div>'
             '<div><label for="date">Date</label><input id="date" type="date" data-save></div></section>' % a(niv["label"]))
    h.append('<details class="competences" open><summary>🎯 Ce que je vais apprendre</summary><div><p><b>Objectif :</b> %s</p>'
             '<p><b>Je réussis si :</b> %s</p></div></details>' % (t(s["but"]), t(s["reussite"])))
    h.append('<div class="lesson-body">')

    # 1. Situation
    si = s["situation"]
    h.append('<article class="bloc" id="situation"><div class="marge"><span class="duree">%d′</span></div><div class="corps">'
             '<h2>1. Je m’interroge</h2><div class="situation"><p>%s</p><p class="question-cle"><strong>%s</strong></p>%s</div>'
             '<div class="response-field"><label for="hypothese">Ce que je pense, avant de chercher (mon hypothèse) :</label>'
             '<textarea id="hypothese" data-save placeholder="Je pense que… parce que…"></textarea></div></div></article>'
             % (s["phases"][0], t(si["texte"]), t(si["question"]), visuel_html(si.get("visuel"), 1, deja)))

    # 2. Enquête
    e = s["enquete"]
    parts = ['<article class="bloc" id="enquete"><div class="marge"><span class="duree">%d′</span></div><div class="corps">' % s["phases"][1],
             '<h2>2. %s : %s</h2>' % (t(e.get("court", "Enquêter")), t(e["titre"])),
             '<p class="consigne">%s</p>' % t(e["consigne"])]
    if e.get("etapes"):
        parts.append(ol(e["etapes"]))
    if e.get("figure"):
        parts.append(figure_html(e["figure"], 1, deja))
    if e.get("code"):
        parts.append(code_html(e["code"]))
    parts.append(table_html(e.get("donnees")))
    for d in docs_de_seance(niv, s["n"]):
        parts.append(doc_html(d))
    parts.append('<h3>Je réponds</h3>')
    for i, (q, _r) in enumerate(e["questions"], 1):
        parts.append('<div class="response-field"><label for="q%d">%d. %s</label><textarea id="q%d" data-save rows="2" placeholder="Je réponds en citant une observation ou une donnée…"></textarea></div>'
                     % (i, i, t(q), i))
    parts.append('</div></article>')
    h.append("".join(parts))

    # 3. Retenir
    r = s["retenir"]
    rp = ['<article class="bloc" id="retenir"><div class="marge"><span class="duree">%d′</span></div><div class="corps"><h2>3. Je retiens</h2>' % s["phases"][2]]
    if r.get("carte"):
        c = carte(niv, r["carte"])
        rp.append('<div class="knowledge-trace trace-box"><b>Trace écrite</b><p>%s</p></div>' % t(c["trace"]))
        rp.append('<p><b>Mots-clés :</b> %s</p>' % t(c["vocabulaire"]))
        rp.append(figure_html(c["figure"], 1, deja))
        rp.append('<details class="knowledge-panel"><summary>Pour aller plus loin : l’explication complète</summary><div><p>%s</p></div></details>' % t(c["explication"]))
        rp.append('<p><a class="text-link" href="../connaissances.html#%s">Fiche de connaissances : %s →</a></p>' % (c["id"], t(c["question"])))
    else:
        rp.append('<div class="knowledge-trace trace-box"><b>Trace écrite</b><p>%s</p></div>' % t(r["texte"]))
        if r.get("figure"):
            rp.append(figure_html(r["figure"], 1, deja))
    if r.get("figure2"):
        rp.append(figure_html(r["figure2"], 1, deja))
    rp.append('</div></article>')
    h.append("".join(rp))

    # 4. Agir
    g = s["agir"]
    gp = ['<article class="bloc" id="agir"><div class="marge"><span class="duree">%d′</span></div><div class="corps">' % s["phases"][3],
          '<h2>4. J’agis : %s</h2>' % t(g["titre"]),
          '<div class="tech-challenge"><p class="consigne">%s</p>%s' % (t(g["consigne"]), ol(g.get("etapes"))),
          '<p><b>Ce que je dois produire :</b> %s</p>' % t(g["production"]),
          '<p><b>Matériel :</b> %s</p>' % t(g["materiel"])]
    if g.get("aide"):
        gp.append('<details class="hint"><summary>Besoin d’un coup de pouce ?</summary><div><p>%s</p></div></details>' % t(g["aide"]))
    gp.append('</div>')
    if g.get("code"):
        gp.append(code_html(g["code"]))
    gp.append('<div class="response-field"><label for="production">Ma production (texte, calcul, protocole ou description de mon schéma)</label>'
              '<textarea id="production" data-save rows="6" placeholder="Je décris ce que j’ai réalisé et ce que je constate…"></textarea></div>')
    if avec_essais(s):
        lignes = "".join('<tr><td>%d</td><td><input data-save id="essai_%d_param" aria-label="Essai %d : ce que je teste"></td>'
                         '<td><input data-save id="essai_%d_val" aria-label="Essai %d : résultat"></td>'
                         '<td><input data-save id="essai_%d_action" aria-label="Essai %d : décision"></td></tr>' % (k, k, k, k, k, k, k) for k in range(1, 4))
        gp.append('<div class="testtable"><h3>Mon carnet d’essais</h3><div class="scroll-table"><table><thead><tr><th>Essai</th>'
                  '<th>Ce que je teste</th><th>Résultat (avec l’unité)</th><th>Décision</th></tr></thead><tbody>%s</tbody></table></div></div>' % lignes)
    if g.get("outil"):
        cle, lib = g["outil"]
        gp.append('<p><a class="btn btn-secondary" href="../%s" target="_blank" rel="noopener">⚙ Ouvrir : %s</a></p>' % (OUTILS[cle], t(lib)))
    gp.append('</div></article>')
    h.append("".join(gp))

    # 5. Bilan
    bp = ['<article class="bloc" id="bilan"><div class="marge"><span class="duree">%d′</span></div><div class="corps"><h2>5. Je fais le bilan</h2><div class="quiz-area">' % s["phases"][4]]
    for j, (q, opts, rep, fb) in enumerate(s["qcm"]):
        choix = "".join('<label class="choice"><input data-save type="radio" name="quiz_%d" value="%d"><span>%s · %s</span></label>'
                        % (j, k, lettre(k), t(o)) for k, o in enumerate(opts))
        bp.append('<fieldset class="qcm" data-quiz="%d" data-answer="%d" data-feedback="%s"><legend><b>Q%d.</b> %s</legend>'
                  '<div class="choices">%s</div><div class="quiz-feedback" role="status" aria-live="polite"></div></fieldset>'
                  % (j, rep, a(fb), j + 1, t(q), choix))
    bp.append('<button type="button" class="btn btn-primary" data-check-quiz>Vérifier mes réponses</button></div>')
    bp.append('<div class="response-field"><label for="synthese">Ma synthèse : ce que j’ai appris et ce qui le prouve</label>'
              '<textarea id="synthese" data-save rows="4" placeholder="J’ai appris que… ; la preuve est… ; une limite est…"></textarea></div>')
    bp.append('<fieldset class="self-assessment"><legend>Mon niveau de maîtrise</legend>'
              '<label><input type="radio" name="maitrise" value="N1" data-save><b>N1</b><span>Je découvre les notions.</span></label>'
              '<label><input type="radio" name="maitrise" value="N2" data-save><b>N2</b><span>Je sais les expliquer avec une aide.</span></label>'
              '<label><input type="radio" name="maitrise" value="N3" data-save><b>N3</b><span>Je les utilise seul.</span></label>'
              '<label><input type="radio" name="maitrise" value="N4" data-save><b>N4</b><span>Je les justifie et je repère les limites.</span></label></fieldset>')
    bp.append('<details class="cps"><summary>🤝 Mon travail en groupe</summary><div><p>J’écoute, j’explique mes choix et j’accepte de changer d’avis quand les preuves l’exigent.</p>'
              '<label><input type="checkbox" id="cps_ecoute" data-save> J’ai écouté les autres membres du groupe.</label>'
              '<label><input type="checkbox" id="cps_justif" data-save> J’ai justifié une proposition avec une preuve.</label>'
              '<label><input type="checkbox" id="cps_change" data-save> J’ai aidé à améliorer notre travail.</label></div></details>')
    bp.append('</div></article>')
    h.append("".join(bp))

    # Correction
    cr = ['<section class="correction-area"><h2>Correction (enseignant)</h2>'
          '<p>Le professeur affiche la correction avec son code. Sur un site statique, ce code masque la correction mais ne la protège pas.</p>'
          '<div class="teacher-unlock"><input type="password" placeholder="Code enseignant" aria-label="Code enseignant">'
          '<button class="btn btn-secondary" type="button" data-teacher-unlock>Afficher</button><small class="teacher-message" aria-live="polite"></small></div>'
          '<div class="teacher-only" hidden>']
    cr.append('<p><b>Objectif :</b> %s</p>' % t(s["objectif"]))
    if s.get("programme"):
        cr.append('<p><b>Programme :</b> %s</p>' % t(s["programme"]))
    cr.append('<p><b>Déroulé :</b> %s.</p>' % t(deroule(s)))
    cr.append('<h3>Réponses de l’enquête</h3><ol>%s</ol>' % "".join('<li><b>%s</b> %s</li>' % (t(q), t(rr)) for q, rr in e["questions"]))
    cr.append('<h3>Production attendue</h3><p>%s</p>' % t(g["attendu"]))
    if g.get("code_attendu"):
        cr.append(code_html(g["code_attendu"], "Programme attendu"))
    cr.append('<h3>QCM</h3><ol>%s</ol>' % "".join('<li><b>%s</b> Réponse %s : %s. %s</li>' % (t(q), lettre(rep), t(opts[rep]), t(fb)) for q, opts, rep, fb in s["qcm"]))
    for d in docs_de_seance(niv, s["n"]):
        cr.append('<p><b>Document « %s » :</b> %s</p>' % (t(d["titre"]), t(d["corrige"])))
    cr.append('<p><b>Point de vigilance :</b> %s</p>' % t(s["vigilance"]))
    cr.append('</div></section>')
    h.append("".join(cr))
    h.append('</div>')

    # Pager
    if s["n"] > 1:
        prev = niv["seances"][s["n"] - 2]
        g_l = '<a href="%s.html">← Séance %d : %s</a>' % (seance_id(niv, prev["n"]), prev["n"], t(prev["titre"]))
    else:
        g_l = '<a href="../niveau/%s.html">← Retour au parcours %s</a>' % (niv["id"], t(niv["label"]))
    if s["n"] < total:
        nxt = niv["seances"][s["n"]]
        g_r = '<a href="%s.html">Séance %d : %s →</a>' % (seance_id(niv, nxt["n"]), nxt["n"], t(nxt["titre"]))
    else:
        g_r = '<a href="../niveau/%s.html">Retour au parcours %s →</a>' % (niv["id"], t(niv["label"]))
    h.append('<nav class="lesson-pager">%s<span>Séance %d / %d</span>%s</nav>' % (g_l, s["n"], total, g_r))
    h.append('<div class="actionbar"><span class="save-indicator">Réponses enregistrées sur cet appareil</span>'
             '<button type="button" class="btn btn-outline" data-export-json>↓ Exporter mes réponses</button>'
             '<button type="button" class="btn btn-secondary" data-reset>Effacer mes réponses</button>'
             '<button type="button" class="btn btn-secondary" data-forget>Effacer mon nom de cet appareil</button>'
             '<button type="button" class="btn btn-primary" data-print>🖨 Générer le PDF</button></div></main>')
    h.append(footer(1))
    ecrire("activites/%s.html" % sid, "".join(h))


# ---------------------------------------------------------------- page niveau
def page_niveau(niv):
    deja = set()
    total = len(niv["seances"])
    h = [head("%s — %s" % (niv["label"], niv["titre"]), 1), nav(1)]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="../index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">%s</span></nav>' % t(niv["label"]))
    img = FIGURES[niv["image"]]
    h.append('<div class="level-hero"><div><p class="kicker">%s</p><h1>%s</h1><p>%s</p><div class="pillbar"><span>✦ %d séances</span>'
             '<span>◷ %d min par séance</span><span>◉ %s</span></div></div><img src="../assets/figures/%s" alt="%s"></div>'
             % (t(niv["discipline"]), t(niv["titre"]), t(niv["sous_titre"]), total, niv["duree"], t(niv["programme"]["statut"].split(".")[0]), niv["image"], a(img["alt"])))
    deja.add(niv["image"])
    h.append('<section class="goal-card"><h2>Ce que je vais apprendre</h2><p><b>Question de départ :</b> %s</p>%s</section>'
             % (t(niv["question"]), ul(niv["competences"])))
    cards = []
    for i, c in enumerate(niv["cartes"], 1):
        cards.append('<article class="science-preview" id="question-%d"><div class="qnum">QUESTION %02d</div><h3>%s</h3>%s'
                     '<div class="scientific-note"><b>À retenir</b><p>%s</p></div><p><b>Expérience :</b> %s</p>'
                     '<a class="text-link" href="../connaissances.html#%s">Lire la fiche complète →</a></article>'
                     % (i, i, t(c["question"]), figure_html(c["figure"], 1, deja), t(c["trace"]), t(c["experience"]), c["id"]))
    h.append('<section><div class="section-head"><div><p class="kicker">LES CONNAISSANCES</p><h2>%d questions scientifiques</h2></div>'
             '<p>Chaque question s’appuie sur une observation, une expérience ou des données, puis sur un modèle dont on dit les limites.</p></div>'
             '<div class="science-list">%s</div></section>' % (len(niv["cartes"]), "".join(cards)))
    sess = "".join('<a class="session larger" href="../activites/%s.html"><span class="session-num">%02d</span><span><strong>%s</strong>'
                   '<small>%s</small></span><span class="session-go">→</span></a>' % (seance_id(niv, s["n"]), s["n"], t(s["titre"]), t(s["but"]))
                   for s in niv["seances"])
    h.append('<section><div class="section-head"><div><p class="kicker">MA SÉQUENCE</p><h2>Les séances, dans l’ordre</h2></div>'
             '<p>%s</p></div><div class="lesson-index">%s</div></section>' % (t(niv["calendrier"]), sess))
    m = niv["mission"]
    h.append('<section class="project-box"><span class="eyebrow">MISSION</span><h2>%s</h2><p>%s</p><p><b>Mission :</b> %s</p>'
             '<h3>Contraintes</h3>%s<p><b>Production finale :</b> %s</p><h3>La mission est réussie si…</h3>%s</section>'
             % (t(m["titre"]), t(m["situation"]), t(m["mission"]), ul(m["contraintes"]), t(m["production"]), ul(m["validation"])))
    rows = "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (t(d), t(l), t(s)) for d, l, s in niv["interdisciplinarite"])
    h.append('<section><div class="section-head"><div><p class="kicker">INTERDISCIPLINARITÉ</p><h2>Ce que l’on travaille aussi dans les autres disciplines</h2></div></div>'
             '<div class="scroll-table"><table class="teacher-table"><thead><tr><th>Discipline</th><th>Lien</th><th>Séances</th></tr></thead><tbody>%s</tbody></table></div></section>' % rows)
    docs = "".join('<a class="source-card" href="%s" target="_blank" rel="noopener"><b>%s</b><small>%s · séance %d</small><p>%s</p></a>'
                   % (a(d["url"]), t(d["titre"]), t(d["source"]), d["seance"], t(d["question"])) for d in niv["documents"])
    h.append('<section><div class="section-head"><div><p class="kicker">DOCUMENTS RÉELS</p><h2>Images et données de missions</h2></div></div>'
             '<div class="source-grid">%s</div></section>' % docs)
    outils = []
    for s in niv["seances"]:
        o = s["agir"].get("outil")
        if o and o[0] not in [x[0] for x in outils]:
            outils.append(o)
    btns = "".join('<a class="btn btn-secondary" href="../%s">⚙ %s</a> ' % (OUTILS[k], t(l.split(" (")[0])) for k, l in outils)
    h.append('<p class="link-row">%s<a class="btn btn-primary" href="../ressources.html#%s">⇩ Télécharger le dossier %s</a></p></main>' % (btns, niv["id"], t(niv["label"])))
    h.append(footer(1))
    ecrire("niveau/%s.html" % niv["id"], "".join(h))


# ---------------------------------------------------------------- connaissances
def page_connaissances():
    h = [head("Connaissances scientifiques", 0), nav(0, "connaissances.html")]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">Connaissances scientifiques</span></nav><div class="page-heading"><p class="kicker">%d QUESTIONS POUR COMPRENDRE LE CIEL</p>'
             '<h1>Le cahier scientifique</h1><p>Chaque fiche part d’une observation, propose une expérience, explique le phénomène, nomme l’idée fausse à dépasser '
             'et donne la trace écrite. Les réponses aux questions de vérification sont cachées : essaie d’abord de répondre seul.</p></div>' % NB_CARTES)
    h.append('<div class="chipnav">%s</div>' % "".join('<a href="#%s">%s</a>' % (n["id"], t(n["label"])) for n in NIVEAUX))
    for niv in NIVEAUX:
        h.append('<section class="knowledge-level" id="%s"><div class="section-head"><div><p class="kicker">%s</p><h2>%s · %s</h2></div></div>'
                 % (niv["id"], t(niv["discipline"]), t(niv["label"]), t(niv["sous_titre"])))
        for i, c in enumerate(niv["cartes"], 1):
            verif = "".join('<li>%s<details><summary>Réponse</summary><p>%s</p></details></li>' % (t(q), t(r)) for q, r in c["verif"])
            s = niv["seances"][c["seance"] - 1]
            h.append('<article class="knowledge-sheet" id="%s"><div class="sheet-head"><span class="seq-kicker">%s · QUESTION SCIENTIFIQUE %02d</span>'
                     '<h3>%s</h3><p>%s</p></div><div class="sheet-figure">%s</div><div class="sheet-reading"><h4>Comprendre le phénomène</h4><p>%s</p>'
                     '<h4>Expérience ou observation</h4><p>%s</p><h4>Vocabulaire</h4><p>%s</p>'
                     '<div class="misconception"><b>Idée fausse à dépasser</b><p>%s</p></div><div class="scientific-note"><b>Trace écrite</b><p>%s</p></div>'
                     '<div class="proof"><b>La preuve</b><p><b>Données :</b> %s</p><p><b>Ce qu’elles montrent :</b> %s</p></div>'
                     '<details class="qbox"><summary>Vérifier ma compréhension</summary><ol>%s</ol></details>'
                     '<a href="activites/%s.html" class="btn btn-secondary">Séance %d : %s →</a></div></article>'
                     % (c["id"], t(niv["label"]), i, t(c["question"]), t(c["accroche"]), figure_html(c["figure"], 0), t(c["explication"]),
                        t(c["experience"]), t(c["vocabulaire"]), t(c["conception"]), t(c["trace"]), t(c["preuve"]["donnees"]),
                        t(c["preuve"]["interpretation"]), verif, seance_id(niv, s["n"]), s["n"], t(s["titre"])))
        h.append('</section>')
    h.append('</main>')
    h.append(footer(0))
    ecrire("connaissances.html", "".join(h))


# ---------------------------------------------------------------- enseignants
def page_enseignants():
    h = [head("Espace enseignants", 0), nav(0, "enseignants.html")]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">Enseignants</span></nav><div class="page-heading"><p class="kicker">RESSOURCES ENSEIGNANTS</p>'
             '<h1>Programmes, progression, évaluation</h1><p>Pour chaque niveau : le texte officiel applicable en 2026-2027 et les intitulés exacts visés, '
             'l’interdisciplinarité, la mission, le déroulé minuté, la grille d’évaluation et les points de vigilance. Les corrigés détaillés se trouvent dans chaque séance.</p></div>'
             '<div class="warning-note"><b>Important :</b> cette page est publique, comme tout site GitHub Pages. Le code enseignant des séances masque les corrigés '
             'mais ne les protège pas. Pour des corrigés confidentiels, les déposer dans un espace authentifié (ENT, Moodle).</div>')
    h.append('<div class="chipnav">%s</div><div class="teacher-list">' % "".join('<a href="#%s">%s</a>' % (n["id"], t(n["label"])) for n in NIVEAUX))
    for niv in NIVEAUX:
        p = niv["programme"]
        rows_i = "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (t(d), t(l), t(s)) for d, l, s in niv["interdisciplinarite"])
        rows_d = "".join('<tr><td>%d</td><td><a href="activites/%s.html">%s</a></td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'
                         % (s["n"], seance_id(niv, s["n"]), t(s["titre"]), t(s["objectif"]), t(deroule(s)), t(s["agir"]["production"]), t(s["reussite"]))
                         for s in niv["seances"])
        ev = niv["evaluation"]
        rows_e = "".join("<tr><td><b>%s</b></td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>" % tuple(t(x) for x in c) for c in ev["criteres"])
        m = niv["mission"]
        docs = "".join('<li><a href="%s" target="_blank" rel="noopener">%s ↗</a> (séance %d) — %s</li>' % (a(d["url"]), t(d["titre"]), d["seance"], t(d["corrige"])) for d in niv["documents"])
        h.append('<details class="teacher-level" id="%s"><summary><span class="level-mini">%s</span><span>%s</span><span class="chev">⌄</span></summary><div class="teacher-detail">'
                 % (niv["id"], t(niv["label"]), t(niv["titre"])))
        h.append('<h3>Programme</h3><p><b>%s.</b> %s</p><p><b>Intitulés visés :</b></p>%s' % (t(p["texte"]), t(p["statut"]), ul(p["attendus"])))
        if p.get("hors"):
            h.append('<p><b>Périmètre et anticipation :</b></p>%s' % ul(p["hors"]))
        h.append('<h3>Compétences travaillées</h3>%s' % ul(niv["competences"]))
        h.append('<h3>Interdisciplinarité</h3><div class="scroll-table"><table class="teacher-table"><thead><tr><th>Discipline</th><th>Lien</th><th>Séances</th></tr></thead><tbody>%s</tbody></table></div>' % rows_i)
        h.append('<h3>Mission</h3><p>%s</p><p><b>Mission :</b> %s</p>%s<p><b>Production :</b> %s</p><p><b>Critères de validation :</b></p>%s<p><b>Calendrier :</b> %s</p>'
                 % (t(m["situation"]), t(m["mission"]), ul(m["contraintes"]), t(m["production"]), ul(m["validation"]), t(niv["calendrier"])))
        h.append('<h3>Déroulé (%d min par séance)</h3><div class="scroll-table"><table class="teacher-table"><thead><tr><th>N°</th><th>Séance</th><th>Objectif</th>'
                 '<th>Phases et durées</th><th>Production</th><th>Critère de réussite</th></tr></thead><tbody>%s</tbody></table></div>' % (niv["duree"], rows_d))
        h.append('<h3>Évaluation</h3><p>%s</p><div class="scroll-table"><table class="teacher-table"><thead><tr><th>Critère</th><th>Maîtrise insuffisante</th>'
                 '<th>Maîtrise fragile</th><th>Maîtrise satisfaisante</th><th>Très bonne maîtrise</th></tr></thead><tbody>%s</tbody></table></div>' % (t(ev["tache"]), rows_e))
        h.append('<h3>Vigilance scientifique et pédagogique</h3>%s<h3>Documents authentiques et corrigés</h3><ul>%s</ul>' % (ul(niv["vigilance"]), docs))
        h.append('<a class="btn btn-secondary" href="ressources.html#%s">Télécharger le dossier et le livret →</a></div></details>' % niv["id"])
    h.append('</div><section class="project-box"><h2>Principes communs à tous les niveaux</h2>'
             '<p><b>Structure de chaque séance :</b> je m’interroge (hypothèse) → j’enquête (expérience, mesures, documents) → je retiens (trace écrite) → j’agis (projet) → je fais le bilan.</p>'
             '<p><b>Sécurité :</b> ne jamais observer directement le Soleil ; basse tension uniquement ; outils coupants sous surveillance.</p>'
             '<p><b>Données :</b> les données fictives sont toujours signalées ; elles sont remplacées dès que possible par les mesures des élèves.</p>'
             '<p><b>Évaluation :</b> quatre niveaux de maîtrise, critères propres à chaque niveau ; on évalue séparément connaissances, raisonnement, réalisation technique et qualité de la preuve.</p></section></main>')
    h.append(footer(0))
    ecrire("enseignants.html", "".join(h))


# ---------------------------------------------------------------- accueil, activités
def remplacer_entre(texte, debut, fin, nouveau):
    i = texte.index(debut)
    j = texte.index(fin, i)
    return texte[:i] + nouveau + texte[j:]


def grille_sequences():
    out = ['<div class="sequence-grid">']
    for niv in NIVEAUX:
        sess = "".join('<a class="session" href="activites/%s.html"><span class="session-num">%02d</span><span><strong>%s</strong><small>%s · %d min</small></span>'
                       '<span class="session-go">→</span></a>' % (seance_id(niv, s["n"]), s["n"], t(s["titre"]), t(s["but"]), niv["duree"]) for s in niv["seances"])
        out.append('<details class="sequence-card" id="rub-%s"><summary><span class="seq-num">%s</span><span class="seq-title"><span class="seq-kicker">%s</span>'
                   '<h3>%s</h3><p>%s</p></span><span class="seq-side"><span class="count">%d séances</span><span class="chev">⌄</span></span></summary>'
                   '<div class="sessions">%s<a class="sequence-more" href="niveau/%s.html">Connaissances, mission et progression du %s →</a></div></details>'
                   % (niv["id"], t(niv["label"]), t(niv["discipline"]), t(niv["titre"]), t(niv["sous_titre"]), len(niv["seances"]), sess, niv["id"], t(niv["label"])))
    out.append('</div>')
    return "".join(out)


def page_accueil():
    chemin = os.path.join(SITE, "index.html")
    s = open(chemin, encoding="utf-8").read()
    s = remplacer_entre(s, '<div class="sequence-grid">', '</section><section class="feature-row">', grille_sequences())
    s = re.sub(r'<h3>\d+ questions d’astronomie</h3>', '<h3>%d questions d’astronomie</h3>' % NB_CARTES, s)
    s = re.sub(r'<link rel="preconnect" href="https://fonts.googleapis.com">', '', s)
    s = re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com/[^"]*">', '<link rel="stylesheet" href="assets/fonts.css">', s)
    s = re.sub(r'<footer>.*</html>', footer(0), s, flags=re.S)
    s = re.sub(r'<nav id="primary-nav" class="navlinks"[^>]*>.*?</nav>', re.search(r'<nav id="primary-nav".*?</nav>', nav(0, "index.html")).group(0), s, flags=re.S)
    open(chemin, "w", encoding="utf-8").write(s)


def page_activites():
    h = [head("Activités", 0), nav(0, "activites.html")]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">Activités</span></nav><div class="page-heading"><p class="kicker">%d SÉANCES INTERACTIVES</p><h1>Les séances par niveau</h1>'
             '<p>Ouvre ta séance, écris ton nom, puis suis les cinq étapes : je m’interroge, j’enquête, je retiens, j’agis, je fais le bilan. '
             'Tes réponses restent sur cet appareil ; tu peux les imprimer en PDF.</p></div>' % NB_SEANCES)
    h.append('<div class="searchbar"><label for="filter-all">Rechercher une séance</label><input id="filter-all" type="search" class="search-input" '
             'data-filter-target=".activity-entry" placeholder="Ex. ombre, Lune, satellite, rover…"></div>')
    for niv in NIVEAUX:
        ent = "".join('<a class="activity-entry" href="activites/%s.html"><span>%02d</span><div><b>%s</b><p>%s</p></div><span>→</span></a>'
                      % (seance_id(niv, s["n"]), s["n"], t(s["titre"]), t(s["but"])) for s in niv["seances"])
        h.append('<section class="activities-group" id="%s"><h2>%s <small>%s</small></h2><div class="activity-list">%s</div></section>'
                 % (niv["id"], t(niv["label"]), t(niv["titre"]), ent))
    h.append('</main>')
    h.append(footer(0))
    ecrire("activites.html", "".join(h))


# ---------------------------------------------------------------- atlas
def page_atlas():
    h = [head("Atlas scientifique", 0), nav(0)]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">Atlas scientifique</span></nav><div class="page-heading"><p class="kicker">SCHÉMAS, PHOTOGRAPHIES ET SOURCES</p>'
             '<h1>Atlas visuel</h1><p>%d schémas originaux, des photographies créditées et %d documents de missions à consulter en ligne. '
             'Les schémas sont des modèles : ils ne respectent pas les échelles, sauf mention contraire.</p></div>' % (len(FIGURES), 2 * len(NIVEAUX)))
    chips = '<button class="chip active" data-gallery="all">Tout</button>' + "".join('<button class="chip" data-gallery="%s">%s</button>' % (n["id"], t(n["label"])) for n in NIVEAUX) + \
            '<button class="chip" data-gallery="photo">Photographies</button>'
    cards = []
    for nom, f in FIGURES.items():
        cards.append('<figure class="gallery-card" data-level="%s"><img loading="lazy" src="assets/figures/%s" alt="%s"><figcaption><b>%s</b><small>%s</small>'
                     '<a href="assets/figures/%s" download>↓ Image PNG</a></figcaption></figure>' % (f["niveau"], nom, a(f["alt"]), t(f["titre"]), t(f["legende"]), nom))
    for nom, f in PHOTOS.items():
        cards.append('<figure class="gallery-card gallery-photo" data-level="photo"><img loading="lazy" src="assets/photos/%s" alt="%s"><figcaption><b>%s</b><small>%s</small></figcaption></figure>'
                     % (nom, a(f["alt"]), t(f["titre"]), t(f["legende"])))
    h.append('<div class="chipnav">%s</div><div class="gallery-grid">%s</div>' % (chips, "".join(cards)))
    docs = []
    for niv in NIVEAUX:
        for d in niv["documents"]:
            docs.append('<article class="source-card"><span class="source-level">%s · séance %d</span><b>%s</b><small>%s</small><p><b>Question :</b> %s</p>'
                        '<a href="%s" target="_blank" rel="noopener">Consulter le document ↗</a></article>' % (t(niv["label"]), d["seance"], t(d["titre"]), t(d["source"]), t(d["question"]), a(d["url"])))
    h.append('<section><div class="section-head"><div><p class="kicker">RESSOURCES EN LIGNE</p><h2>%d documents de missions à analyser</h2></div>'
             '<p>Ces pages sont en anglais : prévoir une lecture guidée, éventuellement avec le professeur de langue.</p></div><div class="source-grid">%s</div></section></main>'
             % (len(docs), "".join(docs)))
    h.append(footer(0))
    ecrire("atlas.html", "".join(h))


# ---------------------------------------------------------------- ressources
def taille(chemin_rel):
    try:
        o = os.path.getsize(os.path.join(SITE, chemin_rel))
    except OSError:
        return "à générer"
    return "%d Ko" % max(1, round(o / 1024))


def carte_dl(chemin, titre):
    ext = chemin.rsplit(".", 1)[1].upper()
    return ('<a class="download-card" href="%s" download><span class="file-icon">%s</span><span><b>%s</b><small>%s · %s</small></span><span class="dl-go">↓</span></a>'
            % (chemin, ext, t(titre), ext, taille(chemin)))


def page_ressources():
    h = [head("Téléchargements", 0), nav(0, "ressources.html")]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">Téléchargements</span></nav><div class="page-heading"><p class="kicker">DOCUMENTS MODIFIABLES ET IMPRIMABLES</p>'
             '<h1>Télécharger les ressources</h1><p>Dossiers enseignants et livrets élèves (version %s), produits à partir du même contenu que le site. '
             'Le site s’utilise sans ces fichiers.</p></div>' % VERSION_DOCS)
    h.append('<div class="chipnav">%s<a href="#documents">Cadrage et atlas</a><a href="#fichiers">Données et programmes</a></div>'
             % "".join('<a href="#%s">%s</a>' % (n["id"], t(n["label"])) for n in NIVEAUX))
    for niv in NIVEAUX:
        L = niv["label"]
        fichiers = [("telechargements/enseignants/%s_Dossier_enseignant_%s.pdf" % (L, VERSION_DOCS), "Dossier enseignant"),
                    ("telechargements/enseignants/%s_Dossier_enseignant_%s.docx" % (L, VERSION_DOCS), "Dossier enseignant"),
                    ("telechargements/eleves/%s_Livret_eleve_%s.pdf" % (L, VERSION_DOCS), "Livret élève"),
                    ("telechargements/eleves/%s_Livret_eleve_%s.docx" % (L, VERSION_DOCS), "Livret élève")]
        h.append('<section class="resources-level" id="%s"><h2>%s <small>%s</small></h2><div class="download-grid">%s</div></section>'
                 % (niv["id"], t(L), t(niv["titre"]), "".join(carte_dl(c, ti) for c, ti in fichiers)))
    gen = [("telechargements/enseignants/00_Cadrage_general_%s.pdf" % VERSION_DOCS, "Cadrage général"),
           ("telechargements/enseignants/00_Cadrage_general_%s.docx" % VERSION_DOCS, "Cadrage général"),
           ("telechargements/atlas/Atlas_images_scientifiques_%s.pdf" % VERSION_DOCS, "Atlas des figures"),
           ("telechargements/Parcours_Astronomie_%s_Integral.pdf" % VERSION_DOCS, "Parcours intégral (tous les dossiers)")]
    h.append('<section class="resources-level" id="documents"><h2>Cadrage et atlas</h2><div class="download-grid">%s</div></section>' % "".join(carte_dl(c, ti) for c, ti in gen))
    fich = [("telechargements/mesures_6e.csv", "6e · relevés fictifs (CSV)"), ("telechargements/paquets_4e.csv", "4e · paquets de l’image (CSV)"),
            ("telechargements/pixels_4e.py", "4e · codage de l’image (Python)"), ("telechargements/rover_3e.py", "3e · campagne d’essais simulée (Python)")]
    h.append('<section class="resources-level" id="fichiers"><h2>Données et programmes</h2><div class="download-grid">%s</div></section></main>' % "".join(carte_dl(c, ti) for c, ti in fich))
    h.append(footer(0))
    ecrire("ressources.html", "".join(h))


# ---------------------------------------------------------------- sources
SOURCES = [
    ("Textes officiels", [
        ("Programme de sciences et technologie du cycle 3 — BO n° 24 du 11 juin 2026", "Ministère de l’Éducation nationale · CM1 en 2026-2027, CM2 et 6e en 2027-2028", "https://www.education.gouv.fr/bo/2026/Hebdo24/MENE2611650A"),
        ("Annexe 2 — programme de sciences et technologie du cycle 3 (2026)", "Texte intégral du programme", "https://www.education.gouv.fr/sites/default/files/document/annexe-2-programme-de-sciences-et-technologie-du-cycle-3-519023.pdf"),
        ("Programme du cycle 3 en vigueur à la rentrée 2023", "Éduscol · applicable au CM2 et en 6e en 2026-2027", "https://eduscol.education.gouv.fr/sites/default/files/document/programme-d-enseignement-du-cycle-3-2023-100806.pdf"),
        ("Calendrier d’application du programme de cycle 3", "Éduscol · ressources d’accompagnement", "https://eduscol.education.gouv.fr/6878/ressources-d-accompagnement-du-programme-de-sciences-et-technologie-au-cycle-3"),
        ("Programme de technologie du cycle 4 — BO n° 9 du 29 février 2024", "5e (2024), 4e (2025), 3e (2026)", "https://www.education.gouv.fr/bo/2024/Hebdo9/MENE2402802A"),
        ("Annexe — programme de technologie du cycle 4", "Thèmes, compétences et repères de progressivité", "https://www.education.gouv.fr/sites/default/files/ensel802_annexe.pdf"),
        ("Ressources d’accompagnement du programme de technologie au cycle 4", "Éduscol", "https://eduscol.education.gouv.fr/5745/ressources-d-accompagnement-du-programme-de-technologie-au-cycle-4"),
    ]),
    ("Données scientifiques", [
        ("Solar System Facts", "NASA Science · distances et diamètres des planètes", "https://science.nasa.gov/solar-system/solar-system-facts/"),
        ("Earth Facts", "NASA Science", "https://science.nasa.gov/earth/facts/"),
        ("Mars Facts", "NASA Science", "https://science.nasa.gov/mars/facts/"),
        ("Moon Phases", "NASA Science", "https://science.nasa.gov/moon/moon-phases/"),
        ("Catalog of Earth Satellite Orbits", "NASA Earth Observatory", "https://science.nasa.gov/earth/earth-observatory/catalog-of-earth-satellite-orbits/"),
        ("Space Basics – Earth observation", "Agence spatiale européenne", "https://www.esa.int/Education/Space_Basics_-_Earth_observation"),
        ("Bilan climatique 2024 de l’Autriche", "GeoSphere Austria · écart de température 2024 et jours de chaleur à Wien Hohe Warte", "https://www.zamg.ac.at/zamgWeb/klima/klimarueckblick/archive/2024/wiewars24.pdf"),
        ("Bilan climatique 2023 de l’Autriche", "GeoSphere Austria", "https://www.zamg.ac.at/zamgWeb/klima/klimarueckblick/archive/2023/wiewars23.pdf"),
        ("Bilan climatique 2022 de l’Autriche", "GeoSphere Austria", "https://www.zamg.ac.at/zamgWeb/klima/klimarueckblick/archive/2022/wiewars22.pdf"),
        ("Positions du Soleil à Vienne", "Valeurs calculées pour le site avec l’algorithme solaire de la NOAA (latitude 48,21° N, longitude 16,37° E)", "https://gml.noaa.gov/grad/solcalc/"),
    ]),
    ("Ressources éducatives", [
        ("Projets scolaires", "CNES", "https://cnes.fr/jeunes/projets-scolaires"),
        ("ESERO France", "CNES · éducation au spatial", "https://cnes.fr/education/esero"),
        ("Climate for Schools", "ESA Climate Change Initiative", "https://climate.esa.int/en/educate/climate-for-schools/"),
    ]),
    ("Crédits des images", [
        ("Images et médias de la NASA : conditions d’utilisation", "NASA", "https://www.nasa.gov/nasa-brand-center/images-and-media/"),
        ("scikit-image : jeu d’images d’exemple", "Photographie de la Lune (auteur et date non documentés)", "https://scikit-image.org/"),
        ("DVIDS", "Photographie du lancement de DSCOVR (2015)", "https://www.dvidshub.net/"),
    ]),
]


def page_sources():
    h = [head("Sources", 0), nav(0, "sources.html")]
    h.append('<main class="page page-sub"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> <span>›</span> '
             '<span aria-current="page">Sources</span></nav><div class="page-heading"><p class="kicker">BIBLIOGRAPHIE</p><h1>Sources et références</h1>'
             '<p>Les textes officiels, données et images réellement utilisés sur le site. Les schémas et simulateurs ont été créés pour ASTROTECH ; '
             'les données fictives sont signalées comme telles dans les séances.</p></div>')
    for titre, items in SOURCES:
        cartes = "".join('<a class="source-card" href="%s" target="_blank" rel="noopener"><b>%s</b><small>%s</small><span>Consulter ↗</span></a>' % (a(u), t(n), t(d)) for n, d, u in items)
        h.append('<section><div class="section-head"><div><h2>%s</h2></div></div><div class="source-grid">%s</div></section>' % (t(titre), cartes))
    h.append('</main>')
    h.append(footer(0))
    ecrire("sources.html", "".join(h))


# ---------------------------------------------------------------- pages simples (en-tête et pied de page)
def harmoniser(chemin_rel, prof):
    """Remplace polices Google, navigation et pied de page des pages non générées."""
    chemin = os.path.join(SITE, chemin_rel)
    s = open(chemin, encoding="utf-8").read()
    p = "../" * prof
    s = s.replace('<link rel="preconnect" href="https://fonts.googleapis.com">', '')
    s = re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com/[^"]*">', '<link rel="stylesheet" href="%sassets/fonts.css">' % p, s)
    s = re.sub(r'<nav id="primary-nav" class="navlinks"[^>]*>.*?</nav>', re.search(r'<nav id="primary-nav".*?</nav>', nav(prof)).group(0), s, flags=re.S)
    s = re.sub(r'<footer>.*</html>', footer(prof), s, flags=re.S)
    open(chemin, "w", encoding="utf-8").write(s)


def main():
    for niv in NIVEAUX:
        for s in niv["seances"]:
            page_activite(niv, s)
        page_niveau(niv)
    page_connaissances()
    page_enseignants()
    page_accueil()
    page_activites()
    page_atlas()
    page_ressources()
    page_sources()
    for rel, prof in [("outils.html", 0), ("depot.html", 0)] + [("outils/%s.html" % k, 1) for k in OUTILS]:
        harmoniser(rel, prof)
    print("Pages générées : %d séances, %d niveaux, %d fiches." % (NB_SEANCES, len(NIVEAUX), NB_CARTES))


if __name__ == "__main__":
    main()
