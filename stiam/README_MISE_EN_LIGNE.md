# ASTROTECH — Parcours Astronomie et technologies spatiales

**Site HTML pédagogique statique, du CM1 à la 3e.**

## Contenu

- `index.html` : accueil, six rubriques de niveau, 51 activités accessibles.
- `niveau/` : six espaces de niveau (CM1, CM2, 6e, 5e, 4e, 3e).
- `activites/` : 51 séances élèves, une page HTML par séance, navigables entre elles.
- `connaissances.html` : 18 questions scientifiques, traces écrites et expériences.
- `enseignants.html` : intentions didactiques, programme, déroulés et éléments de correction.
- `outils.html` et `outils/` : six simulations interactives locales.
- `atlas.html` : 24 schémas scientifiques, photographies disponibles et 12 références externes officielles.
- `ressources.html` + `telechargements/` : dossiers enseignants (PDF/DOCX), livrets élèves (PDF/DOCX), atlas, intégrale, audit, exemples de données.
- `depot.html` : explications de dépôt, lien personnalisable.
- `assets/` : styles, scripts, schémas, photographies, configuration.

## Mettre en ligne sur GitHub Pages

1. Créer un dépôt GitHub public, par exemple `astro-tech`. Ne pas remplacer le dépôt `techno-3e` existant.
2. Extraire **tout le ZIP**, puis copier **le contenu** (pas seulement le ZIP) directement à la racine du dépôt : `index.html`, `activites/`, `assets/`, etc.
3. Dans le dépôt, ouvrir **Settings → Pages → Build and deployment → Deploy from a branch**, choisir `main` et `/ (root)`, puis enregistrer.
4. Le site sera disponible à l'adresse propre au dépôt, par exemple `https://xseorkly.github.io/astro-tech/`.
5. Vérifier la navigation et les fichiers téléchargés après publication.

Aucun framework, compilation ou hébergement payant n'est nécessaire. Le site peut aussi être ouvert localement avec `index.html` (certaines fonctions comme le service worker demandent HTTP/HTTPS).

## Dépôt des travaux d'élèves — à personnaliser

Ouvrir `assets/config.js` et remplacer la valeur vide de `depositUrl` par le lien **HTTPS** d'un formulaire ou espace de dépôt officiel et autorisé :

```js
window.ASTRO_CONFIG = { teacherCode: 'ASTRO2026', depositUrl: 'https://...' };
```

Tant que `depositUrl` est vide, **aucun envoi en ligne n'est effectué**. Les élèves peuvent imprimer/sauvegarder une activité en PDF à l'aide du bouton d'impression ou exporter leurs réponses au format JSON. Les réponses sont enregistrées localement dans le navigateur sur l'appareil utilisé, sans synchronisation vers un serveur.

## Corrections et accès enseignant

**Attention :** les contrôles par code dans une page HTML statique ne constituent **pas** une protection sécurisée. Une personne techniquement avertie peut consulter le code source et retrouver les corrections. L'espace `enseignants.html` est lui aussi public. Pour rendre les corrigés réellement confidentiels, il faut héberger une zone enseignants avec une authentification côté serveur, ou retirer les corrigés du site public et les distribuer dans un espace privé.

## Mentions scientifiques et crédits

Le site contient des schémas pédagogiques originaux et quelques photographies avec crédits/limites précisées sur les pages. Les liens externes vers des ressources NASA, ESA et autres renvoient à leurs éditeurs ; ils nécessitent un accès internet. Les tableaux simulés destinés à l'entraînement sont clairement identifiés comme tels et ne doivent pas être présentés comme des mesures authentiques.

Conçu pour une utilisation pédagogique et adaptation par l'enseignant. Vérifier les réglementations locales et les consignes institutionnelles pour la collecte de travaux d'élèves.
