# ASTROTECH — Astronomie et technologies, du CM1 à la 3e

Site pédagogique statique (HTML, CSS, JavaScript), publié avec GitHub Pages. Aucun compte, aucun serveur, aucune police ou bibliothèque chargée depuis un site extérieur.

## Contenu

- `index.html` : accueil et accès aux six niveaux.
- `niveau/` : une page par niveau (CM1, CM2, 6e, 5e, 4e, 3e) : mission, séances, fiches de connaissances.
- `activites/` : 51 séances élèves. Chacune suit les mêmes étapes : je m'interroge → j'enquête → je retiens → j'agis → je fais le bilan. Aucun corrigé n'apparaît dans les pages élèves.
- `connaissances.html` : 19 fiches de connaissances (explication, expérience, idée fausse fréquente, trace écrite, preuve, questions de vérification).
- `enseignants.html` : pour chaque niveau, programme et intitulés exacts visés, interdisciplinarité, mission, déroulé minuté, grille d'évaluation, vigilance, documents authentiques.
- `outils.html` et `outils/` : six simulateurs (ombres à Vienne, phases de la Lune, distances, pollution lumineuse, paquets d'image, campagne d'essais du rover).
- `atlas.html` : 25 schémas, 3 photographies créditées, 12 documents de missions.
- `ressources.html` et `telechargements/` : dossiers enseignants et livrets élèves (PDF et Word), cadrage général, atlas, parcours intégral, données et programmes d'exemple.
- `sources.html` : textes officiels, données et images utilisés.
- `assets/` : styles, scripts, polices (Archivo et Source Sans 3, licence SIL OFL), schémas, photographies, configuration.
- `_source/` : les fichiers qui produisent tout le site (voir ci-dessous).

## Modifier le contenu

Les pages des séances, des niveaux, des connaissances, de l'espace enseignant, de l'accueil, de l'atlas, des ressources et des sources sont **générées**. Ne pas les modifier à la main : modifier les données puis relancer le générateur.

| Pour changer… | Modifier… |
|---|---|
| une séance, une fiche, la mission, l'évaluation d'un niveau | `_source/contenu_cm1.py` … `_source/contenu_3e.py` |
| une donnée partagée (image 8 × 8 de 4e, relevés de 6e, distances) | `_source/donnees_communes.py` |
| le titre, le texte alternatif ou la légende d'une figure | `_source/figures_registre.py` |
| le dessin d'une figure | `_source/figures.py` (puis `python3 _source/figures.py`) |
| la mise en page des pages | `_source/build.py` et `assets/style.css` |
| un simulateur | `assets/simulations.js` |

Puis, depuis le dossier `stiam` :

```sh
python3 _source/build.py          # régénère les pages HTML (quelques secondes)
sh _source/documents.sh           # régénère les PDF et Word téléchargeables (quelques minutes)
```

`build.py` vérifie que les durées des étapes de chaque séance font bien 45 min (école) ou 55 min (collège). `documents.sh` demande Python 3 (Pillow, pypdf), Node.js avec le paquet `docx` et LibreOffice.

## Mettre en ligne

Le site est servi par GitHub Pages depuis le dépôt `techno-3e`, dossier `stiam`. Après modification : vérifier en local (par exemple `python3 -m http.server` dans `stiam`, puis ouvrir `http://localhost:8000`), puis déposer les changements sur GitHub. Le service worker (`sw.js`) charge toujours les pages depuis le réseau quand il est disponible : les élèves voient la nouvelle version sans vider leur cache.

## Réponses des élèves

Les réponses sont enregistrées dans le navigateur de l'appareil utilisé, sans envoi vers un serveur. L'élève peut exporter ses réponses (fichier JSON) ou imprimer la séance en PDF. Sur un poste partagé, il utilise en fin de séance « Effacer mes réponses » et « Effacer mon nom de cet appareil ».

Pour proposer un dépôt en ligne, indiquer dans `assets/config.js` l'adresse HTTPS d'un formulaire ou d'un espace autorisé par l'établissement :

```js
window.ASTRO_CONFIG = { depositUrl: 'https://...' };
```

Tant que `depositUrl` est vide, rien n'est envoyé.

## Corrections

Les pages du site ne contiennent aucun corrigé et aucun code enseignant. Les réponses attendues (enquêtes, productions, programmes, QCM, documents) figurent dans les dossiers enseignants de `telechargements/enseignants/`, produits par `sh _source/documents.sh`.

## Crédits

Schémas et simulateurs créés pour ASTROTECH. Photographies créditées dans l'atlas. Positions du Soleil calculées pour Vienne avec l'algorithme de la NOAA ; données climatiques de GeoSphere Austria. Les données d'exemple sont signalées comme telles dans les séances.
