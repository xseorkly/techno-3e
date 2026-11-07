# -*- coding: utf-8 -*-
"""Dessin des figures corrigées ou nouvelles. Usage : python3 _source/figures.py"""
import math
import os
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
from matplotlib.patches import Circle, Wedge, Rectangle, FancyBboxPatch, Polygon, Ellipse, FancyArrowPatch, Arc  # noqa: E402

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)
from donnees_communes import IMAGE_4E, HEURES_6E, AIR_ABRITE_6E, CAPTEUR_SOLEIL_6E, DISTANCES_UA, ECHELLE_CM2  # noqa: E402

OUT = os.path.join(os.path.dirname(ICI), "assets", "figures")
NAVY, SUN, RUST, GREY, TEAL, BLUE, PALE = "#20354e", "#efb64b", "#ca694e", "#65778c", "#12877f", "#326f9e", "#eaf3f7"
plt.rcParams["font.family"] = "DejaVu Sans"


def canvas(w=1186, h=560):
    fig = plt.figure(figsize=(w / 100, h / 100), dpi=100)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, w)
    ax.set_ylim(h, 0)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def titre(ax, txt, sous=None, w=1186):
    ax.text(w / 2, 45, txt, ha="center", va="center", fontsize=21, fontweight="bold", color=NAVY)
    if sous:
        ax.text(w / 2, 88, sous, ha="center", va="center", fontsize=14, color=GREY)


def fleche(ax, x1, y1, x2, y2, color=SUN, lw=3, style="-|>", ms=18, ls="-"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style, mutation_scale=ms, color=color, lw=lw, linestyle=ls))


def save(fig, nom):
    fig.savefig(os.path.join(OUT, nom), dpi=100, facecolor="white")
    plt.close(fig)
    print("figure", nom)


# ------------------------------------------------------------------ CM1
def cm1_source_eclairee():
    fig, ax = canvas()
    titre(ax, "Source de lumière et objet éclairé", "La lumière part de la source, éclaire l’objet, puis une partie revient vers l’œil.")
    ax.add_patch(Circle((170, 300), 48, color=SUN))
    for dy in (-30, 0, 30):
        fleche(ax, 230, 300 + dy, 505, 300 + dy)
    cx, cy, r = 640, 300, 95
    ax.add_patch(Circle((cx, cy), r, color="#3d4f66"))
    ax.add_patch(Wedge((cx, cy), r, 90, 270, color="#fbe7b5"))
    ax.add_patch(Circle((cx, cy), r, fill=False, ec=NAVY, lw=2))
    fleche(ax, 560, 360, 390, 470, color=SUN)
    ax.add_patch(Ellipse((350, 490), 70, 38, fc="white", ec=NAVY, lw=2.5))
    ax.add_patch(Circle((350, 490), 11, color=NAVY))
    ax.text(170, 380, "source de lumière\n(la lampe, le Soleil)", ha="center", va="top", fontsize=14, color=NAVY)
    ax.text(640, 185, "objet éclairé (la balle, la Lune)", ha="center", va="bottom", fontsize=14, color=NAVY)
    ax.text(598, 300, "moitié\néclairée", ha="center", va="center", fontsize=12, color=NAVY)
    ax.text(700, 300, "moitié\nsombre", ha="center", va="center", fontsize=12, color="white")
    ax.text(420, 490, "œil", ha="left", va="center", fontsize=14, color=NAVY)
    ax.text(900, 300, "Sans source, aucune lumière\nne part de la balle vers l’œil :\non ne la voit pas.", ha="left", va="center", fontsize=13, color=GREY)
    save(fig, "cm1_source_eclairee.png")


def cm1_ombre():
    fig, ax = canvas()
    titre(ax, "L’ombre portée est toujours opposée à la source", "Plus la source est haute, plus l’ombre est courte.")
    sol = 430
    ax.plot([60, 1126], [sol, sol], color=NAVY, lw=3)
    H = 130
    cas = [(220, 30, -1, "source basse à gauche :\nombre longue à droite"),
           (593, 65, -1, "source haute (à Vienne, jamais\nplus de 65°) : ombre courte"),
           (966, 30, 1, "source basse à droite :\nombre longue à gauche")]
    for x0, elev, cote, lab in cas:
        L = H / math.tan(math.radians(elev))
        tip = x0 - cote * L
        dx, dy = x0 - tip, -H
        n = math.hypot(dx, dy)
        sx, sy = x0 + dx / n * 150, sol - H + dy / n * 150
        ax.add_patch(Circle((sx, sy), 26, color=SUN))
        fleche(ax, sx, sy, x0, sol - H, color=SUN, lw=2.5)
        ax.plot([x0, tip], [sol - H, sol], color=SUN, lw=2, ls="--")
        ax.plot([x0, tip], [sol, sol], color=RUST, lw=10, solid_capstyle="round")
        ax.add_patch(Rectangle((x0 - 6, sol - H), 12, H, color=NAVY))
        ax.text(x0, sol + 50, lab, ha="center", va="top", fontsize=13, color=NAVY)
    save(fig, "cm1_ombre.png")


