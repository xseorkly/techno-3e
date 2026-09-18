# Révision pédagogique et technique — septembre 2026

Cette version ajoute une correction expliquée et un bilan protégé par mot de passe à chacune des 19 pages d’activité/séance.

Principales révisions :
- famille/lignée d’OST et repères historiques du smartphone/fax ;
- adresse IP, masque /24, débit/latence et modèle de routage ;
- groupe radio micro:bit (pas d’appairage exclusif) ;
- rôle contextuel de la matrice LED ;
- apprentissage supervisé : entraînement + test sur données nouvelles ;
- interprétation prudente des scores de confiance ;
- étalonnage réel du capteur d’humidité par Vsec/Vhumide et indice relatif ;
- seuil de 50 % clairement présenté comme choix de conception du prototype ;
- journalisation micro:bit V2 via MY_DATA puis exploitation tableur ;
- données sur l’eau reformulées avec périodes et définitions ;
- accessibilité améliorée (aria-label, textes alternatifs, identifiant HTML dupliqué corrigé) ;
- bouton d’impression/PDF navigateur ajouté ; si jsPDF n’est pas disponible, le bouton PDF bascule aussi vers l’impression navigateur.

Les mots de passe historiques des séquences 2 et 4 sont inchangés. Les nouveaux mots de passe des séquences 1 et 3 figurent dans `mdp/index.html`.

## Relecture — corrections apportées

- **Puces parasites supprimées.** Le moteur d'affichage enfermait chaque ligne dans un `<li>`, y compris les schémas, les encadrés « À retenir » et les liens de ressources : une puce vide apparaissait devant chacun, sur les 19 pages (130 occurrences). Les lignes de type bloc sortent désormais de la liste à puces. Les deux moteurs sont corrigés : `assets/correction-bilan.js` pour les séquences 1 et 3, le script intégré pour les séquences 2 et 4.
- **Élision fautive** dans `seq1-act3` : « une IA n'« comprend » pas » devient « ne « comprend » pas », puisque le mot commence par une consonne.
- **Vocabulaire de la séance 4-2 harmonisé.** Le calibrage a été refait avec l'indice relatif Vsec/Vhumide, mais le mot « coefficient » subsistait à cinq endroits : onglet de la chronologie, critère du référentiel, titre du tableau sur la page et dans le PDF, identifiant d'ancre et repère de la barre de progression. Tout est passé à « indice ».
- **Détail réinjecté dans les séquences 2 et 4.** Les nouvelles corrections expliquaient la théorie mais ne corrigeaient plus les exercices question par question. Une à deux sections ont été ajoutées à chacune des neuf fiches, avant le bilan : réponses détaillées, erreurs fréquentes, analogies filées. Ces ajouts respectent la méthode d'étalonnage retenue et ne mentionnent plus de division par un nombre fixe.

## Séquence 1 — corrigés officiels et évaluations

**Corrections enrichies.** Les corrigés des documents professeur (TRAME1, TRAME2, TRAME3) ont été versés dans les corrections des trois activités : constats et idées attendus de l'activité 1 avec les quatre questions retenues, réponses détaillées des QCM et de la frise de l'activité 2, arguments des deux camps du débat et analyse du streaming pour l'activité 3, ainsi que les trois synthèses telles qu'elles figurent dans les trames. Les trois fiches passent à 6 ou 8 sections.

**Évaluations de compétence.** Les évaluations des activités 2 et 3, tirées des documents `Evaluation-Activité_2.docx` et `Evaluation-Activité_3.docx`, sont intégrées en bas des fiches `seq1-act2.html` et `seq1-act3.html`, derrière leur propre mot de passe : `Eval1B` et `Eval1C`, distincts de ceux des corrections.

Une fois déverrouillée, l'évaluation s'affiche en formulaire complet — identité, QCM, tableaux à compléter, questions ouvertes — avec deux boutons : « Générer le PDF de l'évaluation », qui produit `Eval-Seq1-Act2_NOM_Prenom_classe.pdf`, et « Imprimer » pour une passation papier. Le nom, le prénom et la classe sont obligatoires avant génération.

Le barème n'apparaît jamais pour l'élève. Il s'affiche sous chaque question uniquement en ajoutant `?prof=1` à l'adresse de la page, comme partout ailleurs sur le site.

Moteur : `assets/evaluation.js`, styles dans `assets/site-addons.css`.

## Séquence 2 — insertion d’une nouvelle partie 2
- Nouvelle `seq2-act1-p2.html` : activité sans ordinateur sur l’adresse IP, la table de routage et le débit.
- Ancienne partie 2 Filius déplacée en `seq2-act1-p3.html` (mot de passe inchangé : `Quartier2B`).
- Ancienne partie 3 analyse du routage déplacée en `seq2-act1-p4.html` (mot de passe inchangé : `Chemin2C`).
- Mot de passe de la nouvelle partie 2 : `Adresse2B`.


## Séquence 5 — Réinventer le porte-courrier
- Ajout de 7 séances interactives : besoin, contexte/cas d’utilisation, Ishikawa 6M, cahier des charges, idéation/matrice de décision, croquis & Tinkercad, tests/amélioration/pitch.
- Chaque séance comporte sauvegarde locale, PDF, correction protégée et bilan.
- Les diagrammes de référence du dossier Drive ont été optimisés pour le web et intégrés dans les corrections.
