/* Bilan du formateur (40 min), en accès libre.
   16 diapositives : contenu + 7 échanges avec la salle (zones de prise de notes en direct).
   Pastilles : R = Réseaux, D = Données & décision, S = SysML. */
window.BILAN_HTML=`
<section class="bs bs-title"><div class="bk">Ateliers didactiques · Bilan du formateur</div>
<h1>La difficulté : moteur ou frein ?</h1>
<p class="bq">À quel moment la difficulté aide-t-elle à apprendre, et à quel moment empêche-t-elle de penser ?</p>
<div class="answer"><small>Notre réponse en une phrase</small>La difficulté fait apprendre quand elle porte sur l’idée à apprendre. Elle empêche de penser quand elle porte sur l’outil, la consigne ou le vocabulaire, ou quand personne ne fait le point ensuite.</div>
<ol class="path"><li><b>1</b>Ce que nous avons vécu</li><li><b>2</b>Ce que cela montre, avec trois lunettes</li><li><b>3</b>Ce que j’en fais en classe</li></ol>
</section>

<section class="bs bs-ex"><div class="bk">Échange A · 1 min · Avant de commencer</div>
<h2>Selon vous, la difficulté aide-t-elle à apprendre, ou empêche-t-elle d’apprendre ?</h2>
<p class="consigne">À main levée : « elle aide », « elle empêche », « ça dépend ». Si c’est « ça dépend » : de quoi ?</p>
<textarea class="exnote" data-ex="A" aria-label="Notes de l’échange A" placeholder="Ce que dit la salle…"></textarea>
</section>

<section class="bs" style="--c:#0e6e6b"><div class="bk">1 · Ce que nous avons vécu</div>
<h2>Pendant une heure, vous avez joué la situation de vos élèves</h2><div class="bg3">
<div><b>Tour 1 · Le défi</b><p>Vous avez traité un défi exigeant, sans cours préalable.</p><p class="so">C’est dans ce type de situation que les représentations des élèves deviennent visibles : là où vous avez dû ralentir, eux buteront.</p></div>
<div><b>Tour 2 · L’obstacle et l’aide</b><p>Un collègue est arrivé et a découvert le défi à froid.</p><p class="so">Ses hésitations sont un bon indicateur : ce qui demande un effort à un adulte expert sera un obstacle certain pour un élève de 3e.</p></div>
<div><b>Tour 3 · La question différée</b><p>Un nouvel arrivant a interrogé votre travail.</p><p class="so">Devoir justifier fait plus apprendre qu’affirmer, pour vos élèves comme pour tout le monde.</p></div>
</div><p class="bnote">Le gardien a assuré la continuité, les arrivants ont apporté un regard neuf : apprendre, c’est aussi reprendre le travail d’un autre.</p></section>

<section class="bs bs-ex"><div class="bk">Échange B · 3 min · Côté élève</div>
<h2>Dans le défi de votre table, à quel moment un élève de 3e aurait-il lâché ? Pourquoi ?</h2>
<p class="consigne">Une réponse par table, une ligne par réponse. On la garde pour la fin.</p>
<textarea class="exnote" data-ex="B" aria-label="Notes de l’échange B" placeholder="Table 1 : …&#10;Table 2 : …"></textarea>
</section>

<section class="bs" style="--c:#0e6e6b"><div class="bk">1 · Ce que nous avons vécu · Les trois ateliers</div>
<h2>Trois situations, un même piège pour l’élève : croire qu’il sait déjà</h2><div class="bg3 ateliers3">
<div style="--c:#0e6e6b"><span class="pill r">R</span><h3>Réseaux</h3><p class="acc">« Le site existe… mais où est-il ? »</p><p><strong>La situation.</strong> Trois ordinateurs et un smartphone. PC3 ne joint pas PC1, et un collègue accuse le DNS.</p><p><strong>Ce que l’élève doit découvrir.</strong> C’est un problème d’acheminement, pas de nom : PC3 est sur un autre réseau et il manque un routeur ; le smartphone, lui, n’a pas de passerelle.</p></div>
<div style="--c:#245d8a"><span class="pill d">D</span><h3>Données &amp; décision</h3><p class="acc">« Quand la donnée nous trompe »</p><p><strong>La situation.</strong> Deux détecteurs d’incendie : A annonce 99 % de réussite, B annonce 95 %.</p><p><strong>Ce que l’élève doit découvrir.</strong> A répond toujours « pas d’incendie » et n’en détecte aucun ; B en détecte 90 sur 100. Un score global ne dit pas quelle erreur on commet.</p></div>
<div style="--c:#9a6900"><span class="pill s">S</span><h3>SysML</h3><p class="acc">« Un objet simple… vraiment ? »</p><p><strong>La situation.</strong> Une visseuse sans fil et le dossier de modélisation d’un collègue.</p><p><strong>Ce que l’élève doit découvrir.</strong> Distinguer le besoin, la fonction (le service rendu) et la solution (moteur, réducteur), et suivre l’exigence « dévisser » d’un diagramme à l’autre.</p></div>
</div></section>

<section class="bs"><div class="bk">1 · Ce que nous avons vécu · Synthèse</div>
<h2>Dans chaque atelier, une idée fausse, une relance, une preuve</h2>
<table class="bt"><thead><tr><th></th><th style="background:#0e6e6b">R · Réseaux</th><th style="background:#245d8a">D · Données</th><th style="background:#9a6900">S · SysML</th></tr></thead><tbody>
<tr><th>Ce que croit l’élève</th><td>« Le DNS envoie les données. » « Même début d’adresse, même réseau. »</td><td>« 99 %, c’est forcément le meilleur. »</td><td>« La visseuse, c’est un moteur. »</td></tr>
<tr><th>Ce qui est vrai</th><td>Le DNS donne une adresse à partir d’un nom. Faire passer les paquets d’un réseau à l’autre, c’est le rôle du routeur.</td><td>Un taux global peut cacher l’essentiel : combien d’incendies sont détectés, et ce que coûte chaque erreur.</td><td>Le moteur est une solution. La fonction est le service rendu ; elle resterait vraie avec une autre technologie.</td></tr>
<tr><th>La relance, sans donner la réponse</th><td>« Le poste connaît le nom du site. Connaît-il l’adresse à joindre ? »</td><td>« Sur les 100 incendies, combien ont été détectés ? »</td><td>« Si je change le moteur, la phrase reste-t-elle vraie ? »</td></tr>
<tr><th>La question différée, quinze jours plus tard</th><td>« Pourquoi cette tablette ne joint-elle pas l’imprimante de la salle voisine ? »</td><td>« Un test réussit à 97 % : de quoi as-tu besoin pour dire s’il est bon ? »</td><td>« Classe ces trois phrases sur une trottinette : besoin, fonction, solution. »</td></tr>
</tbody></table></section>

<section class="bs bs-ex"><div class="bk">Échange C · 3 min · Vos tables et le tableau</div>
<h2>Qu’est-ce qui se recoupe entre ce que vos tables ont trouvé et ce tableau ? Qu’est-ce qui diffère ?</h2>
<p class="consigne">Une phrase par case, au fil des réponses.</p>
<table class="bt exgrid"><thead><tr><th></th><th style="background:#0e6e6b">R · Réseaux</th><th style="background:#245d8a">D · Données</th><th style="background:#9a6900">S · SysML</th></tr></thead><tbody>
<tr><th>L’obstacle repéré</th><td><textarea class="exnote sm" data-ex="C_obs_R" aria-label="Réseaux, obstacle"></textarea></td><td><textarea class="exnote sm" data-ex="C_obs_D" aria-label="Données, obstacle"></textarea></td><td><textarea class="exnote sm" data-ex="C_obs_S" aria-label="SysML, obstacle"></textarea></td></tr>
<tr><th>La relance proposée</th><td><textarea class="exnote sm" data-ex="C_rel_R" aria-label="Réseaux, relance"></textarea></td><td><textarea class="exnote sm" data-ex="C_rel_D" aria-label="Données, relance"></textarea></td><td><textarea class="exnote sm" data-ex="C_rel_S" aria-label="SysML, relance"></textarea></td></tr>
<tr><th>La question différée</th><td><textarea class="exnote sm" data-ex="C_qd_R" aria-label="Réseaux, question différée"></textarea></td><td><textarea class="exnote sm" data-ex="C_qd_D" aria-label="Données, question différée"></textarea></td><td><textarea class="exnote sm" data-ex="C_qd_S" aria-label="SysML, question différée"></textarea></td></tr>
</tbody></table></section>

<section class="bs" style="--c:#245d8a"><div class="bk">2 · Lunette 1 · Didactique · L’obstacle</div>
<p class="lq"><small>La question posée aux tables</small>Où un élève de 3e bloquerait-il ? Quelle représentation se cache derrière ?</p>
<h2>Une erreur d’élève est souvent un modèle cohérent, pas un trou</h2><div class="bg2">
<div><h3>Une représentation résiste</h3><p>Une représentation, c’est l’explication que l’élève s’est déjà construite, par exemple « le DNS envoie les données » <span class="pill r">R</span>. Elle fonctionne dans sa tête : dire « c’est faux » ne la remplace pas. Il faut une situation où elle échoue.</p></div>
<div><h3>Deux niveaux confondus en un seul</h3><p>Beaucoup d’erreurs mélangent deux niveaux : le nom et l’adresse <span class="pill r">R</span>, le score global et le type d’erreur <span class="pill d">D</span>, la fonction et la solution <span class="pill s">S</span>.</p></div>
<div><h3>Le mot vient après le besoin</h3><p>On nomme le routeur, le taux de détection ou la fonction au moment où on en a eu besoin pour résoudre le problème. Le mot arrive alors comme une réponse, pas comme une définition à retenir.</p></div>
<div><h3>Chercher ne suffit pas, il faut structurer</h3><p>Structurer, c’est formuler avec la classe ce qui reste vrai au-delà de ce défi, puis l’écrire. Sans ce temps, la recherche reste une anecdote.</p></div>
</div><p class="todo"><b>Concrètement en classe</b>Partir d’une situation où l’idée courante de l’élève ne marche pas, et prévoir dès le départ le temps de structuration.</p></section>

<section class="bs bs-ex" style="--c:#245d8a"><div class="bk">Échange D · 2 min · Didactique</div>
<h2>Dans votre prochaine séquence, quelle représentation d’élève voulez-vous bousculer, et par quelle situation ?</h2>
<p class="consigne">En binôme, 1 minute, puis deux ou trois exemples partagés.</p>
<textarea class="exnote" data-ex="D" aria-label="Notes de l’échange D" placeholder="Représentation → situation qui la met en défaut"></textarea>
</section>

<section class="bs" style="--c:#c2185b"><div class="bk">2 · Lunette 2 · Pédagogie · L’aide minimale</div>
<p class="lq"><small>La question posée aux tables</small>Quelle relance diriez-vous, mot pour mot, sans donner la réponse ?</p>
<h2>Aider, c’est relancer le raisonnement, pas le remplacer</h2>
<p class="lead2">Graduer l’aide : commencer par la plus légère, ne monter que si l’élève reste bloqué.</p>
<div class="ladder"><span>1 · Reformuler la consigne</span><span>2 · Rappeler un prérequis</span><span>3 · Pointer un indice</span><span>4 · Donner un exemple partiel</span><span>5 · Montrer la procédure</span></div>
<div class="bg2">
<div><h3>Une relance fait penser, une explication pense à sa place</h3><p>« Le poste connaît le nom… connaît-il l’adresse ? » fait reprendre le raisonnement. « C’est le DNS » le clôt <span class="pill r">R</span>.</p></div>
<div><h3>Laisser la décision à l’élève</h3><p>Choisir le critère d’un détecteur <span class="pill d">D</span>, choisir le diagramme à corriger <span class="pill s">S</span> : si la fiche décide tout, l’élève exécute et n’apprend pas à décider.</p></div>
<div><h3>Observer avant d’expliquer</h3><p>Au tour 2, le nouvel arrivant découvrait le défi comme un élève. Là où il a hésité, vos élèves buteront, et c’est là qu’il faudra une relance prête.</p></div>
<div><h3>Le pair qui conteste</h3><p>Au tour 3, la contestation a servi de retour : elle obligeait à justifier. C’est exactement ce qu’on attend d’un débat entre élèves.</p></div>
</div><p class="todo"><b>Concrètement en classe</b>Écrire à l’avance deux relances par séance : une de niveau 1 et une de niveau 3.</p></section>

<section class="bs bs-ex" style="--c:#c2185b"><div class="bk">Échange E · 2 min · Pédagogie</div>
<h2>Un élève est bloqué sur le défi de votre table. Quelle est votre première relance, mot pour mot ?</h2>
<p class="consigne">On vérifie ensemble sur quel niveau de l’échelle elle se situe.</p>
<div class="ladder mini"><span>1 · Reformuler</span><span>2 · Prérequis</span><span>3 · Indice</span><span>4 · Exemple partiel</span><span>5 · Procédure</span></div>
<textarea class="exnote" data-ex="E" aria-label="Notes de l’échange E" placeholder="« … » → niveau ?"></textarea>
</section>

<section class="bs" style="--c:#9a6900"><div class="bk">2 · Lunette 3 · Sciences cognitives · La question différée</div>
<p class="lq"><small>La question posée aux tables</small>Quelle question, quinze jours plus tard, permettrait de distinguer « il a compris » de « il a réussi » ?</p>
<h2>Réussir aujourd’hui ne prouve pas qu’on a compris</h2><div class="bg2">
<div><h3>Performance n’est pas apprentissage</h3><p>Réussir le jour même, avec de l’aide, ne dit rien de durable. Ce qui le prouve : savoir expliquer, retrouver plus tard, transférer à une situation nouvelle (Soderstrom et Bjork, 2015).</p></div>
<div><h3>L’illusion de compréhension</h3><p>Un élève croit savoir comment marchent une visseuse ou Internet, parce qu’il s’en sert tous les jours. L’illusion tombe au moment où il doit l’expliquer : c’est « l’illusion de profondeur explicative » (Rozenblit et Keil, 2002), qui touche aussi les adultes.</p></div>
<div><h3>La mémoire de travail est limitée</h3><p>On ne traite que quelques éléments nouveaux à la fois. Avec un logiciel, un vocabulaire et un problème nouveaux en même temps, l’effort part dans l’outil et plus dans l’idée.</p></div>
<div><h3>L’intuition va trop vite</h3><p>« 99 % » déclenche un choix immédiat <span class="pill d">D</span>. Apprendre, c’est aussi apprendre à ralentir : « 99 % de quoi ? Quelle erreur coûte le plus ? »</p></div>
</div><p class="todo"><b>Concrètement en classe</b>Programmer une question différée, sur une situation nouvelle, quelques semaines après la séquence.</p></section>

<section class="bs bs-ex" style="--c:#9a6900"><div class="bk">Échange F · 2 min · Sciences cognitives</div>
<h2>Quelle question poseriez-vous dans quinze jours pour savoir si l’élève a compris, et pas seulement réussi ?</h2>
<p class="consigne">Une proposition par table. On teste : la situation est-elle vraiment nouvelle ?</p>
<textarea class="exnote" data-ex="F" aria-label="Notes de l’échange F" placeholder="Table 1 : …"></textarea>
</section>

<section class="bs bs-title"><div class="bk">3 · Notre réponse au fil rouge</div>
<h2 style="color:#fff">Difficulté utile, difficulté parasite</h2>
<table class="bt dt"><thead><tr><th></th><th style="background:#2e7d4f">Utile : elle fait apprendre</th><th style="background:#b3261e">Parasite : elle empêche de penser</th></tr></thead><tbody>
<tr><th>Sur quoi elle porte</th><td>Sur l’idée à apprendre : nom ou adresse <span class="pill r">R</span>, quel type d’erreur <span class="pill d">D</span>, fonction ou solution <span class="pill s">S</span>.</td><td>Sur l’outil, le vocabulaire ou la consigne à décoder.</td></tr>
<tr><th>Quand</th><td>Le but est clair, les prérequis ont été réactivés, une aide minimale est prête, une seule grande nouveauté à la fois, et une mise en commun suit.</td><td>Trop de nouveautés arrivent ensemble, ou personne ne structure ce qui a été trouvé.</td></tr>
</tbody></table>
<div class="answer"><small>Le test à se poser</small>« Si l’élève bloque ici, apprend-il ce que je vise ? » Si oui, je garde la difficulté. Si non, je l’allège.</div>
</section>

<section class="bs bs-ex"><div class="bk">Échange G · 3 min · Retour sur l’échange B</div>
<h2>Les moments où un élève aurait lâché : difficulté utile ou difficulté parasite ?</h2>
<p class="consigne">Pour chaque réponse, la salle tranche : on la garde ou on l’allège ?</p>
<div class="recall" data-recall="B"></div>
<textarea class="exnote" data-ex="G" aria-label="Notes de l’échange G" placeholder="Utile / parasite, et pourquoi…"></textarea>
</section>

<section class="bs" style="--c:#c2185b"><div class="bk">3 · À emporter</div>
<h2>Trois questions avant chaque séquence</h2><ol class="bl">
<li><b>Quel obstacle</b> je veux que mes élèves rencontrent, et quelle représentation va-t-il bousculer ?</li>
<li><b>Quelle relance</b> je prépare, mot pour mot, pour celui qui bloque, sans lui donner la réponse ?</li>
<li><b>Quelle question différée</b> je poserai quinze jours plus tard, sur une situation nouvelle, pour savoir s’il a compris et pas seulement réussi ?</li>
</ol>
<dl class="gloss"><div><dt>Représentation</dt><dd>Explication déjà construite par l’élève, cohérente pour lui, parfois fausse.</dd></div><div><dt>Relance</dt><dd>Question courte qui remet l’élève en mouvement sans donner la réponse.</dd></div><div><dt>Structuration</dt><dd>Moment où la classe formule et écrit ce qui reste vrai au-delà du défi.</dd></div><div><dt>Question différée</dt><dd>Question posée plus tard, sur une situation nouvelle, pour vérifier la compréhension.</dd></div><div><dt>Difficulté utile ou parasite</dt><dd>Utile si elle porte sur l’idée à apprendre ; parasite si elle porte sur l’outil, la consigne ou le vocabulaire.</dd></div></dl>
<p class="bnote">Au lieu de « l’élève a-t-il réussi ? », demandons-nous : « qu’a-t-il dû penser pour réussir, et qu’est-ce qui l’aurait empêché de penser ? »</p></section>
`;
