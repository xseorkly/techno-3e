/* Données communes du module « Expertiser une séquence » (atelier 90 min).
   Une seule source : la page d'accueil et la fiche de groupe lisent ce fichier. */
window.EXPERTISE = {
  source: 'https://ent2d.ac-bordeaux.fr/disciplines/sti-college/2026/06/19/exemples-de-sequences-3eme/',
  sequences: [
    {id: 1, code: 'OST1 · T1', titre: 'Le système de navigation',
     support: 'Application de navigation, GPS, carte routière, smartphone, ressources sur l’IA.',
     question: 'L’élève comprend-il pourquoi le système a évolué et ce que cela change dans les usages, ou se contente-t-il de comparer plusieurs objets ?'},
    {id: 2, code: 'SFC1 · T6-T8', titre: 'Les secrets du mBot',
     support: 'Robot mBot, carte mCore, capteurs, moteurs, DEL, transmissions et matériaux.',
     question: 'Après avoir manipulé le robot, l’élève sait-il expliquer le rôle des capteurs, de la commande et des actionneurs sur un autre système ?'},
    {id: 3, code: 'SFC1 · T6-T8', titre: 'Le robot livreur',
     support: 'mBot présenté comme robot livreur : capteurs, moteurs, transmissions.',
     question: 'La mission de livraison aide-t-elle l’élève à comprendre et à faire des choix, ou ajoute-t-elle seulement une histoire autour du même robot ?'},
    {id: 4, code: 'SFC2 · T11', titre: 'En panne ! Le distributeur de savon',
     support: 'Distributeur automatique de savon, prototypage, mesures électriques, CAO, impression 3D.',
     question: 'L’élève mène-t-il un vrai diagnostic (hypothèses, tests, conclusion) ou suit-il une procédure déjà donnée ?'},
    {id: 5, code: 'CCRI1 · T13-T16', titre: 'Borne d’arcade — lancer le projet',
     support: 'Raspberry Pi, écran, joystick, boutons, impression 3D, Onshape, MakeCode Arcade.',
     question: 'Quelles décisions de conception appartiennent vraiment aux élèves : besoin, contraintes, matériaux, solutions, essais ?'}
  ],
  lunettes: [
    {id: 'peda', nom: 'Pédagogique', sous: 'Qui fait quoi en classe ?', couleur: '#c2185b',
     questions: [
       {id: 'P1', titre: 'Qui décide ?', aide: 'Qu’est-ce que l’élève choisit vraiment lui-même : une hypothèse, un test, une solution, un ordre d’actions ? Ou bien la fiche décide-t-elle tout ?'},
       {id: 'P2', titre: 'Qui aide, et quand ?', aide: 'Les aides sont-elles prévues et graduées, sans faire à la place de l’élève ? Une aide trop précoce supprime-t-elle la recherche ?'}
     ]},
    {id: 'dida', nom: 'Didactique', sous: 'Quel savoir, quel obstacle ?', couleur: '#245d8a',
     questions: [
       {id: 'D1', titre: 'Où est le problème ?', aide: 'La tâche oblige-t-elle à construire le savoir visé ? Ou peut-on réussir en recopiant, en suivant un tutoriel ou en essayant au hasard ?'},
       {id: 'D2', titre: 'Quand le savoir devient-il explicite ?', aide: 'Quelle trace stabilise ce qui a été appris (synthèse, schéma, règle) ? Qui la construit : l’élève, le groupe ou le professeur ?'}
     ]},
    {id: 'cogn', nom: 'Cognitive', sous: 'Que se passe-t-il dans la tête de l’élève ?', couleur: '#9a6900',
     questions: [
       {id: 'C1', titre: 'Qu’est-ce qui surcharge ?', aide: 'Outils nouveaux, vocabulaire, consignes longues, documents dispersés : qu’est-ce qui détourne l’attention du savoir visé ?'},
       {id: 'C2', titre: 'Quelle preuve qu’il a appris ?', aide: 'Quelle trace individuelle montre qu’un élève précis a compris, et qu’il saura le réutiliser plus tard, sur un autre objet ?'}
     ]}
  ]
};
