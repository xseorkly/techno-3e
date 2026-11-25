/* V4 : contenus pédagogiques originaux ; schémas et modèles du jeu à tester. */
window.MC_V4_DATA = [
  {
    "id": "01",
    "title": "Se repérer sur un chantier",
    "story": "Un chef de chantier te demande de matérialiser les quatre coins d'une zone et de revenir au départ. Apprends à lire un plan et à te déplacer sans te perdre.",
    "lesson": "Coordonnées : X et Z repèrent la position au sol ; Y indique la hauteur. Un côté de 4 cases possède 3 intervalles entre les centres des blocs.",
    "materials": "4 blocs de béton jaune ; monde préparé avec repères bleu et vert.",
    "module": "commandes.html",
    "steps": [
      [
        "Ouvre le monde distribué par le professeur. Dans Paramètres, active Afficher les coordonnées si nécessaire.",
        "Tu vois trois nombres X, Y, Z."
      ],
      [
        "Appuie sur E, cherche béton jaune, glisse-le dans la barre rapide ; ferme l'inventaire et sélectionne-le.",
        "Tu tiens le bloc jaune."
      ],
      [
        "Place-toi sur le repère bleu, note X et Z. Rejoins le repère vert, premier coin ; note ses coordonnées.",
        "Tu peux retrouver le départ."
      ],
      [
        "Pose un bloc jaune au-dessus du repère vert. À partir de ce premier coin, augmente X de 3 sans changer Z, puis Z de 3 ; complète le quatrième coin en revenant de 3 suivant X. Vise la face supérieure du sol et clique droit.",
        "Les quatre marqueurs ont la même hauteur et dessinent 4 × 4 cases."
      ],
      [
        "Double Espace pour voler en créatif ; photographie le carré. Redescends avec Maj et rejoins le bleu.",
        "Tu as une vue de dessus et les coordonnées de deux coins."
      ]
    ],
    "help": [
      [
        "Je ne vois pas les coordonnées",
        "Ouvre les paramètres du monde ; demande au professeur si le réglage est verrouillé."
      ],
      [
        "Je casse au lieu de poser",
        "Clic gauche casse ; clic droit pose sur la face visée."
      ],
      [
        "Je pars dans le mauvais sens",
        "Fais un pas et observe quel nombre change ; reviens si nécessaire."
      ],
      [
        "Mon carré est trop grand",
        "Compte les cases, pas les déplacements : 4 cases = 3 intervalles."
      ],
      [
        "Je ne retrouve pas le départ",
        "Compare X et Z actuels aux nombres notés sur le repère bleu."
      ]
    ],
    "before": [
      [
        "Quel axe indique la hauteur ?",
        "Y",
        "X",
        "Z",
        "Y varie quand tu montes."
      ],
      [
        "Pour 4 cases alignées, combien d'intervalles entre les centres ?",
        "3",
        "4",
        "5",
        "Compte les espaces entre les quatre positions."
      ]
    ],
    "after": [
      [
        "De (10,64,20) à (13,64,20), quel axe change ?",
        "X",
        "Y",
        "Z",
        "Seul le premier nombre change."
      ],
      [
        "Quels sont les écarts entre coins d'un carré de 4 cases ?",
        "3 selon X et Z",
        "4 selon Y",
        "1 selon X et Z",
        "Quatre positions donnent trois intervalles."
      ],
      [
        "Quelle preuve montre que tu sais revenir ?",
        "Retrouver les coordonnées de départ",
        "Avoir quatre couleurs",
        "Voler plus haut",
        "Comparer la position finale et initiale."
      ]
    ],
    "evidence": "Photo de dessus + deux coordonnées + explique la différence entre case et intervalle.",
    "transfer": "Dans un autre carré de 5 cases, prévois les écarts avant de construire."
  },
  {
    "id": "02",
    "title": "Construire un abri",
    "story": "Le matériel du chantier doit rester à l'abri de la pluie ; un adulte doit pouvoir entrer et voir à l'extérieur.",
    "lesson": "Emprise : surface occupée au sol. Périmètre : contour. Une contrainte est une exigence à respecter. Le modèle proposé a 3 blocs de hauteur intérieure ; le minimum demandé est 2.",
    "materials": "20 planches de sol, blocs de mur, 20 blocs de toit, 2 verres.",
    "module": "commandes.html",
    "steps": [
      [
        "Dessine 5 colonnes et 4 rangées sur papier ; marque une entrée sur la façade de 5 blocs.",
        "20 cases et un emplacement d'entrée."
      ],
      [
        "Dans l'inventaire, sélectionne les planches ; pose une rangée de 5 puis trois autres rangées jointives.",
        "Sol rectangulaire de 5 × 4."
      ],
      [
        "Pose des blocs uniquement sur les bords du sol. Fais trois rangées superposées en laissant le centre vide.",
        "Les murs entourent une pièce où tu peux entrer."
      ],
      [
        "Sur la façade de 5 blocs, laisse une ouverture centrale de 1 bloc de large et 2 de haut. Remplace deux blocs d'un mur par du verre.",
        "L'entrée et la fenêtre sont visibles."
      ],
      [
        "Pose 5 × 4 blocs au-dessus des murs ; marche dans l'abri. Note deux matériaux et explique leur choix à partir des documents disponibles.",
        "Toit continu et au moins 2 blocs libres en hauteur."
      ]
    ],
    "help": [
      [
        "Je remplis tout le volume",
        "Ne construis que le contour : le milieu doit rester vide."
      ],
      [
        "Je ne peux pas entrer",
        "Retire les deux blocs superposés au même emplacement."
      ],
      [
        "Je ne peux pas poser le toit",
        "Commence au bord supérieur d'un mur et avance de bloc en bloc."
      ],
      [
        "Il fait sombre",
        "Ajoute le vitrage demandé ; la luminosité du jeu n'est pas une mesure réelle."
      ],
      [
        "Je confonds bois et pierre",
        "Compare les usages et propriétés documentés, pas uniquement leur couleur."
      ]
    ],
    "before": [
      [
        "Que signifie l'emprise de 5 × 4 ?",
        "20 cases au sol",
        "20 blocs en hauteur",
        "5 cases de périmètre",
        "L'emprise est la surface au sol."
      ],
      [
        "Quel passage minimal en hauteur est demandé ?",
        "2 blocs libres",
        "1 bloc libre",
        "4 blocs libres",
        "Le cahier des charges fixe au moins 2 blocs."
      ]
    ],
    "after": [
      [
        "Un abri de 3 blocs libres respecte-t-il le minimum de 2 ?",
        "Oui",
        "Non",
        "Seulement sans toit",
        "Un minimum peut être dépassé."
      ],
      [
        "Pourquoi laisser le centre vide ?",
        "Permettre de circuler et stocker",
        "Réduire la largeur de la porte",
        "Supprimer le toit",
        "Le besoin est de disposer d'un volume utile."
      ],
      [
        "Comment comparer réellement deux matériaux ?",
        "Utiliser des données techniques",
        "Observer seulement leur couleur",
        "Mesurer la vitesse du joueur",
        "Le jeu ne mesure pas toutes les propriétés réelles."
      ]
    ],
    "evidence": "Deux photos, dimensions et justification de deux matériaux.",
    "transfer": "Propose une autre forme d'abri qui respecte les mêmes contraintes."
  },
  {
    "id": "03",
    "title": "Modéliser une salle à l'échelle",
    "story": "Un nouvel élève doit se repérer dans ta salle de technologie grâce à une maquette.",
    "lesson": "L'échelle choisie est 1 bloc = 1 m. Un plan coté indique les dimensions. Un arrondi peut introduire une erreur ; on doit la signaler.",
    "materials": "Exemple fictif : salle 9 × 7 m, 63 blocs de sol, 3 îlots de 2 × 1. Si tu utilises un relevé réel, adapte tous les nombres.",
    "module": "commandes.html",
    "steps": [
      [
        "Choisis avec le professeur le plan fictif 9 × 7 ou le relevé réel. Note longueur et largeur en mètres.",
        "Deux mesures et l'échelle écrites."
      ],
      [
        "Trace le rectangle sur papier quadrillé ; un carreau représente un mètre. Place une entrée de 2 cases dans l'exemple et trois îlots.",
        "Plan légendé avant construction."
      ],
      [
        "Pose les rangées du sol selon ton plan ; marque le contour par des blocs.",
        "Pour l'exemple : 63 cases ; sinon calcule ton produit."
      ],
      [
        "Laisse l'entrée libre et place les trois îlots. Mesure les passages en comptant les cases libres.",
        "On peut rejoindre chaque îlot sans obstacle."
      ],
      [
        "Prends une vue aérienne ; annote dimensions, passages et éventuels arrondis.",
        "La maquette correspond au plan retenu."
      ]
    ],
    "help": [
      [
        "Mes mesures ne sont pas entières",
        "Arrondis au bloc le plus proche et indique l'écart, ou demande une échelle plus fine."
      ],
      [
        "Je ne retrouve pas le nord",
        "Active les coordonnées et indique les axes sur ton plan."
      ],
      [
        "J'obtiens moins de 63 cases",
        "Pour 9 × 7 seulement, compte 7 rangées de 9 ; pour une autre salle, recalcule."
      ],
      [
        "Mes tables bloquent le chemin",
        "Déplace-les sur le plan avant de modifier le monde."
      ],
      [
        "Je confonds plan et photo",
        "Le plan est une représentation cotée ; la photo montre la réalisation."
      ]
    ],
    "before": [
      [
        "À 1 bloc = 1 m, comment représenter 7 m ?",
        "7 blocs",
        "14 blocs",
        "1 bloc",
        "Applique l'échelle choisie."
      ],
      [
        "Quel document indique les dimensions ?",
        "Un plan coté",
        "Un inventaire",
        "Une liste de joueurs",
        "Les cotes sont les mesures écrites."
      ]
    ],
    "after": [
      [
        "Une salle de 8 × 6 m exige combien de cases au sol à cette échelle ?",
        "48",
        "63",
        "14",
        "8 × 6 = 48."
      ],
      [
        "Pourquoi signaler un arrondi ?",
        "Pour indiquer la précision limitée",
        "Pour changer la porte",
        "Pour modifier le sens de X",
        "Le modèle n'est pas exact au centimètre."
      ],
      [
        "Que vérifier après avoir posé les îlots ?",
        "Les trajets et leurs largeurs",
        "Seulement leur couleur",
        "Seulement le nombre de murs",
        "L'objectif est de pouvoir circuler."
      ]
    ],
    "evidence": "Plan coté et vue de dessus annotée, avec échelle et écarts.",
    "transfer": "Refais une partie du plan avec 2 blocs pour 1 m et compare la précision."
  },
  {
    "id": "04",
    "title": "Comparer deux façades",
    "story": "Un client veut laisser entrer la lumière sans perdre toute intimité. Il faut comparer deux variantes de même taille.",
    "lesson": "Une comparaison équitable conserve les mêmes dimensions. La proportion vitrée est le nombre de blocs transparents divisé par le nombre total. Les propriétés physiques réelles ne sont pas mesurées dans Minecraft.",
    "materials": "48 blocs pour 2 façades 6 × 4 dont 6 verres. Fiches matériaux réelles : si absentes, demander au professeur ; ne pas inventer de valeur.",
    "module": "potentiel.html",
    "steps": [
      [
        "Dessine deux rectangles de 6 × 4 et réserve six cases centrales au vitrage du second.",
        "Deux surfaces égales."
      ],
      [
        "Construis deux murs de 24 blocs chacun, sur des supports comparables.",
        "Largeur et hauteur identiques."
      ],
      [
        "Sur le second mur, retire 6 blocs et remplace-les par du verre.",
        "6 transparents sur 24."
      ],
      [
        "Observe les deux faces depuis les mêmes positions. Note visibilité et intimité ; calcule 6 ÷ 24.",
        "Deux observations et 25 % de vitrage."
      ],
      [
        "Remplis un tableau : coût, entretien, isolation ; indique la source des données réelles ou « non fourni ». Justifie un compromis.",
        "Un choix expliqué et ses limites."
      ]
    ],
    "help": [
      [
        "Je change la taille du mur",
        "Reviens à 6 × 4 pour ne comparer que la solution."
      ],
      [
        "Je trouve 6 %",
        "Divise 6 par 24 puis multiplie par 100."
      ],
      [
        "La lumière semble différente",
        "Décris l'apparence, ne la transforme pas en mesure de chaleur."
      ],
      [
        "Je n'ai pas les fiches matériaux",
        "Demande-les ; note non renseigné si indisponibles."
      ],
      [
        "Je ne sais pas choisir",
        "Classe les critères selon les besoins du client et explique le compromis."
      ]
    ],
    "before": [
      [
        "Pourquoi construire deux façades de même dimension ?",
        "Comparer dans des conditions semblables",
        "Augmenter leur coût",
        "Éviter de compter le verre",
        "Une seule différence étudiée rend la comparaison plus claire."
      ],
      [
        "Quel total pour un mur 6 × 4 ?",
        "24 blocs",
        "10 blocs",
        "12 blocs",
        "6 × 4 = 24."
      ]
    ],
    "after": [
      [
        "6 vitrages sur 24 représentent…",
        "25 %",
        "6 %",
        "50 %",
        "6/24 = 1/4."
      ],
      [
        "Minecraft mesure-t-il l'isolation thermique réelle ?",
        "Non",
        "Oui",
        "Uniquement pour la pierre",
        "Les règles du jeu ne sont pas des mesures physiques."
      ],
      [
        "Quel choix justifier ?",
        "Un compromis lumière et intimité avec données",
        "Le mur le plus coloré",
        "Le mur construit le plus vite",
        "Relie la décision au besoin et aux critères."
      ]
    ],
    "evidence": "Deux photos, proportion vitrée et tableau de comparaison sourcé.",
    "transfer": "Compare une troisième variante à 12 vitrages."
  },
  {
    "id": "05",
    "title": "Concevoir un pont",
    "story": "Un canal de 5 blocs coupe un chemin piéton. Tu dois le franchir sans obstacle dans l'eau.",
    "lesson": "Le tablier est la partie sur laquelle on circule ; les appuis le soutiennent ; les garde-corps protègent les bords. Le budget limite le nombre de blocs ajoutés.",
    "materials": "28 planches, 14 barrières, 4 blocs d'appui ; budget maximal 70 blocs ajoutés.",
    "module": "commandes.html",
    "steps": [
      [
        "Repère les deux berges et compte les 5 cases d'eau. Dessine au moins deux idées de traversée.",
        "Tu identifies la zone où aucun appui n'est permis."
      ],
      [
        "Choisis une solution et dessine un tablier de 7 × 4, dont 1 case sur chaque berge.",
        "Un croquis avec longueur et largeur."
      ],
      [
        "Place les 4 appuis sur les berges, pas dans l'eau. Pose le tablier à même hauteur, 7 rangées de 4.",
        "28 blocs de tablier et canal libre."
      ],
      [
        "Pose 7 barrières le long de chaque bord longitudinal. Laisse les deux rangées centrales libres.",
        "14 barrières et passage de 2 blocs."
      ],
      [
        "Traverse dans les deux sens. Compte les blocs ajoutés, y compris les éventuels accès. Compare au budget de 70.",
        "Exemple sans accès ajouté : 46 blocs, budget respecté."
      ]
    ],
    "help": [
      [
        "Mon pont n'atteint pas l'autre rive",
        "Compte 5 cases d'eau plus une case sur chacune des berges."
      ],
      [
        "J'ai placé un appui dans l'eau",
        "Déplace cet appui sur la rive."
      ],
      [
        "Je ne peux pas traverser",
        "Vérifie les deux rangées centrales et les niveaux."
      ],
      [
        "Je dépasse 70 blocs",
        "Réduis les éléments décoratifs sans supprimer les garde-corps."
      ],
      [
        "Le pont flotte mais tient",
        "Minecraft n'évalue pas la résistance mécanique du pont réel."
      ]
    ],
    "before": [
      [
        "Le tablier sert à…",
        "Circuler",
        "Mesurer l'eau",
        "Créer un capteur",
        "C'est la surface de passage."
      ],
      [
        "Longueur avec 5 cases d'eau et 1 sur chaque rive ?",
        "7",
        "5",
        "9",
        "5 + 1 + 1 = 7."
      ]
    ],
    "after": [
      [
        "28 + 14 + 4 blocs : le budget de 70 est-il respecté ?",
        "Oui, 46 blocs",
        "Non, 74 blocs",
        "Oui, 70 blocs",
        "46 est inférieur à 70."
      ],
      [
        "Pourquoi laisser deux rangées libres ?",
        "Pour respecter la largeur de passage",
        "Pour supprimer les appuis",
        "Pour mesurer la flexion",
        "Les garde-corps ne doivent pas occuper le passage."
      ],
      [
        "Que ne prouve pas la traversée virtuelle ?",
        "La résistance mécanique réelle",
        "La continuité du passage virtuel",
        "La largeur du tablier virtuel",
        "Les contraintes mécaniques réelles exigent d'autres essais."
      ]
    ],
    "evidence": "Croquis, photo, comptage, résultat de traversée.",
    "transfer": "Compare deux solutions de pont en papier avec une même charge."
  },
  {
    "id": "06",
    "title": "Rendre un accès praticable",
    "story": "Des visiteurs doivent atteindre la médiathèque, y compris ceux qui ne peuvent pas franchir de marches.",
    "lesson": "Un cheminement est un trajet continu. Une largeur utile se mesure entre les obstacles. Le modèle de plain-pied illustre l'accessibilité sans certifier les normes réelles.",
    "materials": "Deux couleurs de sol, pierre, panneaux.",
    "module": "commandes.html",
    "steps": [
      [
        "Observe le terrain fourni et dessine les obstacles : marches, rétrécissements, blocages.",
        "Plan avant travaux."
      ],
      [
        "Repère deux itinéraires possibles et identifie celui sans marche au niveau de la porte.",
        "Deux tracés distincts."
      ],
      [
        "Matérialise les deux itinéraires en couleurs ; conserve 2 cases libres de large et retire les obstacles gênants.",
        "Trajets continus et repérables."
      ],
      [
        "Pose des panneaux ou repères aux bifurcations et à l'entrée.",
        "Un autre élève comprend où aller."
      ],
      [
        "Fais tester les deux trajets par un camarade sans sauter sur le trajet de plain-pied ; note et corrige les obstacles.",
        "Plan après travaux et résultat de deux essais."
      ]
    ],
    "help": [
      [
        "Je passe seulement en sautant",
        "Ce trajet n'est pas de plain-pied : cherche un itinéraire alternatif."
      ],
      [
        "Le chemin a deux blocs mais un panneau gêne",
        "Compte uniquement la largeur réellement libre."
      ],
      [
        "Les visiteurs se perdent",
        "Ajoute des repères aux changements de direction."
      ],
      [
        "J'ai construit un escalier en guise de rampe",
        "Un escalier de blocs n'est pas une rampe conforme ; privilégie un chemin plat."
      ],
      [
        "Je veux certifier la conformité",
        "Il faut une documentation réglementaire réelle et des mesures adaptées."
      ]
    ],
    "before": [
      [
        "Que signifie un cheminement continu ?",
        "Un trajet sans interruption",
        "Un trajet uniquement décoré",
        "Un trajet avec une porte fermée",
        "Le visiteur doit pouvoir avancer de bout en bout."
      ],
      [
        "Quel passage est imposé ?",
        "2 blocs libres",
        "2 blocs occupés",
        "1 bloc libre",
        "La largeur utile est de 2."
      ]
    ],
    "after": [
      [
        "Un passage impose de sauter : que conclure ?",
        "Il n'est pas de plain-pied",
        "Il est toujours accessible",
        "Il respecte automatiquement les normes",
        "Le saut signale une rupture de niveau."
      ],
      [
        "Pourquoi faire tester par un autre élève ?",
        "Repérer des difficultés oubliées",
        "Changer l'échelle",
        "Éviter de documenter",
        "Un regard extérieur vérifie le besoin."
      ],
      [
        "Le modèle suffit-il pour certifier la conformité ?",
        "Non",
        "Oui",
        "Oui si deux couleurs",
        "La réglementation réelle exige d'autres vérifications."
      ]
    ],
    "evidence": "Plans avant/après et tableau obstacle → correction → résultat.",
    "transfer": "Sur un plan réel fourni, étudie la pente d'un accès."
  },
  {
    "id": "07",
    "title": "Organiser une serre et son irrigation",
    "story": "Une association souhaite cultiver des légumes dans une serre avec deux parcelles et un accès facile.",
    "lesson": "L'irrigation distribue l'eau vers les zones cultivées. La source, le canal et les parcelles constituent un système. Le jeu ne donne pas un débit réel.",
    "materials": "Verre, bois, pierre, terre, seau d'eau, houe, graines.",
    "module": "commandes.html",
    "steps": [
      [
        "Sur papier trace 9 × 7 cases : entrée, deux parcelles, canal et allées. Marque les zones où marcher.",
        "Plan légendé avant réalisation."
      ],
      [
        "Pose le contour et monte les parois, en laissant une ouverture de 1 × 2. Prépare un toit au-dessus des murs.",
        "Enveloppe de serre et entrée libre."
      ],
      [
        "Creuse une ligne centrale d'un bloc de profondeur, avec extrémités contenues ; sélectionne le seau d'eau et verse dans le canal.",
        "L'eau reste dans la zone prévue."
      ],
      [
        "Pose les deux bandes de terre près de l'eau sans supprimer les allées. Sélectionne la houe puis clique sur la terre ; utilise les graines sur la terre labourée.",
        "Deux parcelles et deux accès praticables."
      ],
      [
        "Parcours les allées, dessine source → canal → parcelles, puis ajoute le toit si tu l'avais laissé ouvert pour travailler.",
        "La circulation est possible ; le circuit est expliqué."
      ]
    ],
    "help": [
      [
        "L'eau déborde",
        "Ferme les extrémités du canal et vérifie la hauteur des bords."
      ],
      [
        "Je ne peux pas semer",
        "Utilise de la terre labourée avec la houe et laisse assez de place et de lumière."
      ],
      [
        "Mes cultures occupent l'allée",
        "Déplace une rangée : distingue la zone de circulation et la zone cultivée."
      ],
      [
        "Je ne vois plus l'intérieur",
        "Prends une vue du dessus avant de fermer le toit."
      ],
      [
        "Je veux mesurer le débit réel",
        "Le modèle montre la distribution, pas un débit mesurable en litres par minute."
      ]
    ],
    "before": [
      [
        "À quoi sert le canal ?",
        "Distribuer l'eau",
        "Stocker les outils",
        "Commander la porte",
        "Le canal conduit l'eau vers les cultures."
      ],
      [
        "Que faut-il avant de semer des graines de blé ?",
        "Labourer la terre",
        "Poser du verre",
        "Poser une lampe Redstone",
        "La houe prépare la terre cultivable."
      ]
    ],
    "after": [
      [
        "Pourquoi préserver des allées ?",
        "Permettre l'entretien",
        "Remplacer l'eau",
        "Réduire la hauteur",
        "L'utilisateur doit accéder aux cultures."
      ],
      [
        "Quel schéma décrit la distribution ?",
        "Source → canal → parcelles",
        "Parcelles → toit → porte",
        "Houe → lampe → verre",
        "Il représente le trajet de l'eau."
      ],
      [
        "Peut-on déduire un débit réel du jeu ?",
        "Non",
        "Oui en comptant les blocs",
        "Oui en volant",
        "Le débit physique n'est pas simulé quantitativement."
      ]
    ],
    "evidence": "Vue de dessus, schéma de distribution et justification de l'organisation.",
    "transfer": "Propose un arrosage commandé, représenté symboliquement."
  },
  {
    "id": "08",
    "title": "Commander une lampe",
    "story": "Dans un atelier, l'utilisateur doit pouvoir allumer ou éteindre l'éclairage depuis l'entrée.",
    "lesson": "Une entrée reçoit une commande ; la Redstone transmet un signal numérique ; la lampe est un actionneur lumineux. 0 = inactif, 1 = actif.",
    "materials": "1 levier, 3 poudres de Redstone, 1 lampe de Redstone, 5 blocs pleins.",
    "module": "redstone.html",
    "steps": [
      [
        "Dans E, cherche levier, poudre de Redstone, lampe de Redstone et pierre. Place-les dans la barre rapide.",
        "Quatre types de matériel prêts."
      ],
      [
        "Pose cinq supports alignés et jointifs. Clique droit sur le dessus du premier avec le levier sélectionné.",
        "Levier en position 1 de la ligne."
      ],
      [
        "Pose une poudre sur chacun des trois supports suivants ; pose la lampe au bout à la hauteur de la poudre (sur le cinquième support).",
        "Levier → 3 poudres → lampe, même niveau."
      ],
      [
        "Clique droit sur le levier pour basculer son état. Observe la couleur du signal et la lampe ; rebascule.",
        "Deux états distincts observés."
      ],
      [
        "Avant de regarder le corrigé, note pour chaque essai l'entrée prévue, la sortie attendue et la sortie observée. Prends deux photos.",
        "Le circuit et les deux états sont documentés."
      ]
    ],
    "help": [
      [
        "La poudre ne se pose pas",
        "Vise le dessus d'un bloc plein et clique droit."
      ],
      [
        "La lampe ne s'allume pas",
        "Teste d'abord le levier, puis la continuité et le niveau de la poudre."
      ],
      [
        "La lampe reste allumée",
        "Vérifie que le levier est OFF et qu'aucune autre source n'alimente la ligne."
      ],
      [
        "Je confonds poudre et lampe",
        "Recherche les noms séparément dans l'inventaire."
      ],
      [
        "Je ne comprends pas 0 et 1",
        "0 signifie commande inactive ; 1 signifie commande active."
      ]
    ],
    "before": [
      [
        "Quel composant reçoit la commande manuelle ?",
        "Le levier",
        "La lampe",
        "La poudre",
        "Le levier change l'état de l'entrée."
      ],
      [
        "Quel composant transmet le signal ?",
        "La poudre de Redstone",
        "Le verre",
        "La lampe",
        "La poudre forme la liaison."
      ]
    ],
    "after": [
      [
        "Que devrait faire une lampe alimentée ?",
        "S'allumer",
        "Se déplacer",
        "Éteindre le levier",
        "La lampe réalise la sortie lumineuse."
      ],
      [
        "Si le levier est OFF et la lampe allumée, que faire ?",
        "Chercher une autre alimentation",
        "Ajouter un toit",
        "Changer la largeur du sol",
        "Une autre source peut maintenir le signal."
      ],
      [
        "La valeur Redstone 15 représente-t-elle 15 volts ?",
        "Non",
        "Oui",
        "Seulement avec un levier",
        "C'est une force de signal propre au jeu."
      ]
    ],
    "evidence": "Deux photos ON/OFF, tableau de test et schéma entrée → liaison → sortie.",
    "transfer": "Allonge la ligne et teste avec et sans répéteur."
  },
  {
    "id": "09",
    "title": "Éclairage à deux commandes",
    "story": "Deux personnes situées à deux entrées souhaitent pouvoir allumer une même lampe dès que l'une commande l'éclairage.",
    "lesson": "La fonction OU est vraie quand au moins une entrée est active. Ce montage n'est pas un va-et-vient domestique : une commande ne peut pas éteindre la lampe tant que l'autre reste active.",
    "materials": "2 leviers, poudre de Redstone, 1 lampe, 2 répéteurs si nécessaire.",
    "module": "redstone.html",
    "steps": [
      [
        "Dessine deux entrées A et B et une lampe S ; prévois les quatre combinaisons sans consulter la correction.",
        "Tableau de quatre lignes préparé."
      ],
      [
        "Pose les deux leviers à quatre blocs l'un de l'autre, sur des supports pleins.",
        "Deux commandes indépendantes."
      ],
      [
        "Trace deux chemins de poudre qui convergent en T. Oriente les répéteurs éventuels vers la jonction.",
        "Deux branches rejoignent une sortie."
      ],
      [
        "Prolonge la jonction jusqu'à la lampe. Teste d'abord A seul, puis B seul.",
        "Chaque branche peut allumer la lampe."
      ],
      [
        "Teste 00, 01, 10, 11 en remettant les commandes au bon état à chaque fois. Compare prévu et observé.",
        "Quatre essais consignés."
      ]
    ],
    "help": [
      [
        "B ne commande rien",
        "Vérifie la continuité de la branche B jusqu'à la jonction."
      ],
      [
        "Les branches s'influencent",
        "Essaie des répéteurs orientés vers la jonction."
      ],
      [
        "La lampe ne s'éteint pas avec A",
        "Vérifie si B est encore actif : c'est le comportement OU."
      ],
      [
        "Je confonds 01 et 10",
        "Écris A en premier, B en second, avec les deux valeurs."
      ],
      [
        "Je veux un vrai va-et-vient",
        "Il nécessite une autre logique ; ne confonds pas les deux cahiers des charges."
      ]
    ],
    "before": [
      [
        "Combien d'états pour 2 entrées binaires ?",
        "4",
        "2",
        "8",
        "Chaque entrée a deux états : 2 × 2."
      ],
      [
        "Que signifie A=0 ?",
        "A inactive",
        "A active",
        "A détruite",
        "0 code l'état inactif."
      ]
    ],
    "after": [
      [
        "OU : A=0, B=1, quelle sortie ?",
        "1",
        "0",
        "2",
        "Au moins une entrée est active."
      ],
      [
        "OU : quand la lampe est-elle éteinte ?",
        "Les deux entrées sont inactives",
        "Une seule est inactive",
        "Les deux sont actives",
        "Seul 00 produit 0."
      ],
      [
        "B reste actif et A passe de 1 à 0 : que fait la lampe ?",
        "Reste allumée",
        "S'éteint",
        "Clignote forcément",
        "B suffit à maintenir la sortie."
      ]
    ],
    "evidence": "Tableau de quatre essais et photo ; explique pourquoi ce n'est pas un va-et-vient.",
    "transfer": "Compare au défi 11 : quelle condition change ?"
  },
  {
    "id": "10",
    "title": "Porte à ouverture sur présence",
    "story": "Un visiteur souhaite entrer dans un bâtiment sans devoir manipuler une poignée.",
    "lesson": "Un capteur détecte une situation ; un signal commande un actionneur. La plaque de pression détecte un contact, la porte de fer exécute l'ouverture.",
    "materials": "1 porte en fer, 2 plaques de pression en pierre, blocs de mur.",
    "module": "redstone.html",
    "steps": [
      [
        "Dessine la porte vue de dessus et marque une plaque de chaque côté.",
        "Tu distingues les deux zones d'approche."
      ],
      [
        "Construis un mur avec une ouverture de 1 × 2 ; place la porte de fer sur le sol dans l'ouverture.",
        "Porte fermée au repos."
      ],
      [
        "Pose une plaque sur le bloc de sol immédiatement devant la porte et une autre derrière.",
        "Deux plaques adjacentes à la zone de commande."
      ],
      [
        "Marche sur la première plaque puis quitte-la. Refais le test depuis l'autre côté.",
        "La porte s'ouvre et revient fermée."
      ],
      [
        "Documente attente, passage, fermeture ; explique détection → signal → ouverture.",
        "Trois états et une chaîne fonctionnelle."
      ]
    ],
    "help": [
      [
        "Le clic droit n'ouvre pas la porte",
        "La porte en fer nécessite un signal ; teste la plaque."
      ],
      [
        "Une plaque ne fonctionne pas",
        "Vérifie qu'elle est adjacente et au bon niveau."
      ],
      [
        "La porte reste ouverte",
        "Quitte les plaques et vérifie les autres sources de signal."
      ],
      [
        "Le joueur reste bloqué",
        "Teste le dégagement sur les deux côtés et replace les plaques."
      ],
      [
        "Je crois que la porte est sûre",
        "Le modèle ne simule pas une protection anti-écrasement réelle."
      ]
    ],
    "before": [
      [
        "Quel composant détecte le passage par contact ?",
        "Plaque de pression",
        "Porte en fer",
        "Verre",
        "La plaque change d'état quand un joueur se trouve dessus."
      ],
      [
        "Quel élément réalise l'action ?",
        "La porte",
        "La plaque",
        "Le sol",
        "La porte est l'actionneur."
      ]
    ],
    "after": [
      [
        "Quand le joueur quitte les plaques, quel état attendu ?",
        "Porte fermée",
        "Porte toujours ouverte",
        "Porte détruite",
        "Le signal cesse après libération."
      ],
      [
        "Pourquoi tester les deux côtés ?",
        "Vérifier les deux sens d'accès",
        "Mesurer la température",
        "Augmenter le nombre de portes",
        "Le cahier des charges exige les deux sens."
      ],
      [
        "Que ne prouve pas le modèle ?",
        "Une sécurité anti-écrasement réelle",
        "Le déclenchement virtuel",
        "La présence des plaques",
        "La sécurité réelle exige d'autres capteurs et essais."
      ]
    ],
    "evidence": "Trois photos ou vidéo et schéma de la chaîne fonctionnelle.",
    "transfer": "Remplace une plaque par un bouton et compare."
  },
  {
    "id": "11",
    "title": "Double autorisation",
    "story": "Dans une zone technique, le conducteur demande l'accès et le gardien doit l'autoriser. Les deux conditions doivent être vraies.",
    "lesson": "ET signifie que les deux entrées sont actives ; NON inverse un état ; OU est vrai si au moins une entrée est active. Deux inverseurs suivis d'un OU puis d'un NON réalisent ET.",
    "materials": "2 leviers, 3 torches de Redstone, poudre, blocs pleins, lampe témoin ; porte en fer après validation.",
    "module": "redstone.html",
    "steps": [
      [
        "Sur papier, prédis les quatre situations demande/autorisation ; teste le simulateur logique après avoir fait tes prévisions.",
        "Tableau de quatre prévisions."
      ],
      [
        "Monte un inverseur seul : levier sur une face d'un bloc plein, torche sur la face opposée. Teste OFF puis ON avec la torche.",
        "La torche réagit à l'inverse de l'entrée."
      ],
      [
        "Reproduis ce montage pour B. Relie les sorties des deux torches vers une jonction OU, en évitant les retours vers les entrées.",
        "Chaque entrée peut être vérifiée séparément."
      ],
      [
        "Fais arriver la jonction sur un bloc plein portant une troisième torche, puis relie cette sortie à la lampe témoin.",
        "Le signal final est inversé."
      ],
      [
        "Teste 00, 01, 10, 11 ; si tout correspond, relie la sortie à la porte. Vérifie qu'elle se referme quand une condition cesse.",
        "Quatre observations et un test de fermeture."
      ]
    ],
    "help": [
      [
        "Je ne comprends pas NON",
        "Teste seulement levier et torche : observe leurs états opposés."
      ],
      [
        "La torche reste éteinte",
        "Vérifie la position sur la face du bloc et l'alimentation de ce bloc."
      ],
      [
        "La lampe s'allume pour une seule entrée",
        "Teste les inverseurs et la dernière torche séparément."
      ],
      [
        "A modifie le circuit de B",
        "Éloigne les branches et contrôle le sens des répéteurs éventuels."
      ],
      [
        "La porte ne réagit pas",
        "Valide d'abord avec la lampe témoin, puis vérifie le raccordement de la porte."
      ]
    ],
    "before": [
      [
        "Quel composant peut servir d'inverseur ?",
        "Torche de Redstone sur bloc commandé",
        "Poudre seule",
        "Lampe seule",
        "La torche s'éteint si son support est alimenté."
      ],
      [
        "Pour 2 entrées, combien de tests complets ?",
        "4",
        "1",
        "3",
        "Il faut couvrir les quatre combinaisons."
      ]
    ],
    "after": [
      [
        "ET : demande oui, autorisation non, sortie ?",
        "0",
        "1",
        "2",
        "Les deux conditions doivent être vraies."
      ],
      [
        "ET : quelle combinaison ouvre ?",
        "11",
        "01",
        "10",
        "Les deux entrées sont actives."
      ],
      [
        "Si la porte s'ouvre à tort, premier contrôle utile ?",
        "Tester chaque inverseur et la sortie témoin",
        "Décorer la porte",
        "Supprimer les tests",
        "Isoler les sous-circuits aide à localiser la panne."
      ]
    ],
    "evidence": "Table de vérité complétée par tes essais, schéma et photo.",
    "transfer": "Ajoute un voyant d'état fermé, puis vérifie son comportement."
  },
  {
    "id": "12",
    "title": "Transport sur rails",
    "story": "Un atelier doit acheminer une charge fictive vers le stockage en comparant une commande active et inactive.",
    "lesson": "Un rail ordinaire guide le wagonnet ; un rail propulseur alimenté l'accélère et non alimenté peut le freiner. Une expérience comparative conserve les mêmes conditions initiales.",
    "materials": "6 rails ordinaires, 4 rails de propulsion, levier, wagonnet, butées.",
    "module": "redstone.html",
    "steps": [
      [
        "Trace une piste droite de 10 cases sur un sol plat ; indique départ et arrivée.",
        "Dix emplacements alignés."
      ],
      [
        "Pose les rails ordinaires aux extrémités et quatre rails de propulsion au milieu. Place les butées aux extrémités.",
        "Rails continus et orientés."
      ],
      [
        "Installe le levier à proximité du segment propulseur ; vérifie visuellement quels rails reçoivent le signal.",
        "Un état ON et un état OFF identifiables."
      ],
      [
        "Place le wagonnet au même point de départ. Donne une impulsion comparable pour les deux essais OFF puis ON ; note comment tu la reproduis.",
        "Deux essais comparables autant que possible."
      ],
      [
        "Note si le wagonnet atteint l'arrivée et où il s'arrête. Si le départ n'est pas comparable, répète.",
        "Résultats et limites du protocole."
      ]
    ],
    "help": [
      [
        "Les rails ne s'alignent pas",
        "Retire le rail mal orienté puis replace-le sur la ligne."
      ],
      [
        "Le wagonnet ne démarre pas",
        "Donne une impulsion initiale identique ou utilise un dispositif de départ reproductible."
      ],
      [
        "Le rail propulseur reste inactif",
        "Vérifie le levier et sa liaison au segment."
      ],
      [
        "Mes deux essais partent de positions différentes",
        "Reviens au même repère avant chaque test."
      ],
      [
        "Le wagonnet dépasse la piste",
        "Vérifie les butées, puis répète."
      ]
    ],
    "before": [
      [
        "Quel rail modifie la vitesse lorsqu'il est alimenté ?",
        "Rail de propulsion",
        "Rail ordinaire",
        "Bloc de butée",
        "Il accélère un wagonnet en mouvement."
      ],
      [
        "Quelle variable doit changer dans l'expérience ?",
        "L'état du levier",
        "La position de départ",
        "La longueur de piste",
        "Il faut isoler l'effet de la commande."
      ]
    ],
    "after": [
      [
        "Pourquoi garder la même impulsion initiale ?",
        "Comparer l'effet de l'alimentation",
        "Changer le trajet",
        "Éviter la mesure",
        "Les conditions initiales doivent être comparables."
      ],
      [
        "Un rail propulseur non alimenté peut…",
        "Freiner",
        "Toujours accélérer",
        "Téléporter le wagonnet",
        "Le rail inactif peut agir comme frein."
      ],
      [
        "Si les essais commencent différemment, que faire ?",
        "Recommencer avec un départ comparable",
        "Conclure immédiatement",
        "Supprimer l'essai OFF",
        "Sinon on ne sait pas ce qui explique la différence."
      ]
    ],
    "evidence": "Plan, deux observations ON/OFF, conclusion et limite expérimentale.",
    "transfer": "Ajoute une détection de passage et un voyant."
  },
  {
    "id": "13",
    "title": "Programmer l'Agent pour livrer",
    "story": "Un robot doit livrer un colis au repère vert en suivant un parcours en U, sans intervention manuelle.",
    "lesson": "Un algorithme est une suite ordonnée d'instructions. Avancer déplace l'Agent ; tourner change son orientation sans le déplacer. Un événement chat déclenche le programme.",
    "materials": "Monde avec parcours, Agent, Code Builder et MakeCode.",
    "module": "code.html",
    "steps": [
      [
        "Ouvre le monde et repère départ bleu et arrivée verte. Dessine le trajet : 4 cases vers +X, 3 vers +Z, 4 vers −X.",
        "Plan et flèches avant code."
      ],
      [
        "Place-toi au départ face à +X ; ouvre Code Builder avec C. Crée un projet et teste la téléportation de l'Agent au joueur ; vérifie son orientation, ajuste si nécessaire.",
        "Agent au départ, face au premier segment."
      ],
      [
        "Dans Joueur, ajoute l'événement de commande chat livraison. Dans Agent, ajoute avancer de 4 et teste ce seul segment.",
        "Le robot atteint le premier virage."
      ],
      [
        "Remets-le au départ et complète : tourner à droite, avancer de 3, tourner à droite, avancer de 4.",
        "Cinq instructions de trajet dans le bon ordre."
      ],
      [
        "Lance le projet puis tape livraison dans le chat sans /. Compare l'arrivée prévue et observée ; corrige, enregistre le projet et prends une photo.",
        "11 déplacements, 2 rotations et arrivée au repère."
      ]
    ],
    "help": [
      [
        "C n'ouvre pas Code Builder",
        "Vérifie la touche dans les réglages et les autorisations avec le professeur."
      ],
      [
        "Le chat ne lance rien",
        "Vérifie que le projet est lancé et tape livraison sans barre oblique."
      ],
      [
        "L'Agent avance dans le mauvais sens",
        "Contrôle son orientation avant le départ."
      ],
      [
        "Il avance trop loin",
        "Teste séparément les trois segments et contrôle les paramètres."
      ],
      [
        "Le second essai commence ailleurs",
        "Replace l'Agent et rétablis son orientation avant chaque essai."
      ]
    ],
    "before": [
      [
        "Que fait une instruction tourner ?",
        "Change l'orientation",
        "Avance d'un bloc",
        "Téléporte au joueur",
        "Tourner et avancer sont deux actions différentes."
      ],
      [
        "Quel événement lance le programme proposé ?",
        "Commande chat livraison",
        "Clic sur le verre",
        "Placement de la lampe",
        "Le nom de l'événement doit correspondre au chat."
      ]
    ],
    "after": [
      [
        "4 + 3 + 4 déplacements donnent…",
        "11",
        "13",
        "9",
        "Les rotations ne comptent pas comme déplacements."
      ],
      [
        "Pourquoi replacer l'Agent avant de relancer ?",
        "Reproduire les conditions initiales",
        "Changer la longueur du code",
        "Supprimer les virages",
        "Le trajet dépend de la position et de l'orientation."
      ],
      [
        "Si le premier segment est faux, que vérifier d'abord ?",
        "Orientation et nombre de pas",
        "Le toit du bâtiment",
        "Les rails de propulsion",
        "Le premier mouvement détermine le trajet."
      ]
    ],
    "evidence": "Algorithme dessiné, capture du code et photo de l'arrivée.",
    "transfer": "Modifie le segment central de 3 à 5 et prédis l'arrivée."
  },
  {
    "id": "14",
    "title": "Programmer une clôture paramétrable",
    "story": "Le chantier a besoin de clôtures carrées de différentes tailles. Un seul programme doit permettre de les réaliser.",
    "lesson": "Une boucle répète des instructions. Un paramètre n permet de modifier la longueur sans réécrire le programme. Le côté est compté en intervalles ; le placement réel du dernier bloc doit être testé.",
    "materials": "Agent, clôtures en chêne, terrain libre, MakeCode.",
    "module": "code.html",
    "steps": [
      [
        "Dessine un carré de 5 intervalles puis un de 7. Repère les quatre virages.",
        "Deux plans et quatre côtés."
      ],
      [
        "Crée une commande chat ligne ; charge l'Agent en clôtures, sélectionne l'emplacement 1, active le placement en mouvement ; teste avancer de 5 sur une zone dégagée.",
        "Tu observes le premier et le dernier bloc réellement posés."
      ],
      [
        "Crée une commande cloture avec paramètre n. Dans Boucles, répète 4 fois : tourner à gauche puis avancer n. Garde la convention gauche pour tout le programme.",
        "Une boucle et un paramètre."
      ],
      [
        "Désactive la destruction des obstacles ; utilise le modèle de placement final seulement après avoir testé la fermeture sur un petit carré. Désactive le placement à la fin.",
        "Le code ne détruit pas le terrain ; fermeture contrôlée."
      ],
      [
        "Teste cloture 5 puis cloture 7 dans deux zones séparées ; replace l'Agent à chaque fois. Compte les blocs, documente tout écart et corrige.",
        "Deux tailles et résultat de fermeture."
      ]
    ],
    "help": [
      [
        "Le robot n'a plus de clôtures",
        "Charge assez de blocs et vérifie le slot 1 ; le modèle prévoit 4n+1."
      ],
      [
        "Le carré est ouvert",
        "Inspecte le premier et dernier bloc ; ajuste le placement final après un essai."
      ],
      [
        "Le robot heurte sa clôture",
        "Teste le sens de placement sur une ligne et vérifie l'espace libre."
      ],
      [
        "Le programme refuse n",
        "Utilise une valeur de 2 à 12 selon le modèle de code fourni."
      ],
      [
        "La taille ne change pas",
        "Vérifie que le déplacement utilise n, et non une valeur fixe."
      ]
    ],
    "before": [
      [
        "Combien de côtés doit répéter la boucle ?",
        "4",
        "5",
        "2",
        "Le carré possède quatre côtés."
      ],
      [
        "À quoi sert n ?",
        "Modifier la longueur",
        "Choisir la couleur du ciel",
        "Arrêter Minecraft",
        "n paramètre le nombre de pas."
      ]
    ],
    "after": [
      [
        "Que modifier pour passer de 5 à 7 ?",
        "La valeur du paramètre",
        "Le nombre de côtés",
        "Le type de monde",
        "La même boucle construit les deux tailles."
      ],
      [
        "Un côté de 5 intervalles contient combien de positions, extrémités incluses ?",
        "6",
        "5",
        "4",
        "Il y a une position de plus que d'intervalles."
      ],
      [
        "Si un coin reste ouvert, que faire ?",
        "Observer le placement final et ajuster",
        "Déclarer le défi réussi sans test",
        "Supprimer tous les virages",
        "Un test du premier et du dernier bloc permet de déboguer."
      ]
    ],
    "evidence": "Code commenté, deux tailles photographiées et résultats des tests.",
    "transfer": "Propose deux paramètres pour construire un rectangle."
  },
  {
    "id": "15",
    "title": "Robot réactif dans un labyrinthe",
    "story": "Un robot explore un espace inconnu. Il doit réagir devant un obstacle sans le détruire.",
    "lesson": "Une condition choisit entre deux actions. Une boucle de 20 itérations limite le nombre d'actions. Un robot réactif ne connaît pas nécessairement le chemin vers la sortie.",
    "materials": "Agent, deux parcours simples (virage et cul-de-sac), MakeCode.",
    "module": "code.html",
    "steps": [
      [
        "Dessine deux petits parcours : un virage à droite et un cul-de-sac. Indique le départ et l'orientation.",
        "Deux situations de test différentes."
      ],
      [
        "Dans MakeCode, crée l'événement chat labyrinthe. Désactive les assistances de destruction et de placement.",
        "L'Agent ne doit pas modifier les obstacles."
      ],
      [
        "Teste un seul bloc de détection devant l'Agent, puis une condition : si obstacle, tourner à droite ; sinon avancer de 1.",
        "Une décision selon le capteur."
      ],
      [
        "Place cette condition dans une boucle de 20 répétitions. Lance sur le premier parcours.",
        "Au maximum 20 actions, déplacements ou rotations."
      ],
      [
        "Replace le robot au départ du second parcours, relance et note les actions et échecs. Propose une amélioration, par exemple une autre détection ou un arrêt sur une cible.",
        "Deux essais et une limite explicitée."
      ]
    ],
    "help": [
      [
        "Le robot casse un mur",
        "Désactive la destruction automatique."
      ],
      [
        "Il ne détecte rien",
        "Vérifie l'orientation et le bloc de détection devant, pas au-dessous."
      ],
      [
        "Il tourne en rond",
        "Observe la règle : elle ne mémorise pas le trajet ; propose une stratégie."
      ],
      [
        "Il s'arrête avant la sortie",
        "20 itérations limitent toutes les actions, pas uniquement les déplacements."
      ],
      [
        "Le code affiche une erreur",
        "Reconstitue les blocs dans MakeCode ; les noms JavaScript peuvent varier selon version."
      ]
    ],
    "before": [
      [
        "Que fait une condition SI/SINON ?",
        "Choisit une action selon un test",
        "Répète toujours deux actions",
        "Stocke une photo",
        "Une condition décide selon une valeur vraie ou fausse."
      ],
      [
        "Pourquoi limiter à 20 ?",
        "Éviter une exécution sans fin",
        "Garantir la sortie",
        "Construire 20 murs",
        "La limite borne les actions, pas la réussite."
      ]
    ],
    "after": [
      [
        "Obstacle détecté : action prévue ?",
        "Tourner à droite",
        "Avancer",
        "Détruire le mur",
        "La règle impose le virage."
      ],
      [
        "Après 4 virages et 16 pas, combien d'itérations ?",
        "20",
        "16",
        "4",
        "Chaque action consomme une itération."
      ],
      [
        "La règle garantit-elle la sortie de tous labyrinthes ?",
        "Non",
        "Oui",
        "Oui si 20 actions",
        "Sans mémoire ni stratégie globale, le robot peut échouer."
      ]
    ],
    "evidence": "Code, deux résultats et explication d'un échec possible.",
    "transfer": "Ajoute une condition d'arrêt sur un bloc repère."
  },
  {
    "id": "16",
    "title": "Écoquartier intelligent",
    "story": "La commune demande un quartier accessible et organisé. Chaque équipe doit intégrer des solutions techniques et justifier ses choix.",
    "lesson": "Un cahier des charges décrit des besoins et contraintes. Une recette de tests vérifie chaque exigence. Un indicateur sert à comparer des solutions ; les kWh réels ne sont pas calculables dans le jeu.",
    "materials": "Plan partagé ; matériaux selon modules ; budget fictif proposé : structure 1 crédit/bloc, verre 2, composants Redstone 3, autres 1 ; plafond exemple 600 crédits à valider par le professeur.",
    "module": "projet.html",
    "steps": [
      [
        "Séance 1 : répartissez les rôles, choisissez quatre systèmes dont deux automatisés, tracez les zones et une allée accessible ; fixez le budget avec le professeur.",
        "Plan commun, rôles et critères validés."
      ],
      [
        "Séance 2 : chaque équipe dessine et construit son module (serre, accès, éclairage, cheminement par exemple). Notez les blocs ajoutés dans le budget.",
        "Modules identifiés et comptage."
      ],
      [
        "Séance 3 : installez deux automatismes et testez séparément leurs entrées et sorties. Ne reliez les zones qu'après validation.",
        "Deux systèmes fonctionnels et preuves."
      ],
      [
        "Séance 4 : un autre groupe réalise les tests d'accès, de circulation et d'automatisme. Notez attendu, observé, correction, nouveau test.",
        "Recette de tests complétée et corrections."
      ],
      [
        "Séance 5–6 si disponibles : calculez trois indicateurs (surface, longueur des parcours, nombre de composants), comparez les choix, exportez le monde et les programmes ; chacun explique sa contribution.",
        "Dossier et présentation individuels et collectifs."
      ]
    ],
    "help": [
      [
        "Les équipes construisent au même endroit",
        "Répartissez les parcelles et vérifiez le plan avant de modifier."
      ],
      [
        "Le budget est dépassé",
        "Réduisez les éléments non essentiels et recalculez avec le même barème."
      ],
      [
        "Un automatisme fonctionne seul mais pas intégré",
        "Testez les signaux après raccordement et isolez les interférences."
      ],
      [
        "Un élève fait tout",
        "Faites tourner les rôles et exigez une trace individuelle."
      ],
      [
        "Nous avons des kWh inventés",
        "Utilisez des indicateurs mesurables du modèle et indiquez les limites."
      ]
    ],
    "before": [
      [
        "Combien de systèmes au minimum ?",
        "4",
        "2",
        "1",
        "Le projet impose quatre systèmes dont deux automatisés."
      ],
      [
        "Quand définir le cahier des charges ?",
        "Avant de construire",
        "Après l'export seulement",
        "Quand le budget est dépassé",
        "Les critères guident la conception."
      ]
    ],
    "after": [
      [
        "Quel est le but des tests croisés ?",
        "Vérifier les exigences avec un autre groupe",
        "Ajouter des décorations",
        "Remplacer la trace individuelle",
        "Un test indépendant aide à repérer les erreurs."
      ],
      [
        "Quel indicateur peut être mesuré directement dans la maquette ?",
        "Longueur du chemin en blocs",
        "Consommation électrique réelle en kWh",
        "Résistance réelle du béton",
        "Les dimensions virtuelles sont observables."
      ],
      [
        "Une équipe réussit mais un élève ne sait pas expliquer : que faire ?",
        "Évaluer aussi sa compréhension individuelle",
        "Donner automatiquement la même maîtrise",
        "Supprimer les tests",
        "La production collective ne prouve pas chaque apprentissage."
      ]
    ],
    "evidence": "Monde exporté si possible, portfolio, programmes, budget, tableau de tests, trois indicateurs, contribution personnelle.",
    "transfer": "Présente une amélioration argumentée fondée sur les résultats des tests."
  }
];
