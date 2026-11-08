# -*- coding: utf-8 -*-
"""Prépare le contenu des documents téléchargeables (dossiers enseignants, livrets élèves,
cadrage général, atlas) à partir des mêmes données que le site.

Étape 1 : python3 _source/documents.py        -> écrit _source/_docs/*.json
Étape 2 : node _source/documents.js           -> écrit les .docx dans telechargements/
Étape 3 : voir README_MISE_EN_LIGNE.md pour la conversion en PDF et la fusion.
"""
import json
import os
import sys

from PIL import Image

ICI = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(ICI)
sys.path.insert(0, ICI)

import build  # noqa: E402
from build import NIVEAUX, typo, carte, deroule, phase_labels, docs_de_seance, avec_essais, lettre, SOURCES, VERSION_DOCS  # noqa: E402
from figures_registre import FIGURES, PHOTOS  # noqa: E402

SORTIE = os.path.join(ICI, "_docs")
MAX_L, MAX_H = 560, 360


# ---------------------------------------------------------------- blocs
def T(s):
    return typo(s) if isinstance(s, str) else s


def p(texte, gras=None, style=None):
    return {"t": "p", "texte": T(texte), "gras": T(gras) if gras else None, "style": style}


def h(niveau, texte):
    return {"t": "h%d" % niveau, "texte": T(texte)}


def puces(items):
    return {"t": "puces", "items": [T(x) for x in items]}


def numeros(items):
    return {"t": "numeros", "items": [T(x) for x in items]}


def tableau(colonnes, lignes, poids=None, entete=True):
    return {"t": "table", "colonnes": [T(c) for c in colonnes], "lignes": [[T(str(x)) for x in l] for l in lignes],
            "poids": poids or [1] * len(colonnes), "entete": entete}


def encadre(titre, textes, couleur="EAF3F7"):
    return {"t": "encadre", "titre": T(titre), "textes": [T(x) for x in textes], "couleur": couleur}


def code(texte, titre="Programme"):
    return {"t": "code", "titre": T(titre), "lignes": texte.split("\n")}


def lignes(n=3):
    return {"t": "lignes", "n": n}


def saut():
    return {"t": "saut"}


def image(chemin_rel, legende=None, max_l=MAX_L, max_h=MAX_H):
    chemin = os.path.join(SITE, chemin_rel)
    w, hh = Image.open(chemin).size
    k = min(max_l / w, max_h / hh, 1.0)
    return {"t": "image", "chemin": chemin, "l": round(w * k), "h": round(hh * k), "legende": T(legende) if legende else None,
            "type": "jpg" if chemin.lower().endswith((".jpg", ".jpeg")) else "png"}


def figure(nom, max_h=MAX_H):
    if not nom:
        return None
    if nom in FIGURES:
        f = FIGURES[nom]
        return image("assets/figures/" + nom, f["legende"], max_h=max_h)
    if nom in PHOTOS:
        f = PHOTOS[nom]
        return image("assets/photos/" + nom, f["legende"], max_h=max_h)
    raise KeyError(nom)


def visuel(v):
    if not v:
        return None
    return figure(v.split(":", 1)[1], max_h=300)


def doc(fichier, titre, entete, blocs):
    blocs = [b for b in blocs if b]
    with open(os.path.join(SORTIE, fichier + ".json"), "w", encoding="utf-8") as f:
        json.dump({"fichier": fichier, "titre": T(titre), "entete": T(entete), "blocs": blocs}, f, ensure_ascii=False)


def couverture(niv, type_doc):
    return [
        {"t": "titre", "texte": T("%s · %s" % (type_doc, niv["label"]))},
        {"t": "soustitre", "texte": T(niv["titre"])},
        p(niv["sous_titre"], style="intro"),
        encadre("Question du parcours", [niv["question"]]),
        image("assets/figures/" + niv["image"], None, max_h=300),
        p("%s · %d séances de %d minutes" % (niv["discipline"], len(niv["seances"]), niv["duree"]), style="discret"),
        p("ASTROTECH · Astronomie et technologies, du CM1 à la 3e · Fehmi KLABI, Lycée français de Vienne · version %s" % VERSION_DOCS, style="discret"),
        saut(),
    ]


