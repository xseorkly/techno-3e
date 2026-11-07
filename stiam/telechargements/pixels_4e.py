"""Codage d'une image classée de 8 x 8 pixels (4e) — même image que sur le site.

Chaque pixel vaut 0 (eau), 1 (végétation) ou 2 (ville).
On le code sur 2 bits : 0 -> 00, 1 -> 01, 2 -> 10.
Chaque ligne de 8 pixels donne 16 bits : elle est envoyée dans un paquet numéroté.
"""

IMAGE = [
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 2, 2, 1],
    [0, 1, 1, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 2, 2, 2, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0]
]
CODES = {0: "00", 1: "01", 2: "10"}
NOMS = {0: "eau", 1: "végétation", 2: "ville"}
PAQUETS_PERDUS = [2, 6]   # paquets non reçus dans l'exemple du site


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
