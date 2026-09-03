# Fiches d'activité — Technologie 3e

Site statique. Aucune base de données, aucun compte, aucun serveur.
Chaque fiche est **un seul fichier HTML autonome** : elle contient sa mise en page, ses données et son générateur de PDF.

```
techno-3e/
├── index.html        ← sommaire des fiches
├── seq1-act1.html    ← Séquence 1 · Activité 1
├── seq1-act2.html    ← Séquence 1 · Activité 2
├── seq1-act3.html    ← Séquence 1 · Activité 3
├── seq2-act1-p1.html ← Séquence 2 · Activité 1, partie 1
├── seq2-act1-p2.html ← Séquence 2 · Activité 1, partie 2
├── seq2-act1-p3.html ← Séquence 2 · Activité 1, partie 3
├── seq3-act1-p1.html ← Séquence 3 · Activité 1, partie 1 (micro:bit)
├── seq3-act1-p2.html ← Séquence 3 · Activité 1, partie 2 (micro:bit)
├── seq3-act2-p1.html ← Séquence 3 · Activité 2, partie 1 (IA et images)
├── seq3-act2-p2.html ← Séquence 3 · Activité 2, partie 2 (Teachable Machine)
├── seq3-act2-p3.html ← Séquence 3 · Activité 2, partie 3 (biais et limites)
├── outils/
│   ├── aide-reseau.html    ← fiche d'aide réseau (vocabulaire, Filius, calculs)
│   ├── reseau-simple.html  ← trajet d'un paquet et tables de routage
│   └── reseau-complet.html ← trajet, débit et trafic
├── img/
│   ├── seq1-act1.jpg ← photo de la situation déclenchante (activité 1)
│   ├── seq1-act2.jpg ← illustration de l'exposition (activité 2)
│   ├── seq1-act3.jpg ← illustration LexIA (activité 3)
│   ├── seq2-act1-situation.jpg, seq2-act1-schema.jpg,
│   │   seq2-act1-app.png, seq2-act1-filius.jpg
│   ├── tel-cadran.png, tel-touches.png, tel-tactile.png, tel-pliable.png
│   └── logo-lfv.png  ← logo affiché en tête des pages
└── README.md
```

## 1. À propos des images

Les deux images sont déjà en place. Le logo est en plus **intégré directement dans le fichier de la fiche**, donc le PDF le contient toujours, même hors ligne.

La photo fournie fait 362 px de large : à l'écran elle est bridée à 440 px pour rester nette, et dans le PDF elle sort à 118 dpi. C'est lisible, mais si tu as l'original en 1200 px ou plus, remplace `img/seq1-act1.jpg` par ce fichier (même nom) et la qualité d'impression suivra.

## 2. Mettre en ligne sur GitHub Pages

Dans PowerShell, place-toi dans le dossier `techno-3e` :

```powershell
cd "C:\chemin\vers\techno-3e"
```

Initialise le dépôt :

```powershell
git init
git add .
git commit -m "Fiche 1 de la sequence 1"
git branch -M main
```

Crée le dépôt `techno-3e` sur github.com (public, sans README), puis :

```powershell
git remote add origin https://github.com/xseorkly/techno-3e.git
git push -u origin main
```

Active ensuite Pages : sur la page du dépôt → **Settings** → **Pages** → *Source : Deploy from a branch* → *Branch : main / (root)* → **Save**.

Le site est en ligne au bout d'une minute :
**https://xseorkly.github.io/techno-3e/**

## 3. Mettre à jour après une modification

```powershell
git add .
git commit -m "Ajout de la fiche 2"
git push
```

## Mode professeur

Ajoute `?prof=1` à la fin de l'adresse d'une fiche pour afficher les éléments de réponse attendus sous chaque cadre :

```
https://xseorkly.github.io/techno-3e/seq1-act1.html?prof=1
```

Les élèves n'ont aucun moyen de tomber dessus par hasard, mais l'adresse reste devinable : ne la diffuse pas.

## Ce que fait la page côté élève

- Les réponses sont sauvegardées automatiquement dans le navigateur de l'élève (`localStorage`). Elles survivent à une fermeture d'onglet, mais pas à un changement de poste ni à un nettoyage du navigateur. La barre du bas le rappelle.
- Le bouton **Générer le PDF** exige le nom, le prénom et la classe. Le fichier obtenu s'appelle par exemple `Seq1-Act1_KLABI_Fehmi_3e-A.pdf`.
- Le PDF reprend la mise en page de la trame : cartouche d'en-tête, bandeau d'identité, situation déclenchante, image, un cadre par rubrique avec la durée, et l'auto-positionnement CPS coché.
- Le bouton **Effacer mes réponses** demande confirmation.

## Particularités des activités 2 et 3

Le PDF ne reprend que les productions de l'élève : constats, problème, idées, réponses aux QCM, associations, N2a, N2b, frise, fiche technique du smartphone de 2030, synthèse et positionnement CPS. Les consignes, les vidéos, les liens et les images restent sur la page.

Les vidéos PodEduc ne se chargent qu'au clic sur « Lire la vidéo ». Rien n'est appelé tant que l'élève n'a pas demandé la lecture.

Les liens ont été extraits directement de ta trame. Deux points à vérifier :

- l'ordre des trois fiches de connaissances (FOST1a, FOST1d, FOST1c) est déduit de leur position dans le document, pas d'un titre ;
- l'intitulé de la compétence CPS était vide dans les deux trames ; j'ai mis « Se fixer un objectif et le mener à son terme » pour l'activité 2 et « Exercer son esprit critique face à une réponse produite par une IA » pour l'activité 3.

Pour l'activité 3, les liens ne posaient aucune ambiguïté : chaque archive et chaque quiz porte le code OST correspondant dans son adresse.

