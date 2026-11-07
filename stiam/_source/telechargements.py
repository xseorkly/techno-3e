"""Génère les fichiers de données et les programmes Python téléchargeables
à partir des mêmes données que le site (donnees_communes.py).
Usage : python3 _source/telechargements.py
"""
import os
from donnees_communes import (IMAGE_4E, CODES_4E, IMAGE_LIGNES_BITS, PAQUETS_PERDUS_4E,
                              HEURES_6E, AIR_ABRITE_6E, CAPTEUR_SOLEIL_6E)

ICI = os.path.dirname(os.path.abspath(__file__))
DL = os.path.join(os.path.dirname(ICI), "telechargements")


def ecrire(nom, texte):
    with open(os.path.join(DL, nom), "w", encoding="utf-8", newline="\n") as f:
        f.write(texte)


# ---------- 6e : relevés de température (données d'exemple) ----------
lignes = ["heure;air_abrite_C;capteur_au_soleil_C;origine"]
for h, a, c in zip(HEURES_6E, AIR_ABRITE_6E, CAPTEUR_SOLEIL_6E):
    hh = int(h.split()[0])
    lignes.append("%02d:00;%d;%d;exemple_pedagogique" % (hh, a, c))
ecrire("mesures_6e.csv", "\n".join(lignes) + "\n")

# ---------- 4e : paquets de l'image ----------
lignes = ["paquet;ligne_image;recu;donnees_16_bits"]
for n, bits in enumerate(IMAGE_LIGNES_BITS):
    recu = n not in PAQUETS_PERDUS_4E
    lignes.append("%d;%d;%s;%s" % (n, n, "oui" if recu else "non", bits if recu else ""))
ecrire("paquets_4e.csv", "\n".join(lignes) + "\n")

# ---------- 4e : codage de l'image (Python) ----------
image_txt = ",\n".join("    %s" % ligne for ligne in IMAGE_4E)
pixels = '''"""Codage d'une image classée de 8 x 8 pixels (4e) — même image que sur le site.

Chaque pixel vaut 0 (eau), 1 (végétation) ou 2 (ville).
On le code sur 2 bits : 0 -> 00, 1 -> 01, 2 -> 10.
Chaque ligne de 8 pixels donne 16 bits : elle est envoyée dans un paquet numéroté.
"""

IMAGE = [
%s
]
CODES = {0: "00", 1: "01", 2: "10"}
NOMS = {0: "eau", 1: "végétation", 2: "ville"}
PAQUETS_PERDUS = %r   # paquets non reçus dans l'exemple du site


def coder_ligne(ligne):
    """Transforme une ligne de 8 pixels en une chaîne de 16 bits."""
    return "".join(CODES[p] for p in ligne)


def decoder_ligne(bits):
    """Transforme 16 bits en 8 valeurs de pixels."""
    inverse = {v: k for k, v in CODES.items()}
    return [inverse[bits[i:i + 2]] for i in range(0, 16, 2)]


if __name__ == "__main__":
    nb_pixels = sum(len(ligne) for ligne in IMAGE)
    print("Nombre de pixels :", nb_pixels)              # 64
    print("Données brutes :", nb_pixels * 2, "bits")    # 128
    print()
    print("Paquets envoyés (numéro:bits) :")
    paquets = []
    for n, ligne in enumerate(IMAGE):
        message = str(n) + ":" + coder_ligne(ligne)
        paquets.append(message)
        print("  " + message)
    print()
    recus = [p for n, p in enumerate(paquets) if n not in PAQUETS_PERDUS]
    print("Paquets reçus :", len(recus), "sur", len(paquets))
    manquants = [n for n in range(8) if n not in [int(p.split(":")[0]) for p in recus]]
    print("La station redemande les lignes :", manquants)
    # Vérification : le décodage redonne bien l'image de départ.
    assert all(decoder_ligne(coder_ligne(l)) == l for l in IMAGE)
    print("Décodage vérifié : l'image reconstruite est identique.")
''' % (image_txt, PAQUETS_PERDUS_4E)
ecrire("pixels_4e.py", pixels)

# ---------- 3e : campagne d'essais simulée (Python) ----------
rover = '''"""Campagne d'essais simulée du rover (3e) — même modèle que le simulateur du site.

Ce programme ne pilote pas un robot : il reproduit, sur ordinateur, le raisonnement
« je mesure une distance, je la compare au seuil, je décide ».
Modifie SEUIL_CM, VITESSE_CM_S ou CAPTEUR_ABAISSE puis relance le programme.
"""

SEUIL_CM = 15          # le rover contourne quand la distance mesurée est inférieure au seuil
VITESSE_CM_S = 15      # vitesse d'avance
CAPTEUR_ABAISSE = False  # True : le capteur détecte aussi les obstacles bas

TEMPS_REACTION_S = 0.1       # durée entre la mesure et le début du freinage
DECELERATION_CM_S2 = 80      # freinage

# Écarts de mesure fixés (en cm) pour que tout le monde obtienne les mêmes résultats.
BRUIT = [0.4, -2, 1.1, -0.7, 1.8, -1.4, 0.2, -1.9, 0.9, 1.5,
         -0.3, 2, -1.1, 0.6, -1.7, 1.2, -0.5, 0.8, -2, 1.6]
PARCOURS = ["Obstacles hauts espacés", "Obstacle bas", "Couloir étroit (25 cm)", "Angle fermé"]
LARGEUR_ANGLE_CM = [30, 32, 14, 30, 31]   # place disponible dans l'angle fermé, essai par essai


def distance_arret(seuil, vitesse):
    """Distance à l'obstacle quand le rover s'est arrêté."""
    pendant_reaction = vitesse * TEMPS_REACTION_S
    freinage = vitesse ** 2 / (2 * DECELERATION_CM_S2)
    return seuil - pendant_reaction - freinage


def essai(parcours, numero, seuil, vitesse, capteur_abaisse):
    """Renvoie (résultat, distance minimale en cm)."""
    d = max(0, distance_arret(seuil, vitesse) + BRUIT[parcours * 5 + numero])
    if parcours == 1 and not capteur_abaisse and numero in (1, 3):
        d = 0                                   # l'obstacle bas passe sous le faisceau
    if parcours == 2 and seuil > 25:
        return "blocage", None                  # le couloir paraît trop étroit
    if parcours == 3 and seuil > LARGEUR_ANGLE_CM[numero]:
        return "blocage", None
    if d < 2:
        return "contact", 0
    return "réussite", d


if __name__ == "__main__":
    reussites, d_min = 0, float("inf")
    for p, nom in enumerate(PARCOURS):
        resultats = []
        for e in range(5):
            res, d = essai(p, e, SEUIL_CM, VITESSE_CM_S, CAPTEUR_ABAISSE)
            if res == "réussite":
                reussites += 1
            if d is not None:
                d_min = min(d_min, d)
            resultats.append(res if d is None or res != "réussite" else "%.0f cm" % d)
        print("%-26s %s" % (nom, " | ".join(resultats)))
    taux = reussites / 20 * 100
    print()
    print("Réussites : %d/20 (%.0f %%)" % (reussites, taux))
    print("Distance minimale relevée : %.0f cm" % d_min)
    valide = taux >= 80 and d_min >= 10
    print("Exigences : au moins 80 %% de réussite et distance minimale d'au moins 10 cm -> %s"
          % ("rover validé" if valide else "rover non validé"))
'''
ecrire("rover_3e.py", rover)
print("Fichiers téléchargeables régénérés.")
