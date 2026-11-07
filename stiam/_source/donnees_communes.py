# -*- coding: utf-8 -*-
"""Données partagées par plusieurs fichiers (figures, scripts, simulateurs, contenus)."""

# Image de 8 x 8 pixels du parcours 4e : 0 = eau, 1 = végétation, 2 = ville
IMAGE_4E = [
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 2, 2, 1],
    [0, 1, 1, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 2, 2, 2, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0],
]
CODES_4E = {0: "00", 1: "01", 2: "10"}
IMAGE_LIGNES_BITS = ["".join(CODES_4E[v] for v in ligne) for ligne in IMAGE_4E]
PAQUETS_PERDUS_4E = [2, 6]          # lignes manquantes dans l'essai de référence

# Relevés fictifs de la 6e (même jeu partout : texte, CSV, graphique)
HEURES_6E = ["9 h", "11 h", "13 h", "15 h", "17 h"]
AIR_ABRITE_6E = [14, 18, 20, 19, 16]
CAPTEUR_SOLEIL_6E = [15, 25, 30, 26, 18]

# Distances moyennes au Soleil (UA), source NASA
DISTANCES_UA = [("Mercure", 0.39), ("Vénus", 0.72), ("Terre", 1.00), ("Mars", 1.52),
                ("Jupiter", 5.20), ("Saturne", 9.58), ("Uranus", 19.2), ("Neptune", 30.05)]
ECHELLE_CM2 = 2.0   # mètres par UA

# Délais Terre-Mars (exemples de calcul)
DISTANCES_MARS_MKM = [75, 150, 225, 300]
VITESSE_LUMIERE_KMS = 300000