# ---------------------------------------------------------------- livret élève
def livret(niv):
    L = niv["label"]
    b = couverture(niv, "Livret élève")
    b += [h(1, "Mon identité"),
          tableau(["Nom", "Prénom", "Classe", "Groupe"], [["", "", "", ""]], entete=True),
          h(1, "Ma mission"), p(niv["mission"]["situation"]), p(niv["mission"]["mission"], gras="Mission : "),
          p("Contraintes à respecter :", style="gras"), puces(niv["mission"]["contraintes"]),
          p(niv["mission"]["production"], gras="Ce que nous produirons : "),
          h(1, "Les séances"),
          tableau(["N°", "Question de la séance", "Je réussis si…"], [[s["n"], s["titre"], s["reussite"]] for s in niv["seances"]], [1, 7, 9]),
          p("Règle d'or : on ne regarde jamais le Soleil directement, ni à travers un objet (lunettes de soleil, loupe, jumelles, appareil photo).", style="alerte"),
          saut()]
    for s in niv["seances"]:
        labels = phase_labels(s)
        b += [h(1, "Séance %d · %s" % (s["n"], s["titre"])),
              p(s["but"], gras="Objectif : "), p(s["reussite"], gras="Je réussis si : "),
              p(" · ".join("%s %d min" % (lab, d) for lab, d in zip(labels, s["phases"])), style="discret")]
        si = s["situation"]
        b += [h(2, "1. Je m'interroge"), p(si["texte"]), encadre("Question", [si["question"]]), visuel(si.get("visuel")),
              p("Mon hypothèse (je pense que… parce que…) :", style="gras"), lignes(3)]
        e = s["enquete"]
        b += [h(2, "2. %s : %s" % (e.get("court", "Enquêter"), e["titre"])), p(e["consigne"])]
        if e.get("etapes"):
            b.append(numeros(e["etapes"]))
        b.append(figure(e.get("figure")))
        if e.get("code"):
            b.append(code(e["code"]))
        d = e.get("donnees")
        if d:
            b += [p(d["titre"], style="gras"), tableau(d["colonnes"], d["lignes"])]
            if d.get("note"):
                b.append(p(d["note"], style="discret"))
        for dc in docs_de_seance(niv, s["n"]):
            b.append(encadre("Document à consulter : %s (%s)" % (dc["titre"], dc["source"]), [dc["url"], dc["question"]], "FFF6E0"))
        b.append(p("Je réponds en citant une observation ou une donnée :", style="gras"))
        for i, (q, _r) in enumerate(e["questions"], 1):
            b += [p("%d. %s" % (i, q)), lignes(2)]
        r = s["retenir"]
        b.append(h(2, "3. Je retiens"))
        if r.get("carte"):
            c = carte(niv, r["carte"])
            b += [encadre("Trace écrite", [c["trace"]], "E3F1EF"), p(c["vocabulaire"], gras="Mots-clés : "), figure(c["figure"], max_h=300)]
        else:
            b += [encadre("Trace écrite", [r["texte"]], "E3F1EF"), figure(r.get("figure"), max_h=300)]
        b.append(figure(r.get("figure2"), max_h=300))
        g = s["agir"]
        b += [h(2, "4. J'agis : %s" % g["titre"]), p(g["consigne"])]
        if g.get("etapes"):
            b.append(numeros(g["etapes"]))
        b += [p(g["production"], gras="Ce que je dois produire : "), p(g["materiel"], gras="Matériel : ")]
        if g.get("aide"):
            b.append(p(g["aide"], gras="Coup de pouce : ", style="discret"))
        if g.get("code"):
            b.append(code(g["code"]))
        if avec_essais(s):
            b += [p("Mon carnet d'essais", style="gras"),
                  tableau(["Essai", "Ce que je teste", "Résultat (avec l'unité)", "Décision"], [[k, "", "", ""] for k in range(1, 4)], [1, 4, 4, 4])]
        if g.get("outil"):
            b.append(p("Simulateur en ligne : %s (page « Simulations » du site)." % g["outil"][1], style="discret"))
        b += [p("Ma production :", style="gras"), lignes(4)]
        b.append(h(2, "5. Je fais le bilan"))
        for j, (q, opts, _rep, _fb) in enumerate(s["qcm"], 1):
            b.append(p("Q%d. %s" % (j, q), style="gras"))
            b.append({"t": "choix", "items": [T("%s · %s" % (lettre(k), o)) for k, o in enumerate(opts)]})
        b += [p("Ma synthèse : ce que j'ai appris et ce qui le prouve", style="gras"), lignes(3),
              p("Mon niveau de maîtrise :", style="gras"),
              {"t": "choix", "items": ["N1 · Je découvre les notions.", "N2 · Je sais les expliquer avec une aide.",
                                       "N3 · Je les utilise seul.", "N4 · Je les justifie et je repère les limites."]},
              saut()]
    doc("%s_Livret_eleve_%s" % (L, VERSION_DOCS), "Livret élève %s" % L, "ASTROTECH · %s · Livret élève" % L, b)