def cm1_protocole():
    fig, ax = canvas()
    titre(ax, "Vue de dessus : l’ombre d’un bâton tourne pendant la journée", "Vienne, 23 septembre, bâton de 20 cm, heure d’été (valeurs calculées)")
    cx, cy, k = 593, 360, 5.2
    for lab, ang in (("N", 0), ("E", 90), ("S", 180), ("O", 270)):
        x, y = cx + 245 * math.sin(math.radians(ang)), cy - 245 * math.cos(math.radians(ang))
        if lab == "S":
            y = cy + 175
        ax.text(x, y, lab, ha="center", va="center", fontsize=18, fontweight="bold", color=GREY)
    releves = [("9 h 45", 306.3, 38), ("12 h 45", 359.4, 23), ("15 h 45", 52.7, 37)]
    for h, az, L in releves:
        r = math.radians(az)
        x2, y2 = cx + L * k * math.sin(r), cy - L * k * math.cos(r)
        ax.plot([cx, x2], [cy, y2], color=RUST, lw=9, solid_capstyle="round")
        ha = "right" if math.sin(r) < -0.3 else ("left" if math.sin(r) > 0.3 else "center")
        ax.text(x2 + 18 * math.sin(r), y2 - 26 * math.cos(r), "%s · %d cm" % (h, L), ha=ha, va="center", fontsize=14, color=NAVY, fontweight="bold")
        rs = math.radians(az + 180)
        sx, sy = cx + 140 * math.sin(rs), cy - 140 * math.cos(rs)
        ax.add_patch(Circle((sx, sy), 13, color=SUN, alpha=0.85))
        if abs(math.sin(rs)) > 0.2:
            ax.text(sx + 20 * math.sin(rs), sy + 4, h, ha="left" if math.sin(rs) > 0 else "right", va="center", fontsize=11, color=GREY)
        else:
            ax.text(sx + 22, sy + 2, h, ha="left", va="center", fontsize=11, color=GREY)
    ax.add_patch(Circle((cx, cy), 9, color=NAVY))
    ax.text(cx + 18, cy + 8, "bâton", ha="left", va="top", fontsize=12, color=NAVY)
    ax.text(1150, 520, "● Soleil : position à l’heure du relevé\n▬ ombre (longueur à l’échelle)", ha="right", va="bottom", fontsize=12, color=GREY)
    save(fig, "cm1_protocole.png")


def disque_phase(ax, cx, cy, r, f, res=0.6):
    """Disque de la Lune vu depuis l'hémisphère Nord pour la fraction f de lunaison (0 = nouvelle Lune)."""
    alpha = math.pi - 2 * math.pi * f
    n = int(2 * r / res)
    ys, xs = np.mgrid[-1:1:complex(0, n), -1:1:complex(0, n)]
    q = xs ** 2 + ys ** 2
    nz = np.sqrt(np.clip(1 - q, 0, 1))
    ill = xs * math.sin(alpha) + nz * math.cos(alpha)
    img = np.ones((n, n, 4))
    lit = np.array([0.99, 0.92, 0.80, 1])
    dark = np.array([0.16, 0.22, 0.29, 1])
    img[:] = np.where((ill > 0)[..., None], lit, dark)
    img[q > 1] = [1, 1, 1, 0]
    ax.imshow(img, extent=(cx - r, cx + r, cy + r, cy - r), zorder=3)
    ax.add_patch(Circle((cx, cy), r, fill=False, ec=NAVY, lw=1.5, zorder=4))