## Particularités de la séquence 2, activité 1

Les quatre vidéos Filius sont hébergées sur YouTube : elles sont chargées uniquement au clic, depuis le domaine sans cookie `youtube-nocookie.com`. Les deux vidéos PodEduc fonctionnent de la même façon.

L'activité de niveau 3 se déroule dans le logiciel Filius, hors du site : la page propose une case à cocher par étape, qui ressort dans le PDF sous forme de relevé d'avancement. C'est un ajout de ma part, ta trame n'avait pas de champ à cet endroit.

Les tables mystères s'affichent en α, β, γ sur la page ; le PDF les écrit « alpha », « beta », « gamma », car la police du PDF ne contient pas l'alphabet grec.

## Découpe en trois séances

L'activité 1 de la séquence 2 dure 3 h : elle est découpée en trois pages d'environ 55 minutes, chacune avec son propre bouton « Générer le PDF ». L'élève rend donc trois copies : `Seq2-Act1-P1_NOM_Prenom_classe.pdf`, `-P2`, `-P3`.

- Partie 1 : situation, constats, problème, idées, niveaux 1 et 2, fiches et quiz.
- Partie 2 : configuration du réseau dans Filius, avec les cinq étapes cochables. J'y ai ajouté un champ « ce qui a marché, ce qui a bloqué » : sans lui, une séance entière ne laisserait aucune trace écrite.
- Partie 3 : niveau 4 complet, synthèse et positionnement CPS.

Les réponses sont enregistrées séparément pour chaque partie : remplir la partie 2 n'écrase rien de la partie 1.

**Si tu déploies par-dessus une version précédente, supprime `seq2-act1.html` de ton dossier** : la copie n'efface pas les fichiers disparus, et l'ancienne version en un seul morceau resterait en ligne.

## Séquence 3 — micro:bit, en deux séances

Programmation **par blocs uniquement**, dans MakeCode. Aucun lien vers l'éditeur Python, aucun code recopié.

**Partie 1 (55 min)** — schéma légendé de la carte que j'ai dessiné, tableau des quatorze composants avec leur rôle et leur famille, trois exercices de repérage, puis le programme du dé en sept étapes cochables, dix lancers à relever et deux explications.

**Partie 2 (55 min)** — comment deux cartes se parlent par radio et pourquoi il faut le même numéro de groupe, avec un champ pour noter le groupe du binôme. Puis l'algorithme écrit en français, le logigramme construit ligne par ligne (forme + contenu), et enfin la réalisation par blocs en sept étapes.

Le logigramme est **dessiné dans le PDF** avec les symboles normalisés : ovale pour début et fin, parallélogramme pour les entrées et sorties, rectangle pour les traitements, losange pour les tests, reliés par des flèches. L'élève choisit la forme de chaque étape dans une liste, le PDF s'occupe du tracé.

Adapté du projet « Pierre, feuille, ciseaux » de la Micro:bit Educational Foundation, sous licence CC BY-SA 4.0.

## Séquence 3, activité 2 — l'IA et la reconnaissance d'images

Trois séances de 55 minutes, chacune avec son PDF.

**Partie 1** — trois cas réels documentés : les caméras LAPI d'un parking, les sas PARAFE d'un aéroport, la détection de gestes de Veesion en magasin. Une vidéo par cas, un tableau comparatif à remplir, l'association des trois étapes de l'IA, puis un débat sur la caméra du magasin. Les deux camps du débat sont réels et sourcés : les chiffres de l'entreprise d'un côté, la position de La Quadrature du Net de l'autre.

**Partie 2** — le TP main ouverte / main fermée : Teachable Machine pour la base et l'entraînement, Vittascience Adacraft avec les extensions IA Image et micro:bit pour l'utilisation. Douze étapes cochables, relevé du nombre d'images par classe et des taux de confiance observés.

**Partie 3** — le TP stylos sur adacraft.org avec l'extension TM2Scratch, puis six essais destinés à faire échouer le modèle : lumière changée, fond différent, couleur jamais montrée, objet inconnu, caméra vide. C'est la partie que les TP d'origine n'avaient pas, et c'est là que le biais devient concret.

Adapté des deux TP de Philippe Perennes (académie de Normandie). Attention : **MakeCode ne peut pas exploiter un modèle Teachable Machine**, seul l'univers Scratch le permet — d'où le passage par Adacraft.

## Navigation

Chaque fiche porte en haut une barre avec un bouton **Accueil** et un menu déroulant listant toutes les activités et les trois outils réseau. La barre reste visible au défilement et n'apparaît pas à l'impression.

## Les trois outils réseau

Ils sont hébergés sur le site, plus sur `edurl.fr` : ils chargent plus vite en classe et ne dépendent plus d'un raccourcisseur. Ils sont autonomes, à une exception près : comme les fiches, ils appellent les polices Google. Sur un réseau qui filtre `fonts.googleapis.com`, ils restent utilisables avec des polices de substitution.

Où ils apparaissent dans l'activité :

- le réseau simplifié s'ouvre dans la page, juste avant la réponse N2a ;
- l'onglet Débit du réseau complet est signalé au-dessus de N2b, et l'application entière sert de support à tout le niveau 4 ;
- la fiche d'aide est mise en avant au début de l'activité Filius et rappelée dans les ressources.

Le bandeau de la fiche d'aide indiquait « Séquence 1 · Séance 6 », je l'ai passé en séquence 2 activité 1.

## Ajouter une fiche

Envoie-moi la trame, je te renvoie un fichier complet (`seq1-act2.html`, etc.) à déposer dans le dossier, plus la ligne à coller dans `index.html`. Rien d'autre ne bouge.