# ---------------------------------------------------------------- dossier enseignant
def dossier(niv):
    L = niv["label"]
    pr = niv["programme"]
    m = niv["mission"]
    ev = niv["evaluation"]
    b = couverture(niv, "Dossier enseignant")
    b += [h(1, "Programme"), p(pr["statut"], gras=pr["texte"] + ". "), p("Intitulés visés :", style="gras"), puces(pr["attendus"])]
    if pr.get("hors"):
        b += [p("Périmètre et anticipation :", style="gras"), puces(pr["hors"])]
    if pr.get("nouveau"):
        nv = pr["nouveau"]
        b += [h(2, "Nouveau programme (rentrée 2027)"), p(nv["statut"], gras=nv["texte"] + ". "),
              tableau(["Domaine et sous-thème", "Objectif (texte officiel)", "Dans le parcours"], nv["attendus"], [5, 7, 4])]
    b += [h(1, "Compétences travaillées"), puces(niv["competences"]),
          h(1, "Interdisciplinarité"), tableau(["Discipline", "Lien", "Séances"], niv["interdisciplinarite"], [3, 8, 2]),
          h(1, "Mission"), p(m["situation"]), p(m["mission"], gras="Mission : "), p("Contraintes :", style="gras"), puces(m["contraintes"]),
          p(m["production"], gras="Production : "), p("Critères de validation :", style="gras"), puces(m["validation"]),
          p(niv["calendrier"], gras="Calendrier : "),
          h(1, "Déroulé (%d min par séance)" % niv["duree"]),
          tableau(["N°", "Séance", "Objectif", "Phases et durées", "Critère de réussite"],
                  [[s["n"], s["titre"], s["objectif"], deroule(s), s["reussite"]] for s in niv["seances"]], [1, 5, 6, 5, 6]),
          h(1, "Évaluation"), p(ev["tache"]),
          tableau(["Critère", "Insuffisante", "Fragile", "Satisfaisante", "Très bonne"], ev["criteres"], [4, 4, 4, 4, 4]),
          h(1, "Vigilance scientifique et pédagogique"), puces(niv["vigilance"]),
          h(1, "Documents authentiques"),
          tableau(["Séance", "Document", "Question posée", "Corrigé"],
                  [[d["seance"], "%s (%s) — %s" % (d["titre"], d["source"], d["url"]), d["question"], d["corrige"]] for d in niv["documents"]], [1, 5, 5, 6]),
          p("Sécurité : ne jamais observer directement le Soleil ; basse tension uniquement ; outils coupants sous surveillance. "
            "Les données fictives sont signalées comme telles et remplacées dès que possible par les mesures des élèves.", style="alerte"),
          saut()]
    for s in niv["seances"]:
        e, g, r = s["enquete"], s["agir"], s["retenir"]
        b += [h(1, "Séance %d · %s" % (s["n"], s["titre"])), p(s["objectif"], gras="Objectif : ")]
        if s.get("programme"):
            b.append(p(s["programme"], gras="Programme : "))
        labels = phase_labels(s)
        resume = ["%s %s" % (s["situation"]["texte"], s["situation"]["question"]),
                  e["consigne"], "Trace écrite (voir ci-dessous).", "%s : %s" % (g["titre"], g["consigne"]), "QCM, synthèse et auto-évaluation N1 à N4."]
        b.append(tableau(["Phase", "Durée", "Ce que font les élèves"], [[lab, "%d min" % d, x] for lab, d, x in zip(labels, s["phases"], resume)], [3, 2, 12]))
        b.append(p(s["reussite"], gras="Critère de réussite : "))
        b.append(h(2, "Réponses attendues de l'enquête"))
        b.append(tableau(["Question", "Réponse attendue"], e["questions"], [1, 1]))
        if e.get("code"):
            b.append(code(e["code"], "Programme fourni aux élèves"))
        trace = carte(niv, r["carte"])["trace"] if r.get("carte") else r["texte"]
        b += [h(2, "Trace écrite"), encadre("Trace écrite", [trace], "E3F1EF"),
              h(2, "Production attendue"), p(g["attendu"]), p(g["materiel"], gras="Matériel : ")]
        if g.get("code_attendu"):
            b.append(code(g["code_attendu"], "Programme attendu"))
        b += [h(2, "QCM"), tableau(["Question", "Réponse", "Explication"],
                                   [[q, "%s · %s" % (lettre(rep), opts[rep]), fb] for q, opts, rep, fb in s["qcm"]], [5, 3, 6])]
        for d in docs_de_seance(niv, s["n"]):
            b.append(p(d["corrige"], gras="Document « %s » : " % d["titre"]))
        b.append(p(s["vigilance"], gras="Point de vigilance : ", style="alerte"))
    b += [saut(), h(1, "Fiches de connaissances")]
    for c in niv["cartes"]:
        b += [h(2, c["question"]), p(c["accroche"], style="intro"), figure(c["figure"], max_h=300), p(c["explication"]),
              p(c["experience"], gras="Expérience ou activité : "), p(c["vocabulaire"], gras="Vocabulaire : "),
              p(c["conception"], gras="Idée fausse fréquente : "), encadre("Trace écrite", [c["trace"]], "E3F1EF"),
              p(c["preuve"]["donnees"], gras="Données : "), p(c["preuve"]["interpretation"], gras="Ce qu'elles montrent : "),
              tableau(["Je vérifie", "Réponse"], c["verif"], [1, 1])]
    doc("%s_Dossier_enseignant_%s" % (L, VERSION_DOCS), "Dossier enseignant %s" % L, "ASTROTECH · %s · Dossier enseignant" % L, b)