def cm1_phases():
    fig, ax = canvas()
    titre(ax, "Les phases de la Lune vues depuis l’hémisphère Nord")
    noms = ["Nouvelle Lune", "Premier croissant", "Premier quartier", "Gibbeuse croissante",
            "Pleine Lune", "Gibbeuse décroissante", "Dernier quartier", "Dernier croissant"]
    for i, nom in enumerate(noms):
        col, lig = i % 4, i // 4
        cx, cy = 160 + col * 290, 175 + lig * 190
        disque_phase(ax, cx, cy, 52, i / 8)
        ax.text(cx, cy + 72, nom, ha="center", va="center", fontsize=14, color=NAVY)
    ax.text(593, 530, "Un cycle complet (une lunaison) dure environ 29,5 jours.", ha="center", va="center", fontsize=14, color=GREY)
    save(fig, "cm1_phases.png")


def cm1_geometrie():
    fig, ax = canvas(1186, 720)
    titre(ax, "Pourquoi la Lune change d’aspect", "Vue de dessus, depuis le nord. La moitié tournée vers le Soleil est toujours éclairée. Non à l’échelle.")
    ax.add_patch(Circle((70, 400), 50, color=SUN))
    ax.text(70, 480, "Soleil", ha="center", fontsize=14, color=NAVY)
    for dy in (-150, -60, 30, 120):
        fleche(ax, 135, 410 + dy, 300, 410 + dy, lw=2.2)
    ex, ey, R = 660, 400, 150
    ax.add_patch(Circle((ex, ey), R, fill=False, ec=GREY, lw=1.5, ls="--"))
    ax.add_patch(Circle((ex, ey), 40, color=BLUE))
    ax.text(ex, ey, "Terre", ha="center", va="center", fontsize=12, color="white", fontweight="bold")
    # sens de révolution : inverse des aiguilles d'une montre vu du nord (haut → gauche → bas)
    a1, a2 = math.radians(120), math.radians(150)
    fleche(ax, ex + (R + 25) * math.cos(a1), ey - (R + 25) * math.sin(a1), ex + (R + 25) * math.cos(a2), ey - (R + 25) * math.sin(a2),
           color=NAVY, lw=2, ms=16)
    ax.text(ex + (R + 45) * math.cos(math.radians(135)) - 10, ey - (R + 45) * math.sin(math.radians(135)) - 10, "sens de\nrévolution", ha="right", fontsize=11, color=NAVY)
    positions = [("nouvelle Lune", 180, 0.0), ("premier quartier", 270, 0.25), ("pleine Lune", 0, 0.5), ("dernier quartier", 90, 0.75)]
    for nom, ang, f in positions:
        ra = math.radians(ang)
        mx, my = ex + R * math.cos(ra), ey - R * math.sin(ra)
        ax.add_patch(Circle((mx, my), 22, color="#3d4f66", zorder=3))
        ax.add_patch(Wedge((mx, my), 22, 90, 270, color="#fbe7b5", zorder=4))
        ax.add_patch(Circle((mx, my), 22, fill=False, ec=NAVY, lw=1.5, zorder=5))
        d = R + 105
        ix, iy = ex + d * math.cos(ra), ey - d * math.sin(ra)
        if ang == 180:
            ix, iy = ex - R - 95, ey - 95
        disque_phase(ax, ix, iy, 26, f)
        ax.text(ix, iy + 44, nom, ha="center", va="center", fontsize=12, color=NAVY)
    ax.text(1170, 135, "Petits disques : aspect de la Lune\nvu depuis la Terre (hémisphère Nord)", ha="right", va="top", fontsize=12, color=GREY)
    save(fig, "cm1_geometrie.png")


# ------------------------------------------------------------------ CM2
def cm2_distances():
    fig, ax = canvas()
    titre(ax, "Les huit planètes à l’échelle des distances", "Distances moyennes au Soleil, de 0 à 30 UA. Les tailles ne sont pas représentées.")
    x0, x1, y = 90, 1120, 330
    k = (x1 - x0) / 30.05
    ax.plot([x0, x1], [y, y], color=NAVY, lw=3)
    ax.add_patch(Circle((x0, y), 18, color=SUN, zorder=3))
    ax.text(x0, y + 45, "Soleil", ha="center", fontsize=13, color=NAVY)
    for nom, d in DISTANCES_UA:
        x = x0 + d * k
        ax.add_patch(Circle((x, y), 8, color=TEAL if d < 2 else BLUE, zorder=4))
        if d >= 2:
            ax.text(x, y - 40, "%s\n%s UA" % (nom, ("%g" % d).replace(".", ",")), ha="center", va="bottom", fontsize=13, color=NAVY)
    ax.annotate("Mercure, Vénus, Terre, Mars\nentre 0,39 et 1,52 UA", xy=(x0 + 1.0 * k, y - 10), xytext=(260, 180),
                fontsize=13, color=NAVY, ha="center", arrowprops=dict(arrowstyle="-|>", color=RUST, lw=2))
    for g in range(0, 31, 5):
        ax.plot([x0 + g * k] * 2, [y + 8, y + 18], color=GREY, lw=1.5)
        ax.text(x0 + g * k, y + 70, "%d UA" % g, ha="center", fontsize=11, color=GREY)
    save(fig, "cm2_distances.png")


