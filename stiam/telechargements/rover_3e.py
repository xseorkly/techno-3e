"""Campagne d'essais simulée du rover (3e) — même modèle que le simulateur du site.

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