# ---------------------------------------------------------------- cadrage général
def cadrage():
    b = [{"t": "titre", "texte": "Cadrage général"},
         {"t": "soustitre", "texte": T("ASTROTECH · Astronomie et technologies, du CM1 à la 3e")},
         p("Un parcours interdisciplinaire sciences et technologie, de l'observation de l'ombre d'un bâton au CM1 jusqu'au rover autonome en 3e. "
           "Ce document présente l'organisation d'ensemble ; le détail de chaque niveau se trouve dans les dossiers enseignants.", style="intro"),
         image("assets/figures/3e_parcours.png", None, max_h=260),
         p("Fehmi KLABI · Professeur de technologie · Formateur · Lycée français de Vienne · version %s" % VERSION_DOCS, style="discret"),
         saut(),
         h(1, "Le parcours en un tableau"),
         tableau(["Niveau", "Discipline", "Question du parcours", "Séances"],
                 [[n["label"], n["discipline"], n["question"], "%d × %d min" % (len(n["seances"]), n["duree"])] for n in NIVEAUX], [2, 4, 9, 3]),
         h(1, "Textes officiels de référence")]
    b.append(tableau(["Niveau", "Texte", "Statut en 2026-2027"], [[n["label"], n["programme"]["texte"], n["programme"]["statut"]] for n in NIVEAUX], [2, 8, 7]))
    b += [p("Calendrier de la réforme du cycle 3 : le programme publié au BO n° 24 du 11 juin 2026 s'applique au CM1 à la rentrée 2026, "
            "puis au CM2 et en 6e à la rentrée 2027. En 2026-2027, le CM2 et la 6e suivent encore le programme de 2023. "
            "Les dossiers CM2 et 6e signalent ce qui changera en 2027-2028.", style="alerte"),
          h(1, "Une progression du CM1 à la 3e")]
    b.append(tableau(["Niveau", "Mission", "Notions construites"],
                     [[n["label"], n["mission"]["titre"], " ; ".join(c["question"] for c in n["cartes"])] for n in NIVEAUX], [2, 7, 9]))
    b += [h(1, "La structure commune des séances"),
          p("Toutes les séances suivent les mêmes cinq étapes, avec des durées qui totalisent 45 minutes à l'école et 55 minutes au collège :"),
          numeros(["Je m'interroge : une situation et une question ; chaque élève écrit une hypothèse.",
                   "J'enquête : expérience, mesures, documents ou programme ; les questions demandent de citer une observation ou une donnée.",
                   "Je retiens : une trace écrite courte, les mots-clés et un schéma.",
                   "J'agis : une étape du projet (fabrication, programmation, essai, communication) avec une production précise.",
                   "Je fais le bilan : deux QCM avec explication, une synthèse et une auto-évaluation sur quatre niveaux (N1 à N4)."]),
          p("Chaque séance indique son objectif et son critère de réussite. Sa correction (réponses attendues, production attendue, programme attendu, "
            "réponses des QCM, corrigé des documents) figure, repliée, en bas de la page de la séance et dans le dossier enseignant. "
            "Elle est construite à partir des mêmes données que la séance : elle ne peut pas la contredire."),
          h(1, "Évaluation"),
          p("Chaque niveau dispose d'une tâche finale et d'une grille à quatre niveaux de maîtrise : insuffisante, fragile, satisfaisante, très bonne. "
            "On évalue séparément les connaissances, le raisonnement, la réalisation technique et la qualité de la preuve."),
          h(1, "Sécurité"),
          puces(["Ne jamais observer directement le Soleil, ni à travers un objet (lunettes de soleil, loupe, jumelles, appareil photo).",
                 "Basse tension uniquement (piles, cartes micro:bit) ; vérifier la compatibilité 3 V / 5 V des capteurs.",
                 "Outils coupants et pistolet à colle sous la surveillance de l'adulte."]),
          h(1, "Données et simulations"),
          puces(["Les données d'exemple sont toujours signalées ; elles sont remplacées dès que possible par les mesures des élèves.",
                 "Les valeurs astronomiques (ombres, durées du jour, hauteur du Soleil) sont calculées pour Vienne (48° N) avec l'algorithme de la NOAA.",
                 "Les simulateurs du site illustrent un principe ; ils ne remplacent ni l'observation ni la mesure réelle."]),
          h(1, "Utiliser le site"),
          puces(["Aucun compte : les réponses sont enregistrées dans le navigateur de l'appareil utilisé ; elles peuvent être exportées ou imprimées en PDF.",
                 "Sur un poste partagé, l'élève efface ses réponses et son nom à la fin de la séance (boutons en bas de page).",
                 "Les corrections sont repliées en bas de chaque séance, sans mot de passe : le site étant public, elles sont accessibles à tous."]),
          h(1, "Sources")]
    for titre, items in SOURCES:
        b += [h(2, titre), puces(["%s — %s — %s" % (n, d, u) for n, d, u in items])]
    doc("00_Cadrage_general_%s" % VERSION_DOCS, "Cadrage général", "ASTROTECH · Cadrage général", b)