def cm2_parcours():
    fig, ax = canvas()
    titre(ax, "Le parcours de la cour : 1 UA = 2 m", "Distances mesurées depuis le Soleil. À cette échelle, la Terre mesurerait 0,17 mm.")
    x0, x1, y = 90, 1120, 330
    k = (x1 - x0) / 62
    ax.plot([x0, x1], [y, y], color=NAVY, lw=4)
    ax.add_patch(Circle((x0, y), 16, color=SUN, zorder=3))
    ax.text(x0, y + 40, "Soleil", ha="center", va="top", fontsize=12, color=NAVY)
    for nom, d in DISTANCES_UA:
        m = d * ECHELLE_CM2
        x = x0 + m * k
        ax.add_patch(Circle((x, y), 7, color=TEAL if d < 2 else BLUE, zorder=4))
        if d >= 2:
            ax.text(x, y - 35, "%s\n%s m" % (nom, ("%.2f" % m).replace(".", ",")), ha="center", va="bottom", fontsize=13, color=NAVY)
    ax.annotate("Mercure 0,78 m · Vénus 1,44 m\nTerre 2,00 m · Mars 3,04 m", xy=(x0 + 2 * k, y - 8), xytext=(300, 175),
                fontsize=13, color=NAVY, ha="center", arrowprops=dict(arrowstyle="-|>", color=RUST, lw=2))
    for g in range(0, 61, 10):
        ax.plot([x0 + g * k] * 2, [y + 8, y + 18], color=GREY, lw=1.5)
        ax.text(x0 + g * k, y + 95, "%d m" % g, ha="center", fontsize=11, color=GREY)
    save(fig, "cm2_parcours.png")


# ------------------------------------------------------------------ 6e
def terre_saison(ax, cx, cy, R, soleil_a_droite, nom, legende):
    th = math.radians(23.4)
    nvec = (math.sin(th), -math.cos(th))
    evec = (math.cos(th), math.sin(th))
    ax.add_patch(Circle((cx, cy), R, color="#a7cbe0"))
    # nuit : moitié opposée au Soleil
    if soleil_a_droite:
        ax.add_patch(Wedge((cx, cy), R, 90, 270, color="#3d4f66", alpha=0.85))
    else:
        ax.add_patch(Wedge((cx, cy), R, -90, 90, color="#3d4f66", alpha=0.85))
    ax.add_patch(Circle((cx, cy), R, fill=False, ec=BLUE, lw=2))
    ax.plot([cx - 1.3 * R * nvec[0], cx + 1.3 * R * nvec[0]], [cy - 1.3 * R * nvec[1], cy + 1.3 * R * nvec[1]], color=RUST, lw=3)
    ax.plot([cx - R * evec[0], cx + R * evec[0]], [cy - R * evec[1], cy + R * evec[1]], color="white", lw=1.5, ls="--")
    ax.text(cx + 1.42 * R * nvec[0], cy + 1.42 * R * nvec[1], "N", ha="center", va="center", fontsize=14, fontweight="bold", color=RUST)
    phi = math.radians(48)
    sgn = 1 if soleil_a_droite else -1
    vx = cx + R * (math.cos(phi) * sgn * evec[0] + math.sin(phi) * nvec[0])
    vy = cy + R * (math.cos(phi) * sgn * evec[1] + math.sin(phi) * nvec[1])
    ax.add_patch(Circle((vx, vy), 6, color=SUN, ec=NAVY, zorder=5))
    ax.text(vx + sgn * 12, vy, "Vienne", ha="left" if sgn > 0 else "right", va="center", fontsize=12, color=NAVY)
    ax.text(cx, cy + R + 50, nom, ha="center", fontsize=16, fontweight="bold", color=NAVY)
    ax.text(cx, cy + R + 78, legende, ha="center", va="top", fontsize=12, color=NAVY)


