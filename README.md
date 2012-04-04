Site Web de Xebia Studio
----------
Ce dépôt contient le code source du site web de Xebia Studio
Il tourne avec Jekyll, avec un minimum de liquid et un peu de js.

* Installez [jekyll](https://github.com/mojombo/jekyll/wiki/install)
* Clonez le dépôt.
* Executez jekyll --server
* Ouvrez votre navigateur sur http://localhost:4000
* Changez du code, c'est instanement dans votre navigateur.


Contribuer
----------
Forkez le projet et clonez votre fork en local. Puis ajoutez l'upstream

     git remote add upstream git://github.com/xebia-france/xebia-studio-website.git

Créez votre feature branch

    git checkout -b ce_sur_quoi_je_veux_bosser
    

Hack, commit, hack, HACK, commit !
Poussez votre branche modifiée sur votre clone

    git push origin ce_sur_quoi_je_veux_bosser:ce_sur_quoi_je_veux_bosser
    
Allez sur github, selectionnez la branche `ce_sur_quoi_je_veux_bosser`, et faites une pull request. Si vous corrigez une ano connue, pensez à ajouter au choix `fixes #xxxx` ou `closes #xxx` pour que votre fix soit rattaché automatiquement à l'ano.

Vérifiez que vos modifs sont valides w3c comme il se doit, si vous utilisez des hack liquid ou que vous introduisez des lib js/css de ouf, dites le nous dans le texte de la pullrequest.

Url Utiles
----------
[Trello du projet](https://trello.com/b/7yz1euuy)
[http://studio.xebia.fr](http://studio.xebia.fr)