# ---------------------------------------------------------------- atlas
def atlas():
    b = [{"t": "titre", "texte": "Atlas des figures"},
         {"t": "soustitre", "texte": T("ASTROTECH · Schémas et photographies du parcours")},
         p("Les schémas ont été créés pour le parcours. Ce sont des modèles : ils ne respectent pas les échelles, sauf mention contraire. "
           "Les photographies sont créditées dans leur légende.", style="intro"), saut()]
    for niv in NIVEAUX:
        b.append(h(1, niv["label"]))
        for nom, f in FIGURES.items():
            if f["niveau"] == niv["id"]:
                b += [h(2, f["titre"]), image("assets/figures/" + nom, f["legende"], max_h=330)]
    b.append(h(1, "Photographies"))
    for nom, f in PHOTOS.items():
        b += [h(2, f["titre"]), image("assets/photos/" + nom, f["legende"], max_h=330)]
    doc("Atlas_images_scientifiques_%s" % VERSION_DOCS, "Atlas des figures", "ASTROTECH · Atlas des figures", b)


def main():
    os.makedirs(SORTIE, exist_ok=True)
    for f in os.listdir(SORTIE):
        os.remove(os.path.join(SORTIE, f))
    for niv in NIVEAUX:
        livret(niv)
        dossier(niv)
    cadrage()
    atlas()
    print("Modèles de documents écrits dans", SORTIE)


if __name__ == "__main__":
    main()
