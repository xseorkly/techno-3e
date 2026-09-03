# Fiches d'activité — Technologie 3e

Site statique. Aucune base de données, aucun compte, aucun serveur.
Chaque fiche est **un seul fichier HTML autonome** : elle contient sa mise en page, ses données et son générateur de PDF.

```
techno-3e/
├── index.html        ← sommaire des fiches
├── seq1-act1.html    ← Séquence 1 · Activité 1
├── seq1-act2.html    ← Séquence 1 · Activité 2
├── seq1-act3.html    ← Séquence 1 · Activité 3
├── seq2-act1.html    ← Séquence 2 · Activité 1
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

## Ajouter une fiche

Envoie-moi la trame, je te renvoie un fichier complet (`seq1-act2.html`, etc.) à déposer dans le dossier, plus la ligne à coller dans `index.html`. Rien d'autre ne bouge.
