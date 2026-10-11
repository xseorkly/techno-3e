/* « Ateliers didactiques » (rotation 3 × 20 min + bilan) — données communes (90 min).
   Une seule source pour la page d'accueil, la page atelier et le bilan. */
window.PUZZLE = {
  filRouge: 'À quel moment la difficulté aide-t-elle à apprendre, et à quel moment empêche-t-elle de penser ?',
  lunettes: [
    {id: 'dida', nom: 'Didactique', couleur: '#245d8a', pale: '#eaf3fb', titre: 'L’obstacle',
     question: 'Quelle idée ou quelle représentation vous a fait hésiter ou vous tromper ? Comment un élève risque-t-il de la vivre ?'},
    {id: 'peda', nom: 'Pédagogique', couleur: '#c2185b', pale: '#fbe8f0', titre: 'L’aide minimale',
     question: 'Quelle aide a permis de repartir sans donner la réponse ? Laquelle aurait été trop forte ?'},
    {id: 'cogn', nom: 'Cognitive', couleur: '#9a6900', pale: '#fff5d9', titre: 'La trace',
     question: 'Quelle trace individuelle prouverait qu’un élève a compris, et qu’il saura le réutiliser ailleurs ?'}
  ],
  parcours: [
    {
      id: 'reseaux', lettre: 'R', nom: 'Réseaux', couleur: '#0e6e6b',
      accroche: 'Le site existe… mais où est-il ?',
      lien: '../reseaux/index.html',
      contexte: '<p><strong>Situation.</strong> Vous devez consulter le site du musée des sciences. Sur un poste, <code>https://musee-exemple.fr</code> s’ouvre. Sur un autre, le navigateur affiche « serveur introuvable ». Pourtant, les deux postes sont connectés au même réseau et échangent des fichiers locaux.</p><div class="docs"><div><strong>Document A · Poste 1</strong><br>IP 192.168.1.24<br>Passerelle 192.168.1.1<br>DNS 192.168.1.10</div><div><strong>Document B · Poste 2</strong><br>IP 192.168.1.25<br>Passerelle 192.168.1.1<br>DNS : non renseigné</div></div>',
      questions: [
        'Comparez les deux configurations. Qu’est-ce qui est identique ? Qu’est-ce qui diffère ?',
        'Quelle hypothèse vous paraît la plus plausible : câble débranché, aucun service de résolution de nom, site disparu ? Justifiez.',
        'Prédiction : si vous saisissez directement l’adresse IP du serveur, que devrait-il se passer ? Pourquoi ?',
        'Formulez en une phrase le rôle du DNS, sans utiliser le mot « traduction ».'
      ],
      revelation: '',
      aides: [
        'Relance : « Comparez les documents ligne par ligne. Qu’est-ce qui change entre les deux postes ? »',
        'Indice : « Le poste 2 connaît le nom du site. Connaît-il l’adresse à joindre ? Qui pourrait la lui fournir ? »',
        'Exemple : « Vous connaissez le nom d’un collègue mais pas son numéro de téléphone. Que vous faut-il ? »'
      ],
      attendu: 'Le poste 2 n’a pas de DNS : il ne peut pas obtenir l’adresse IP associée au nom. Avec l’IP saisie directement, la page peut s’ouvrir si le serveur accepte l’accès par IP. Le DNS fournit les informations d’adressage associées à un nom de domaine ; il ne transporte pas les données.',
      eclairage: {titre: 'Représentations initiales et changement conceptuel',
        texte: 'L’élève n’arrive jamais vide : « le Wi‑Fi, c’est Internet », « le DNS envoie les données ». Une croyance ne disparaît pas parce qu’on donne la bonne réponse. Il faut la rendre visible (prédire), la mettre à l’épreuve (confronter), puis proposer un modèle plus explicatif et le faire réutiliser.',
        retenir: 'Faire émerger la représentation avant de formaliser : on sait alors ce qu’il faut vraiment reconstruire.'},
      pourEleves: 'Distinguer réseau local, Internet et Web ; rôle du DNS et de l’adresse IP ; idée de paquet ; rôle d’un routeur ; notion de chemin et de coût.',
      pourVous: 'TCP en détail, masques de sous-réseau, algorithme de Dijkstra et sa programmation en Python : culture de l’enseignant, à doser pour la classe.'
    },
    {
      id: 'donnees-decision', lettre: 'D', nom: 'Données & décision', couleur: '#245d8a',
      accroche: 'Mon IA a 99 % de réussite. Vraiment ?',
      lien: '../donnees-decision/index.html',
      contexte: '<p><strong>Situation.</strong> Un fabricant propose au collège un détecteur d’incendie « intelligent ». Sa notice annonce : <strong>99 % de réussite sur 10 000 situations testées.</strong></p>',
      questions: [
        'Avant d’en savoir plus : l’installeriez-vous dans le collège ? Pourquoi ? (Répondez avant la révélation.)',
        'Après la révélation : calculez le taux de réussite. Est-ce un bon système ?',
        'Quelle erreur grave le score global masque-t-il ?',
        'Quelles questions faut-il poser avant de faire confiance à un score ?'
      ],
      revelation: 'Sur les 10 000 situations, 9 900 correspondaient à « pas d’incendie » et 100 à « incendie ». Le système répond <strong>toujours</strong> « pas d’incendie ».',
      aides: [
        'Relance : « Combien d’incendies le système a-t-il détectés ? »',
        'Indice : « Comptez séparément les réussites sur les situations avec incendie et sans incendie. »',
        'Exemple : « Un test qui répond toujours "pas malade" pour une maladie rare : quel score obtient-il ? À quoi sert-il ? »'
      ],
      attendu: '9 900 / 10 000 = 99 % de réussite, mais 0 incendie détecté sur 100 : toutes les alertes utiles sont manquées. Il faut distinguer les quatre cas (vrais et faux positifs, vrais et faux négatifs) et demander : 99 % de quoi ? sur quels cas ? quelle erreur coûte le plus ?',
      eclairage: {titre: 'Intuition trompeuse et difficulté productive',
        texte: 'Un chiffre convaincant déclenche une réponse rapide et intuitive. Le piège n’est formateur que si l’élève peut en sortir : le but est clair, les prérequis sont réactivés, une aide minimale est disponible, et une mise en commun suit. Sinon, la difficulté fait seulement échouer.',
        retenir: 'Une difficulté fait apprendre si l’élève peut la surmonter avec une aide ajustée (difficultés désirables, Bjork ; échec productif, Kapur).'},
      pourEleves: 'Passer de la grandeur à la donnée ; seuil et instabilité d’une commande ; un score ne suffit pas sans ses conditions ; c’est un humain qui fixe les critères de décision.',
      pourVous: 'Quantification, hystérésis et filtrage comparés, matrice de confusion, séparation entraînement / test : culture de l’enseignant, à doser pour la classe.'
    },
    {
      id: 'visseuse-sysml', lettre: 'S', nom: 'Analyse fonctionnelle & SysML', couleur: '#9a6900',
      accroche: 'Un objet simple… vraiment ?',
      lien: '../visseuse-sysml/index.html',
      contexte: '<p><strong>Situation.</strong> Une visseuse électrique sans fil. Tout le monde la connaît. Saurez-vous expliquer le service qu’elle rend avant de parler de ses composants ?</p><img class="defi-img" src="../visseuse-sysml/visseuse-coupe-technique.svg" alt="Coupe fonctionnelle simplifiée d’une visseuse sans fil : batterie, commande, moteur, réducteur, limiteur de couple, mandrin"><p><strong>Trois affirmations.</strong><br>A. « La visseuse fait tourner un moteur. »<br>B. « La visseuse permet à l’utilisateur d’agir sur une liaison vissée. »<br>C. « La visseuse possède un réducteur et un mandrin. »</p>',
      questions: [
        'Classez A, B et C : besoin / fonction / solution technique. Justifiez.',
        'Formulez le besoin auquel répond la visseuse en une phrase, sans citer aucun composant.',
        'Proposez deux cas d’utilisation en plus de « visser ». Attention : « avoir une batterie » n’en est pas un.'
      ],
      revelation: '',
      aides: [
        'Relance : « Cette phrase dit-elle pourquoi l’objet existe, ce qu’il doit faire, ou comment il le fait ? »',
        'Indice : « Si on remplaçait le moteur par une autre solution qui rend le même service, la phrase resterait-elle vraie ? »',
        'Exemple : « Une lampe : "éclairer une pièce" ou "contenir une LED" ? »'
      ],
      attendu: 'B décrit la fonction (le service rendu) ; A et C décrivent des solutions techniques. Besoin possible : « Permettre à un utilisateur de serrer ou desserrer une liaison vissée, de manière autonome et avec un effort limité. » Cas d’utilisation : dévisser, percer, recharger…',
      eclairage: {titre: 'Illusion de familiarité et charge des représentations',
        texte: 'On surestime sa compréhension des objets familiers tant qu’on n’a pas à les expliquer (Rozenblit & Keil). Les diagrammes aident à penser quand ils organisent des idées déjà comprises ; s’ils ajoutent trop de vocabulaire et de syntaxe à la fois, ils deviennent eux-mêmes l’obstacle (Kalyuga).',
        retenir: 'Un diagramme, une question : le formalisme doit aider à penser, pas surcharger.'},
      pourEleves: 'Distinguer besoin, fonction et solution ; formuler une exigence mesurable ; chaîne d’énergie et chaîne d’information ; choisir une représentation adaptée à une question.',
      pourVous: 'Les huit diagrammes SysML, la traçabilité complète et l’audit de cohérence entre diagrammes : culture de l’enseignant, à doser pour la classe.'
    }
  ]
};