def six_saisons():
    fig, ax = canvas()
    titre(ax, "Les saisons : l’axe incliné garde la même direction", "Schéma non à l’échelle. En juin, l’hémisphère Nord est tourné vers le Soleil ; en décembre, à l’opposé.")
    ax.add_patch(Circle((593, 270), 48, color=SUN))
    ax.text(593, 340, "Soleil", ha="center", fontsize=14, color=NAVY)
    for dy in (-25, 25):
        fleche(ax, 535, 270 + dy, 340, 270 + dy, lw=2.5)
        fleche(ax, 651, 270 + dy, 846, 270 + dy, lw=2.5)
    terre_saison(ax, 230, 270, 85, True, "Juin", "été dans l’hémisphère Nord :\nSoleil haut, jours longs")
    terre_saison(ax, 956, 270, 85, False, "Décembre", "hiver dans l’hémisphère Nord :\nSoleil bas, jours courts")
    save(fig, "6e_saisons.png")


def six_mesures():
    fig = plt.figure(figsize=(14.8, 5.93), dpi=100)
    ax = fig.add_axes([0.08, 0.15, 0.88, 0.72])
    x = list(range(len(HEURES_6E)))
    ax.plot(x, AIR_ABRITE_6E, "-o", color=BLUE, lw=3, ms=9, label="Capteur A : air à l’abri (°C)")
    ax.plot(x, CAPTEUR_SOLEIL_6E, "-s", color=RUST, lw=3, ms=9, label="Capteur B : au soleil (°C)")
    i = HEURES_6E.index("13 h")
    ax.annotate("", xy=(i, CAPTEUR_SOLEIL_6E[i]), xytext=(i, AIR_ABRITE_6E[i]), arrowprops=dict(arrowstyle="<->", color=NAVY, lw=2))
    ax.text(i + 0.08, (CAPTEUR_SOLEIL_6E[i] + AIR_ABRITE_6E[i]) / 2, "écart : %d °C" % (CAPTEUR_SOLEIL_6E[i] - AIR_ABRITE_6E[i]), fontsize=14, color=NAVY, va="center")
    ax.set_xticks(x)
    ax.set_xticklabels(HEURES_6E, fontsize=13)
    ax.set_yticks(range(12, 33, 2))
    ax.tick_params(labelsize=13)
    ax.set_ylim(12, 32)
    ax.set_xlabel("Heure du relevé", fontsize=14)
    ax.set_ylabel("Température (°C)", fontsize=14)
    ax.grid(alpha=0.25)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.legend(fontsize=13, loc="upper left", frameon=False)
    fig.suptitle("Données fictives : même cour, même journée, deux emplacements", fontsize=18, color=NAVY, y=0.96)
    save(fig, "6e_mesures.png")


def six_capteurs():
    fig, ax = canvas()
    titre(ax, "Pourquoi mettre le capteur dans un abri ventilé ?")
    ax.plot([60, 1126], [440, 440], color=NAVY, lw=2)
    ax.add_patch(Circle((120, 150), 30, color=SUN))
    for dy in (0, 30):
        fleche(ax, 150, 165 + dy, 268, 270 + dy, lw=2.5)
    ax.add_patch(Rectangle((290, 210), 8, 230, color=NAVY))
    ax.add_patch(Circle((294, 300), 26, color=RUST))
    ax.text(294, 470, "Capteur au soleil : chauffé par le rayonnement,\nil indique plus que la température de l’air", ha="center", va="top", fontsize=13, color=NAVY)
    ax.add_patch(Circle((700, 150), 30, color=SUN))
    for dy in (0, 30):
        fleche(ax, 730, 165 + dy, 830, 215 + dy, lw=2.5)
    for i in range(5):
        ax.add_patch(FancyBboxPatch((800, 200 + i * 28), 190, 12, boxstyle="round,pad=0,rounding_size=5", fc="white", ec=NAVY, lw=2))
    ax.add_patch(Rectangle((891, 324), 8, 116, color=NAVY))
    ax.add_patch(Circle((895, 276), 7, color=TEAL, zorder=5))
    ax.annotate("capteur", xy=(888, 276), xytext=(720, 330), fontsize=12, color=TEAL, arrowprops=dict(arrowstyle="-|>", color=TEAL, lw=1.5))
    for yy in (230, 258, 286):
        fleche(ax, 1040, yy, 1000, yy, color=BLUE, lw=1.5, ms=12)
    ax.text(1048, 258, "air", ha="left", va="center", fontsize=12, color=BLUE)
    ax.text(895, 470, "Capteur dans un abri blanc et ajouré : protégé du\nSoleil, il mesure la température de l’air", ha="center", va="top", fontsize=13, color=NAVY)
    save(fig, "6e_capteurs.png")


