Docapi est une webapp permettant de gérer des documents [Markdown](https://fr.wikipedia.org/wiki/Markdown) de manière simple et intuitive.
Les documents sont enregistrés sur un serveur et sont récupérables depuis n'importe où, avec un PC, un smartphone ou une tablette.

L'application est encore en phase de développement. Tout commentaire et idée d'amélioration sont les bienvenues.

# API
Docapi propose une API REST permettant de gérer ses documents sans passer par l'interface web.
Pour l'utiliser, il est nécessaire d'obtenir un token, récupérable sur la page du profile utilisateur.

Pour le moment, l'API n'est pas encore documentée. Mais elle le sera prochainement :-).

# Self-hosting
Vous pouvez installer Docapi sur votre propre serveur pour héberger les documents chez vous.
Il est nécessaire d'avoir installé NodeJS, MongoDB, [Pandoc](http://pandoc.org/) et le paquet de base de LaTeX (*texlive-latex-base texlive-fonts-recommended texlive-latex-recommended lmodern*) au préalable.
Le programme pandoc est utilisé pour convertir le markdown en fichier PDF.

```{.bash}
sudo apt-get install pandoc texlive-latex-base texlive-fonts-recommended texlive-latex-recommended lmodern
git clone git@github.com:5ika/Docapi.git
npm install
bower install
npm start
```
