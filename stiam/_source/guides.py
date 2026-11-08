# -*- coding: utf-8 -*-
"""Dossiers enseignants placés en tête de chaque séquence (pages niveau/*.html).
Le contenu est chiffré à la génération : il ne s'affiche qu'avec le mot de passe (voir build.py)."""

COMPETENCES_C3_2023 = [
    "Pratiquer des démarches scientifiques et technologiques",
    "Concevoir, créer, réaliser",
    "S'approprier des outils et des méthodes",
    "Pratiquer des langages",
    "Mobiliser des outils numériques",
    "Adopter un comportement éthique et responsable",
    "Se situer dans l'espace et dans le temps",
]

GUIDES = {
    "cm1": dict(
        intention="Faire passer les élèves de « le ciel change » à « c'est notre position par rapport à la lumière qui change ». La séquence suit deux temps nettement séparés : on comprend d'abord (lumière, ombres, phases de la Lune) par une vraie démarche scientifique, puis on conçoit l'instrument qui permet de mesurer de façon fiable (le gnomon) par une démarche technologique.",
        lancement=[
            "Présenter la « commande » dès la première minute : la cour accueille un coin observatoire, la classe doit fabriquer un gnomon et tenir un carnet de la Lune. Afficher la commande au mur pour toute la séquence.",
            "Partir de l'énigme de la Lune visible en plein jour : recueillir les idées sans les corriger (affiche « nos idées de départ »), elles seront relues en séance 6.",
            "Annoncer le plan en deux temps avec les titres des parties : « Les mystères du ciel », puis « Mission gnomon ».",
        ],
        conduite=[
            ("Les mystères du ciel (séances 1 à 5)", "Chaque séance part d'un défi, d'un pari ou d'une énigme ; les élèves écrivent une hypothèse, expérimentent ou observent, puis concluent explicitement sur leur hypothèse. Terminer chaque séance par « ce que ça change pour notre mission » : c'est ce qui maintient la motivation. La séance 3 se fait dehors, par beau temps : la programmer avec souplesse et garder le simulateur en secours."),
            ("Escale (séance 6)", "Les élèves construisent eux-mêmes la synthèse (défi vrai/faux, carte des connaissances, explication à un autre groupe). La trace écrite sert de vérification finale, pas de dictée. Le tableau « connaissance → exigence » fait le pont avec la fabrication."),
            ("Mission gnomon (séances 7 à 10)", "Revenir au problème réel de la séance 3 (relevés qui ne concordent pas). Exiger que chaque exigence du cahier des charges soit justifiée par une connaissance. Les tests sont notés dans un carnet d'essais ; un test raté est une information, pas un échec. La revue de projet devant une autre classe donne un vrai destinataire."),
        ],
        organisation=[
            "Groupes de 3 ou 4 avec rôles tournants : expérimentateur, mesureur, secrétaire, porte-parole.",
            "Un cahier de la mission par groupe : hypothèses, relevés, exigences, carnet d'essais.",
            "Carnet de la Lune individuel, commencé en séance 5, tenu pendant deux lunaisons (environ 8 semaines) : prévoir un rappel hebdomadaire de 5 minutes.",
        ],
        materiel=[
            "Salle occultable, lampes LED, balles claires, figurines de 5 cm, feuilles blanches.",
            "Bâtons de 20 cm, planches, boussoles, mètres rubans (séance 3).",
            "Pour le gnomon : carton très rigide ou contreplaqué 50 cm × 50 cm, baguettes de 12 cm, ficelle, écrous, colle, petits poids.",
            "Un ordinateur ou une tablette pour les simulateurs « ombres » et « Lune ».",
        ],
        difficultes=[
            "« La Lune brille » : faire verbaliser « la Lune est éclairée ».",
            "« Les phases sont l'ombre de la Terre » : l'expérience « je suis la Terre » montre le croissant sans ombre de la tête.",
            "« L'ombre la plus courte est à midi » : à Vienne, vers 12 h en hiver et vers 13 h en été.",
            "On parle de mouvement apparent du Soleil ; la rotation de la Terre est expliquée en 6e.",
        ],
        differenciation=[
            "Coups de pouce dépliables dans chaque séance ; schémas à compléter pour les élèves en difficulté d'écrit.",
            "Pour aller plus loin : comparer les relevés avec le simulateur à une autre date, ou ajouter une graduation des heures au gnomon.",
        ],
        evaluation="Évaluation au fil de l'eau par les bilans (défis variés), évaluation des connaissances en séance 6, évaluation finale par la revue de projet (séance 10) avec la grille à quatre niveaux de l'espace Enseignants.",
        connaissances=[
            "« Produire expérimentalement une ombre (déficit de lumière associé à une source) à l'aide d'un objet opaque » ; « distinguer ombre propre et ombre portée (sur le sol ou sur un écran). »",
            "« Produire des ombres et associer leurs positions et leurs tailles à celles de la source lumineuse et de l'objet opaque. »",
            "« Observer, schématiser et nommer les phases de la Lune. »",
            "« Comparer des réponses à des besoins dans différents contextes. »",
            "« Identifier les fonctions assurées par les différents composants ou formes ou matériaux d'un objet technique. » ; « Représenter graphiquement à l'aide de croquis à main levée les éléments d'un objet technique. » ; « Décrire à l'aide d'un croquis le fonctionnement d'un objet technique. »",
        ],
        competences_titre="Démarches citées par le programme de 2026 (cycle 3)",
        competences=["« l'observation, la catégorisation, la manipulation, l'expérimentation, la modélisation, l'argumentation, la documentation, l'enquête »"],
    ),
    "cm2": dict(
        intention="Corriger une représentation fausse du système solaire (planètes de même taille, régulièrement espacées) en construisant, dans la cour, un parcours à l'échelle des distances. Les élèves comprennent d'abord ce qu'est le système solaire et comment fonctionne une échelle, puis conçoivent et installent le parcours.",
        lancement=[
            "Montrer une affiche « classique » du système solaire et demander : « Si la Terre était à 2 m du Soleil, où serait Neptune ? » Recueillir les estimations (souvent 10 à 15 m).",
            "Présenter la commande : refaire l'exposition de l'école pour que les visiteurs ne se trompent plus.",
        ],
        conduite=[
            ("Voyage dans le système solaire (séances 1 à 5)", "Démarche scientifique : étoile, planète, satellite ; ordre et données des planètes ; unité astronomique et échelle ; critique des images trompeuses ; conditions favorables à la vie. Chaque séance part d'un défi et se termine par ce que cela change pour le parcours. Faire calculer les distances avant toute sortie."),
            ("Escale (séance 6)", "Les élèves construisent la synthèse (défi vrai/faux, carte des connaissances, explication à un autre groupe) puis transforment chaque connaissance en exigence pour le parcours."),
            ("Mission parcours (séances 7 à 9)", "Démarche technologique : mesurer la cour, adapter l'échelle si besoin, comparer trois solutions de panneaux, installer puis faire contrôler par une autre équipe (écart toléré : 20 cm), enfin faire visiter."),
        ],
        organisation=["Équipes de 3 ou 4 ; chaque équipe installe deux planètes et contrôle celles d'une autre équipe.", "Prévoir un créneau d'une heure dans la cour pour l'installation."],
        materiel=["Décamètre, plots ou jalons, panneaux plastifiés, plan de la cour, calculatrices.", "Simulateur « distances » pour tester d'autres échelles."],
        difficultes=["Confusion entre échelle des distances et échelle des tailles : le préciser sur chaque panneau.", "Le parcours montre des distances moyennes, pas les positions des planètes à une date donnée.", "La distance au Soleil n'est pas la seule condition de la vie."],
        differenciation=["Tableau de conversion fourni pour les élèves en difficulté en calcul.", "Pour aller plus loin : calculer la taille du Soleil et de la Terre à la même échelle (2 cm et 0,2 mm)."],
        evaluation="Bilans de séance, contrôle croisé des distances installées, visite commentée évaluée avec la grille de l'espace Enseignants.",
        connaissances=[
            "Programme 2023 (en vigueur au CM2 en 2026-2027) : « Situer la Terre dans le système solaire » ; matériaux et objets techniques : démarche de conception et de réalisation.",
            "Programme 2026 (CM2 à partir de 2027) : « Décrire le mouvement de la Terre par rapport au Soleil et la situer dans le système solaire. » ; « Effectuer des conversions d'unités de distance et de temps. » ; « L'élève réalise une maquette à l'échelle pour les distances en positionnant les différentes planètes par rapport au Soleil. »",
            "Programme 2026, objets techniques : « Rechercher des idées de solutions à l'aide de croquis » ; « Associer une contrainte à un choix de matériau » ; « Organiser le travail de conception d'une maquette et la fabriquer » ; « Comparer des solutions par une analyse critique ».",
        ],
        competences_titre="Compétences travaillées du programme de cycle 3 (2023)",
        competences=COMPETENCES_C3_2023,
    ),
    "6e": dict(
        intention="Comprendre pourquoi la Terre est habitable (lumière du Soleil, jour et nuit, saisons) puis apprendre à produire des données fiables avec une mini-station de mesure, pour distinguer météo et climat et argumenter à partir de données.",
        lancement=[
            "Partir du désaccord entre deux groupes : 20 °C à l'ombre, 30 °C au soleil, au même moment. « Qui a raison ? »",
            "Annoncer la commande : construire une station qui donne des mesures fiables, puis s'en servir pour répondre à une question sur le climat.",
        ],
        conduite=[
            ("Une planète pas comme les autres (séances 1 à 3)", "Démarche scientifique : conditions de la vie, jour et nuit, saisons avec le globe incliné et les éphémérides de Vienne. Les saisons sont un attendu complet : y consacrer une séance entière."),
            ("Escale (séance 4)", "Synthèse construite par les élèves, puis tableau « connaissance → exigence » pour la station (capteur à l'ombre, relevés datés, météo ≠ climat)."),
            ("Mission station météo (séances 5 à 9)", "Démarche technologique : tester les capteurs, comprendre pourquoi deux capteurs diffèrent, fabriquer un abri ventilé, exploiter les relevés en graphique, puis utiliser la station pour répondre à la question du climat avec les données GeoSphere Austria."),
        ],
        organisation=["Relevés à heures fixes pendant cinq jours : planning des équipes affiché.", "Tableur partagé de la classe pour le graphique."],
        materiel=["Globe, lampe, gommettes ; thermomètres ou sondes externes ; coupelles blanches, tige filetée ou entretoises pour l'abri.", "Simulateur des ombres pour la hauteur du Soleil selon la saison."],
        difficultes=["« Il fait plus chaud en été parce que la Terre est plus près du Soleil » : c'est faux, ce sont la hauteur du Soleil et la durée du jour.", "Le capteur de la micro:bit mesure la température du processeur : préférer une sonde externe.", "Cinq jours de relevés décrivent la météo, pas le climat."],
        differenciation=["Graphique pré-gradué pour les élèves en difficulté ; défi de comparaison Vienne-Sydney pour les plus avancés."],
        evaluation="Bilans de séance, protocole et graphique de la classe, conclusion argumentée finale évaluée avec la grille de l'espace Enseignants.",
        connaissances=[
            "« Décrire les conditions qui permettent la présence de la vie sur Terre ».",
            "« Interpréter l'alternance du jour et de la nuit du point de vue d'un observateur sur Terre ».",
            "« Associer l'alternance des saisons à l'inclinaison du Soleil et à la durée du jour » ; « Associer la durée d'une année au mouvement de révolution de la Terre autour du Soleil ».",
            "« Construire une argumentation relative au réchauffement climatique récent, à partir de données ».",
        ],
        competences_titre="Compétences travaillées du programme de cycle 3 (2023)",
        competences=COMPETENCES_C3_2023,
    ),
    "5e": dict(
        intention="Relier un problème réel (la pollution lumineuse empêche d'observer le ciel) à un objet technique à améliorer : le lampadaire. Les élèves comprennent d'abord l'effet de la lumière parasite, puis modifient, réparent, programment et valident un lampadaire miniature.",
        lancement=[
            "Comparer deux photos du ciel nocturne (ville / campagne) ou faire l'expérience de la boîte noire : « Pourquoi voit-on moins d'étoiles en ville ? »",
            "Présenter la commande : le chemin de l'observatoire doit être éclairé sans éclairer le ciel.",
        ],
        conduite=[
            ("Le ciel volé (séances 1 à 3)", "Démarche scientifique : boîte noire, instruments d'observation, cartographie de la lumière perdue autour d'un lampadaire avec le capteur de la micro:bit."),
            ("Escale (séance 4)", "Synthèse construite par les élèves, puis tableau « connaissance → exigence » pour le lampadaire."),
            ("Mission lampadaire (séances 5 à 9)", "Démarche technologique : tableau des exigences, comparaison de capots par la mesure, fabrication et dépannage, analyse et modification d'un programme fourni, fiche de validation avant/après."),
        ],
        organisation=["Binômes ou trinômes ; un poste de mesure fixe (gabarit) pour que toutes les mesures soient comparables."],
        materiel=["Lampadaires miniatures (LED 3 V), cartes micro:bit, capots en carton et adhésif aluminium, ordinateurs avec MakeCode.", "Simulateur « pollution lumineuse »."],
        difficultes=["Les valeurs du capteur de lumière (0 à 255) sont relatives : comparer seulement dans les mêmes conditions.", "Jamais de secteur : LED et alimentation 3 à 5 V."],
        differenciation=["Programme fourni commenté ligne à ligne ; défi bonus : ajouter un détecteur de présence."],
        evaluation="Bilans de séance, tableau des mesures avant/après, programme modifié et fiche de validation, grille de l'espace Enseignants.",
        connaissances=[
            "Thème 1 : « Décrire les interactions entre un objet ou un système technique, son environnement et les utilisateurs » ; « Caractériser et choisir un objet ou un système technique selon différents critères ».",
            "Thème 2 : « Identifier un dysfonctionnement d'un objet technique et y remédier » ; « Comprendre et modifier un programme associé à une fonctionnalité d'un objet ou d'un système technique ».",
            "Thème 3 : « Imaginer, concevoir et réaliser une ou des solutions en réponse à un besoin » ; « Valider les solutions techniques par des simulations ou par des protocoles de tests ».",
            "Repères de 5e : « Analyser un programme simple fourni et tester s'il répond au besoin » ; « Modifier un programme fourni » ; « Repérer visuellement une pièce défectueuse » ; « Réaliser une réparation en suivant un protocole fourni » ; « Fabriquer une solution pour améliorer un OST existant ».",
        ],
        competences_titre="Compétences travaillées dans la séquence",
        competences=None,
    ),
    "4e": dict(
        intention="Comprendre comment une information prise par un satellite arrive au sol : orbites, capteurs, chaîne d'information, codage binaire, transmission par paquets, puis rendre une transmission fiable avec deux cartes micro:bit.",
        lancement=[
            "Montrer une image satellite incomplète (lignes manquantes) : « Que s'est-il passé ? Comment la station peut-elle s'en rendre compte ? »",
            "Présenter la commande : transmettre une mini-image sans perte entre un « satellite » et une « station ».",
        ],
        conduite=[
            ("Des yeux dans l'espace (séances 1 et 2)", "Démarche scientifique, volontairement courte en technologie : orbites et périodes, images satellites, résolution et fausses couleurs."),
            ("Escale (séance 3)", "Synthèse construite par les élèves, puis tableau « connaissance → exigence » pour la transmission (bits, paquets numérotés, groupes radio)."),
            ("Mission transmission (séances 4 à 10)", "Démarche technologique : capteurs de la micro:bit, chaînes d'information et d'énergie, atelier débranché sur les paquets, programmation radio, retransmission des paquets perdus, mesure de fiabilité, revue de projet."),
        ],
        organisation=["Binômes satellite / station ; un groupe radio différent par équipe dès la séance 6."],
        materiel=["Deux cartes micro:bit par équipe avec piles, ordinateurs avec MakeCode, images 8 × 8 imprimées.", "Simulateur « images et paquets »."],
        difficultes=["La maquette n'est pas un satellite : pas d'orbite ni de liaison spatiale.", "radio.sendString est limité à 19 caractères.", "Bien distinguer donnée (bits) et information (image)."],
        differenciation=["Programmes fournis à compléter ; défi : ajouter un accusé de réception automatique."],
        evaluation="Bilans de séance, tableau des tests de fiabilité, programmes commentés et revue de projet, grille de l'espace Enseignants.",
        connaissances=[
            "Thème 2 : « Décrire et caractériser l'organisation interne d'un objet ou d'un système technique et ses échanges avec son environnement (énergies, données) » ; « Identifier un dysfonctionnement d'un objet technique et y remédier ».",
            "Thème 3 : « Concevoir, écrire, tester et mettre au point un programme » ; « Valider les solutions techniques par des simulations ou par des protocoles de tests ».",
            "Repères de 4e : « Identifier les constituants de la chaîne d'information d'un objet réel et les associer à leur fonction » ; « Modifier un algorithme permettant de répondre au besoin ou au problème posé » ; « Traduire un algorithme […] en un programme » ; « Résoudre des problèmes pour assurer la communication entre les différents terminaux dans un réseau informatique » ; « Proposer un protocole permettant de vérifier l'origine d'un dysfonctionnement ».",
        ],
        competences_titre="Compétences travaillées dans la séquence",
        competences=None,
    ),
    "3e": dict(
        intention="Faire comprendre pourquoi un robot d'exploration doit être autonome (délai Terre-Mars) puis conduire un vrai projet d'ingénierie : cahier des charges, algorithme, choix du capteur, prototype, programme structuré, campagne d'essais et revue de projet.",
        lancement=[
            "Calculer avec les élèves le temps que met un ordre pour aller jusqu'à Mars (3 à 22 minutes) : « Peut-on piloter un rover comme une voiture télécommandée ? »",
            "Présenter la commande : concevoir un rover miniature qui évite seul les obstacles et le prouver par 20 essais.",
        ],
        conduite=[
            ("Destination Mars (séances 1 et 2)", "Démarche scientifique, volontairement courte en technologie : données de Mars et calcul du délai de communication ; le besoin d'autonomie en découle, et le cahier des charges est rédigé en fin de séance 2."),
            ("Escale (séance 3)", "Synthèse construite par les élèves ; chaque exigence du cahier des charges est reliée à une connaissance."),
            ("Mission rover (séances 4 à 11)", "Démarche technologique : fonctionnement d'un rover et trajet des données, algorigramme, comparaison de capteurs, prototype, programmation structurée, campagne de 20 essais, amélioration et revue de projet."),
        ],
        organisation=["Équipes de 3 ou 4 avec un chef de projet tournant ; dossier de projet partagé."],
        materiel=["Châssis robot (mBot, Maqueen, Cutebot ou maison), capteurs ultrasons et infrarouge, cartes micro:bit, ordinateurs avec MakeCode, parcours d'obstacles.", "Simulateur « rover autonome »."],
        difficultes=["Un robot de classe n'est pas un rover spatial : le dire explicitement.", "Le délai Terre-Mars varie selon les positions des planètes.", "Les blocs moteurs dépendent du robot utilisé."],
        differenciation=["Algorigramme à compléter ; défi : ajouter une mesure d'autonomie énergétique."],
        evaluation="Bilans de séance, campagne de 20 essais, dossier de revue de projet et présentation, grille de l'espace Enseignants.",
        connaissances=[
            "Thème 1 : « Caractériser et choisir un objet ou un système technique selon différents critères ».",
            "Thème 2 : « Décrire et caractériser l'organisation interne d'un objet ou d'un système technique et ses échanges avec son environnement (énergies, données) » ; « Identifier un dysfonctionnement d'un objet technique et y remédier ».",
            "Thème 3 : « Imaginer, concevoir et réaliser une ou des solutions en réponse à un besoin, à des exigences » ; « Valider les solutions techniques par des simulations ou par des protocoles de tests » ; « Concevoir, écrire, tester et mettre au point un programme ».",
            "Repères de 3e : « Élaborer ou concevoir un algorithme […] puis le traduire en un programme structuré » ; « Réaliser et mettre au point un programme commandant un système réel incluant une interaction entre un humain et une machine » ; « Décrire un OST en caractérisant sa chaîne d'information » ; « Identifier et représenter la circulation d'une information dans le réseau Internet » ; « Formuler des hypothèses expliquant le dysfonctionnement d'un objet technique ».",
        ],
        competences_titre="Compétences travaillées dans la séquence",
        competences=None,
    ),
}