# ------------------------------------------------------------------ 5e
def cinq_ciel():
    rng = np.random.default_rng(7)
    n = 160
    xs, ys = rng.uniform(0.02, 0.98, n), rng.uniform(0.03, 0.97, n)
    eclat = rng.power(0.45, n)
    fig, axs = plt.subplots(1, 2, figsize=(14.57, 6.09), dpi=100)
    for ax, fond, seuil, tit in ((axs[0], "#0f1b2d", 0.0, "Ciel sombre (simulation)"), (axs[1], "#5a6b80", 0.55, "Ciel urbain éclairé (simulation)")):
        ax.set_facecolor(fond)
        vis = eclat > seuil
        ax.scatter(xs[vis], ys[vis], s=6 + 60 * eclat[vis] ** 2, color="#f5f7ff", edgecolors="none")
        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_title("%s — %d étoiles visibles" % (tit, vis.sum()), fontsize=15, color=NAVY)
    fig.suptitle("Le même champ d’étoiles : en ville, seules les plus brillantes restent visibles, aux mêmes places", fontsize=15, color=GREY, y=0.04)
    fig.subplots_adjust(left=0.02, right=0.98, top=0.9, bottom=0.09, wspace=0.04)
    save(fig, "5e_ciel.png")


def cinq_telescope():
    fig, ax = canvas()
    titre(ax, "Deux instruments, deux façons de recueillir la lumière", "Les rayons d’un astre lointain arrivent parallèles ; l’optique les fait converger au foyer, où se forme l’image.")
    ys = (245, 295, 345)
    # lunette
    ax.add_patch(Rectangle((230, 215), 300, 160, fill=False, ec=GREY, lw=2))
    ax.add_patch(Ellipse((250, 295), 22, 150, fc="#8ec7e6", ec=BLUE, lw=2))
    fx, fy = 470, 295
    for y in ys:
        fleche(ax, 70, y, 245, y, lw=2.5, ms=14)
        ax.plot([255, fx], [y, fy], color=SUN, lw=2.5)
    ax.add_patch(Circle((fx, fy), 7, color=RUST, zorder=5))
    ax.text(fx, fy + 30, "foyer", ha="center", fontsize=12, color=RUST)
    ax.text(250, 395, "objectif (lentille)", ha="center", fontsize=12, color=BLUE)
    ax.text(330, 470, "Lunette : la lentille fait converger\nles rayons derrière elle", ha="center", va="top", fontsize=14, color=NAVY)
    # télescope
    ax.add_patch(Rectangle((690, 215), 400, 160, fill=False, ec=GREY, lw=2))
    yy = np.linspace(222, 368, 60)
    xx = 1080 - 0.0045 * (yy - 295) ** 2
    ax.plot(xx, yy, color=TEAL, lw=6)
    fx2 = 880
    for y in ys:
        xm = 1080 - 0.0045 * (y - 295) ** 2
        fleche(ax, 600, y, xm - 2, y, lw=2.5, ms=14)
        fleche(ax, xm - 2, y, fx2 + 6, fy, lw=2, ms=12, color="#d99a2b")
    ax.add_patch(Circle((fx2, fy), 7, color=RUST, zorder=5))
    ax.text(fx2, fy + 30, "foyer", ha="center", fontsize=12, color=RUST)
    ax.text(1050, 395, "miroir concave", ha="center", fontsize=12, color=TEAL)
    ax.text(890, 470, "Télescope : le miroir concave renvoie\nles rayons vers le foyer, devant lui", ha="center", va="top", fontsize=14, color=NAVY)
    save(fig, "5e_telescope.png")


