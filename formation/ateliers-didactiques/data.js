/* « Ateliers didactiques » (rotation 3 × 20 min + bilan) — données communes (105 min).
   Une seule source pour la page d'accueil, la page atelier et le bilan. */
window.PUZZLE = {
  filRouge: 'À quel moment la difficulté aide-t-elle à apprendre, et à quel moment empêche-t-elle de penser ?',
  lunettes: [
    {id: 'dida', nom: 'Didactique', couleur: '#245d8a', pale: '#eaf3fb', titre: 'L’obstacle',
     question: 'Où un élève de 3e bloquerait-il, hésiterait-il ou dirait-il faux ? Quelle représentation se cacherait derrière, et sous quelle forme exacte apparaîtrait-elle ?'},
    {id: 'peda', nom: 'Pédagogique', couleur: '#c2185b', pale: '#fbe8f0', titre: 'L’aide minimale',
     question: 'Écrivez mot pour mot la relance que vous diriez à un élève bloqué au même endroit, sans donner la réponse. Puis l’aide de second niveau si la première échoue.'},
    {id: 'cogn', nom: 'Cognitive', couleur: '#9a6900', pale: '#fff5d9', titre: 'La question différée',
     question: 'Écrivez la question que vous poseriez quinze jours plus tard, sur une situation nouvelle, pour distinguer « il a compris » de « il a réussi ». Quelle réponse le prouverait ?'}
  ],
  parcours: [
    {
      id: 'reseaux', lettre: 'R', nom: 'Réseaux', couleur: '#0e6e6b',
      accroche: 'Le site existe… mais où est-il ?',
      lien: '../reseaux/index.html',
      contexte: '<p><strong>Situation.</strong> PC1 et PC2 communiquent. PC3 n’arrive pas à joindre PC1. Le smartphone joint PC1, mais pas le serveur Web situé sur un autre réseau. Un collègue affirme : « C’est le DNS, et il faut changer le switch. »</p><div class="docs"><div><strong>Relevé 1</strong><br>PC1 : 192.168.10.21 /24<br>PC2 : 192.168.10.22 /24<br>PC3 : 192.168.20.23 /24</div><div><strong>Relevé 2</strong><br>Smartphone : 192.168.10.80 /24<br>Passerelle : non renseignée<br>DNS : 192.168.10.1</div></div>',
      questions: [
        'Sans rien manipuler, prédisez quels couples de machines communiquent directement. Justifiez avec le masque : « même réseau » ne suffit pas, montrez le raisonnement.',
        'Le smartphone joint PC1 mais pas le serveur distant. Quelle configuration manque ? Pourquoi le symptôme n’est-il que partiel ?',
        'Réfutez le collègue : proposez un test précis (commande, résultat attendu, conclusion) qui montre que ni le DNS ni le switch ne sont en cause pour PC3.',
        'Expliquez en une phrase la différence entre résolution de nom et acheminement, sans les mots « traduction » ni « annuaire ».',
        'Expliquez à un élève de 3e, en trois phrases maximum et sans le mot « masque », pourquoi PC3 a besoin d’un routeur.'
      ],
      revelation: '',
      aides: [
        'Relance : « Comparez les documents ligne par ligne. Qu’est-ce qui change d’un poste à l’autre ? »',
        'Indice : « Le poste connaît le nom du site. Connaît-il l’adresse à joindre ? Qui pourrait la lui fournir ? »',
        'Indice : « Avec /24, quelle partie de l’adresse désigne le réseau ? Comparez-la pour PC1 et pour PC3. »',
        'Exemple : « Deux maisons rue des Lilas, une rue des Roses : qui faut-il pour passer d’une rue à l’autre ? »'
      ],
      attendu: 'Avec /24, les trois premiers octets désignent le réseau : PC1, PC2 et le smartphone sont sur 192.168.10, PC3 sur 192.168.20. PC3 ne peut joindre PC1 qu’à travers un routeur. Sans passerelle, le smartphone ne sort pas de son réseau : il joint PC1 (même réseau) mais pas le serveur distant. Test : ping de l’adresse IP de PC1 depuis PC3 (échec sans passerelle ni routeur) : ni nom, ni DNS, ni switch en jeu. Le DNS associe un nom à une adresse ; l’acheminement fait voyager les paquets jusqu’à cette adresse.',
      eclairage: {titre: 'Représentations initiales et changement conceptuel',
        texte: 'L’élève n’arrive jamais vide : « le Wi‑Fi, c’est Internet », « le DNS envoie les données ». Une croyance ne disparaît pas parce qu’on donne la bonne réponse. Il faut la rendre visible (prédire), la mettre à l’épreuve (confronter), puis proposer un modèle plus explicatif et le faire réutiliser.',
        retenir: 'Faire émerger la représentation avant de formaliser : on sait alors ce qu’il faut vraiment reconstruire.'},
      pourEleves: 'Distinguer réseau local, Internet et Web ; rôle du DNS et de l’adresse IP ; idée de paquet ; rôle d’un routeur ; notion de chemin et de coût.',
      pourVous: 'TCP en détail, masques de sous-réseau, algorithme de Dijkstra et sa programmation en Python : culture de l’enseignant, à doser pour la classe.'
    },
    {
      id: 'donnees-decision', lettre: 'D', nom: 'Données & décision', couleur: '#245d8a',
      accroche: 'Quand la donnée nous trompe',
      lien: '../donnees-decision/index.html',
      contexte: '<p><strong>Situation.</strong> Deux fabricants proposent au collège un détecteur d’incendie « intelligent ».<br><strong>Détecteur A :</strong> « 99 % de réussite sur 10 000 situations testées. »<br><strong>Détecteur B :</strong> « 95 % de réussite sur les mêmes 10 000 situations. »</p>',
      questions: [
        'Avant d’en savoir plus : lequel installeriez-vous ? Chacun note son choix et sa raison, sans en discuter. (Répondez avant la révélation.)',
        'Après la révélation : pour A et pour B, calculez le taux de réussite global, la part des incendies détectés, et la part des alertes qui sont de vrais incendies.',
        'B se trompe plus souvent que A. Pourquoi est-il pourtant meilleur ? Et 85 % de ses alertes sont fausses : est-ce acceptable ? Selon quel critère ?',
        'On peut réduire les fausses alertes de B en relevant son seuil. Que perd-on ? Qui doit fixer ce compromis : le programme, le fabricant ou le collège ? Argumentez.',
        'Rédigez pour des élèves de 3e une question qui fait apparaître ce piège sans aucun calcul de pourcentage.'
      ],
      revelation: 'Sur les 10 000 situations, 9 900 sont « pas d’incendie » et 100 sont « incendie ».<br><strong>A</strong> répond <strong>toujours</strong> « pas d’incendie ».<br><strong>B</strong> détecte 90 des 100 incendies, et donne 495 fausses alertes sur les 9 900 situations sans incendie.',
      aides: [
        'Relance : « 99 % de réussite… 99 % de quoi, exactement ? »',
        'Indice : « Sur les 10 000 situations, combien contiennent vraiment un incendie ? »',
        'Relance : « Un détecteur qui ne sonnerait jamais : quel score de réussite obtiendrait-il ? »',
        'Indice : « Sur les 100 incendies, combien le système en a-t-il détectés ? »'
      ],
      attendu: 'A : 9 900 / 10 000 = 99 % de réussite, 0 incendie détecté sur 100. B : 90 + 9 405 = 9 495 bonnes réponses, soit environ 95 % ; 90 % des incendies détectés ; 90 alertes vraies sur 585, soit environ 15 % : environ 85 % des alertes sont fausses. Une fausse alerte coûte une évacuation, une alerte manquée peut coûter des vies : le critère dépend du coût de chaque erreur, et ce choix est humain (collège, fabricant), pas « décidé » par le programme. Relever le seuil réduit les fausses alertes mais fait manquer des incendies.',
      eclairage: {titre: 'Intuition trompeuse et difficulté productive',
        texte: 'Un chiffre convaincant déclenche une réponse rapide et intuitive. Le piège n’est formateur que si l’élève peut en sortir : le but est clair, les prérequis sont réactivés, une aide minimale est disponible, et une mise en commun suit. Sinon, la difficulté fait seulement échouer.',
        retenir: 'Une difficulté fait apprendre si l’élève peut la surmonter avec une aide ajustée (difficultés désirables, Bjork ; échec productif, Kapur).'},
      pourEleves: 'Un score global ne suffit pas : il faut savoir quelle erreur est commise ; une fausse alerte et une alerte manquée n’ont pas le même coût ; c’est un humain qui fixe les critères de décision.',
      pourVous: 'Matrice de confusion, taux de détection (sensibilité), part des alertes justes (valeur prédictive), seuil de décision et coût des erreurs : culture de l’enseignant, à doser pour la classe.'
    },
    {
      id: 'visseuse-sysml', lettre: 'S', nom: 'Analyse fonctionnelle & SysML', couleur: '#9a6900',
      accroche: 'Un objet simple… vraiment ?',
      lien: '../visseuse-sysml/index.html',
      contexte: '<p><strong>Situation.</strong> Une visseuse électrique sans fil. Tout le monde la connaît. Saurez-vous la modéliser sans vous contredire ?</p><img class="defi-img" src="../visseuse-sysml/visseuse-coupe-technique.svg" alt="Coupe fonctionnelle simplifiée d’une visseuse sans fil : batterie, commande, moteur, réducteur, limiteur de couple, mandrin"><p><strong>Trois affirmations.</strong> A. « La visseuse fait tourner un moteur. » · B. « La visseuse permet à l’utilisateur d’agir sur une liaison vissée. » · C. « La visseuse possède un réducteur et un mandrin. »</p><p><strong>Le dossier d’un collègue.</strong> Le cas d’utilisation prévoit « dévisser ». Le diagramme d’exigences impose l’inversion du sens de rotation. Le BDD contient un bloc « commande », mais l’IBD ne montre aucun signal de sélection du sens. Le diagramme d’états ne comporte qu’une rotation à droite. Le cahier des charges dit : « bonne autonomie ».</p>',
      questions: [
        'Classez A, B et C (besoin, fonction, solution technique) et donnez le test qui permet de trancher à coup sûr.',
        'Formulez le besoin en une phrase sans aucun composant, puis transformez « bonne autonomie » en exigence vérifiable : critère, niveau, condition de test.',
        'Auditez le dossier : repérez chaque incohérence, dites quel diagramme vous corrigez et lequel vous devez revérifier ensuite.',
        'Écrivez la chaîne de traçabilité complète pour « dévisser » : besoin → cas d’utilisation → exigence → bloc → échange → état → test.',
        'Pour des élèves de 3e : quel diagramme montreriez-vous en premier, et lequel jamais ? Justifiez par ce que chacun fait penser.'
      ],
      revelation: '',
      aides: [
        'Relance : « Cette phrase dit-elle pourquoi l’objet existe, ce qu’il doit faire, ou comment il le fait ? »',
        'Indice : « Si l’on remplaçait le moteur par une autre solution qui rend le même service, la phrase resterait-elle vraie ? »',
        'Relance : « Suivez l’énergie depuis la batterie : à chaque élément, qu’est-ce qui change, qu’est-ce qui est transmis ? »',
        'Indice : « Partez de "dévisser" : dans quel diagramme cette exigence disparaît-elle ? »'
      ],
      attendu: 'B est la fonction (service rendu) ; A et C décrivent des solutions. Test : si l’on remplace la technologie et que la phrase reste vraie, c’est une fonction. Incohérences : l’exigence d’inversion n’a ni signal dans l’IBD (ajouter un sélecteur de sens relié à la commande) ni état « rotation à gauche » (ajouter l’état et ses transitions, avec arrêt obligatoire avant changement de sens) ; il faut ensuite revérifier le diagramme de séquence et le test associé. Chaîne : visser et dévisser sans effort → cas « dévisser » → exigence « inversion du sens » → bloc commande + sélecteur → signal « sens » → état « rotation gauche » → test : la vis sort à la commande inverse.',
      eclairage: {titre: 'Illusion de familiarité et charge des représentations',
        texte: 'On surestime sa compréhension des objets familiers tant qu’on n’a pas à les expliquer (Rozenblit & Keil). Les diagrammes aident à penser quand ils organisent des idées déjà comprises ; s’ils ajoutent trop de vocabulaire et de syntaxe à la fois, ils deviennent eux-mêmes l’obstacle (Kalyuga).',
        retenir: 'Un diagramme, une question : le formalisme doit aider à penser, pas surcharger.'},
      pourEleves: 'Distinguer besoin, fonction et solution ; formuler une exigence mesurable ; chaîne d’énergie et chaîne d’information ; choisir une représentation adaptée à une question.',
      pourVous: 'Les huit diagrammes SysML, la traçabilité complète et l’audit de cohérence entre diagrammes : culture de l’enseignant, à doser pour la classe.'
    }
  ]
};