def cinq_mesure():
    fig, ax = canvas()
    titre(ax, "Protocole : mêmes points de mesure, même lampe", "Point utile au sol, à 20 cm du pied · point témoin sur le côté, à hauteur de la lampe")
    sol = 450
    ax.plot([60, 1126], [sol, sol], color=NAVY, lw=3)
    for x0, capot, lab in ((300, False, "A : sans capot (boule)"), (850, True, "B : avec capot conique")):
        ax.add_patch(Rectangle((x0 - 5, 210), 10, sol - 210, color=NAVY))
        if capot:
            ax.add_patch(Polygon([[x0 - 45, 225], [x0 + 45, 225], [x0 + 18, 190], [x0 - 18, 190]], color="#b9c4cf", ec=NAVY))
            ax.add_patch(Circle((x0, 215), 12, color=SUN, zorder=4))
            for ang in (-120, -100, -80, -60):
                r = math.radians(ang)
                fleche(ax, x0, 225, x0 + 170 * math.cos(r), 225 - 170 * math.sin(r), lw=2, ms=12)
        else:
            ax.add_patch(Circle((x0, 205), 18, color=SUN, zorder=4))
            for ang in range(0, 360, 40):
                r = math.radians(ang)
                fleche(ax, x0 + 20 * math.cos(r), 205 - 20 * math.sin(r), x0 + 110 * math.cos(r), 205 - 110 * math.sin(r), lw=2, ms=12)
        ax.add_patch(Circle((x0 + 120, sol - 10), 11, color=TEAL, zorder=5))
        ax.add_patch(Circle((x0 + 170, 205), 11, color=RUST, zorder=5))
        ax.text(x0, sol + 30, lab, ha="center", va="top", fontsize=14, color=NAVY, fontweight="bold")
    ax.text(593, 530, "● vert : point utile (lumière qui éclaire le chemin)    ● orange : point témoin (lumière perdue)", ha="center", fontsize=13, color=GREY)
    save(fig, "5e_mesure.png")


# ------------------------------------------------------------------ 4e
def quatre_pixels():
    fig, ax = canvas(1262, 638)
    couleurs = {0: "#5da8c8", 1: "#73b77a", 2: "#d59d75"}
    s, x0, y0 = 64, 40, 70
    ax.text(x0 + 4 * s, 40, "Image classée de 8 × 8 pixels", ha="center", fontsize=20, color=NAVY)
    for i, lig in enumerate(IMAGE_4E):
        for j, v in enumerate(lig):
            ax.add_patch(Rectangle((x0 + j * s, y0 + i * s), s, s, fc=couleurs[v], ec="white", lw=2))
        ax.text(x0 - 14, y0 + i * s + s / 2, str(i), ha="right", va="center", fontsize=12, color=GREY)
    ax.text(x0 - 30, y0 - 18, "ligne", ha="left", fontsize=11, color=GREY)
    leg = [("eau", "00", 0), ("végétation", "01", 1), ("ville / sol bâti", "10", 2)]
    for k, (nom, codeb, v) in enumerate(leg):
        y = 160 + k * 90
        ax.add_patch(Rectangle((680, y - 22), 44, 44, fc=couleurs[v], ec=NAVY))
        ax.text(745, y, "%s : code %s" % (nom, codeb), va="center", fontsize=19, color=NAVY)
    ax.text(680, 470, "64 pixels × 2 bits = 128 bits de données\n(sans compter les numéros de paquets)", va="center", fontsize=17, color=NAVY)
    save(fig, "4e_pixels.png")


# ------------------------------------------------------------------ 3e
def trois_mars():
    fig, ax = canvas()
    titre(ax, "La Terre et Mars : des environnements très différents", "Diamètres à la même échelle ; les distances ne sont pas représentées.")
    rt = 115
    rm = rt * 3390 / 6371
    ax.add_patch(Circle((330, 270), rt, color="#4483b0", ec=NAVY, lw=2))
    ax.add_patch(Circle((856, 270), rm, color="#c87b5c", ec=NAVY, lw=2))
    ax.text(330, 420, "Terre · rayon 6 371 km", ha="center", fontsize=16, fontweight="bold", color=NAVY)
    ax.text(330, 452, "atmosphère dense, eau liquide, 15 °C en moyenne", ha="center", fontsize=13, color=NAVY)
    ax.text(856, 420, "Mars · rayon 3 390 km", ha="center", fontsize=16, fontweight="bold", color=NAVY)
    ax.text(856, 452, "atmosphère très mince, glace, −60 °C en moyenne", ha="center", fontsize=13, color=NAVY)
    save(fig, "3e_mars.png")


def boite(ax, x, y, w, h, txt, forme="rect"):
    if forme == "rect":
        ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h, boxstyle="square,pad=0", fc=PALE, ec=TEAL, lw=2.5))
    elif forme == "ovale":
        ax.add_patch(Ellipse((x, y), w, h, fc=PALE, ec=TEAL, lw=2.5))
    else:
        ax.add_patch(Polygon([[x, y - h / 2], [x + w / 2, y], [x, y + h / 2], [x - w / 2, y]], fc="white", ec=BLUE, lw=2.5))
    ax.text(x, y, txt, ha="center", va="center", fontsize=13, color=NAVY)


def trois_algorithme():
    fig, ax = canvas(1300, 560)
    ax.text(650, 38, "Algorigramme de la boucle de décision du rover", ha="center", fontsize=21, fontweight="bold", color=NAVY)
    Y1, Y2, YR = 150, 320, 455
    boite(ax, 75, Y1, 110, 60, "Début", "ovale")
    boite(ax, 265, Y1, 170, 110, "Mission\ndémarrée ?", "test")
    boite(ax, 500, Y1, 150, 64, "Mesurer la\ndistance")
    boite(ax, 715, Y1, 170, 110, "Mesure\npossible ?", "test")
    boite(ax, 945, Y1, 170, 110, "Distance\n< seuil ?", "test")
    boite(ax, 1195, Y1, 140, 64, "Contourner")
    boite(ax, 945, Y2, 150, 64, "Avancer")
    boite(ax, 715, Y2, 150, 64, "Arrêt de\nsécurité")
    boite(ax, 265, Y2, 150, 64, "Moteurs\narrêtés")
    c = NAVY
    fleche(ax, 130, Y1, 180, Y1, color=c, lw=2, ms=15)
    fleche(ax, 350, Y1, 425, Y1, color=c, lw=2, ms=15)
    fleche(ax, 575, Y1, 630, Y1, color=c, lw=2, ms=15)
    fleche(ax, 800, Y1, 860, Y1, color=c, lw=2, ms=15)
    fleche(ax, 1030, Y1, 1125, Y1, color=c, lw=2, ms=15)
    fleche(ax, 945, Y1 + 55, 945, Y2 - 32, color=c, lw=2, ms=15)
    fleche(ax, 715, Y1 + 55, 715, Y2 - 32, color=c, lw=2, ms=15)
    fleche(ax, 265, Y1 + 55, 265, Y2 - 32, color=c, lw=2, ms=15)
    for x, yb in ((1195, Y1 + 32), (945, Y2 + 32), (715, Y2 + 32), (265, Y2 + 32)):
        ax.plot([x, x], [yb, YR], color=c, lw=2)
    ax.plot([1195, 160], [YR, YR], color=c, lw=2)
    ax.plot([160, 160], [YR, Y1], color=c, lw=2)
    fleche(ax, 160, Y1 + 40, 160, Y1 + 2, color=c, lw=2, ms=15)
    for x, y, txt in ((372, Y1 - 15, "oui"), (275, Y1 + 80, "non"), (815, Y1 - 15, "oui"), (725, Y1 + 80, "non"),
                      (1060, Y1 - 15, "oui"), (955, Y1 + 80, "non")):
        ax.text(x, y, txt, fontsize=13, color=RUST, fontweight="bold")
    ax.text(650, 520, "Ovale : début · Losange : test (sortie « oui » ou « non ») · Rectangle : action · La flèche du bas ramène au début de la boucle.",
            ha="center", fontsize=12, color=GREY)
    save(fig, "3e_algorithme.png")


def trois_parcours():
    fig, ax = canvas()
    titre(ax, "Parcours d’essai : tester des situations variées")
    ax.add_patch(Rectangle((100, 130), 990, 330, fill=False, ec=NAVY, lw=4))
    ax.add_patch(Rectangle((130, 290), 70, 44, color=TEAL))
    fleche(ax, 205, 312, 300, 312, color=TEAL, lw=3, ms=15)
    for x, y, w, h in ((390, 300, 72, 66), (750, 150, 72, 66), (870, 300, 72, 32)):
        ax.add_patch(Rectangle((x, y), w, h, fc="#b7c4cc", ec=NAVY, lw=1.5))
    ax.text(906, 350, "obstacle bas", ha="center", fontsize=11, color=NAVY)
    ax.add_patch(Circle((1010, 200), 34, color=SUN))
    ax.text(1010, 255, "arrivée", ha="center", fontsize=13, color=NAVY)
    ax.text(593, 500, "Pour chaque essai : réussite ou échec, distance minimale à l’obstacle (cm), durée (s).\n4 parcours inconnus × 5 essais = 20 essais.",
            ha="center", va="center", fontsize=13, color=GREY)
    save(fig, "3e_parcours.png")


if __name__ == "__main__":
    cm1_source_eclairee(); cm1_ombre(); cm1_protocole(); cm1_phases(); cm1_geometrie()
    cm2_distances(); cm2_parcours()
    six_saisons(); six_mesures(); six_capteurs()
    cinq_ciel(); cinq_telescope(); cinq_mesure()
    quatre_pixels()
    trois_mars(); trois_algorithme(); trois_parcours()
