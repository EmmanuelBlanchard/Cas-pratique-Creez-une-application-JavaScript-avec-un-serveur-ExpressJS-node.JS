// Charger les éléments dont nous avons besoin
const personnages = require('./personnages.json');
const express = require('express');
const app = express();

// Définir le moteur d'affichage à ejs
app.set('view engine','ejs');

// Utiliser res.render pour charger un fichier de vue ejs

// Page d'accueil
app.get(['/','/index'],function(req, res) {
    res.render('index', {pseudo : "toto",age : 23});
});

// Page des personnages
app.get('/personnages', function(req, res) {
    res.render('personnages', {mesPersonnages : personnages});
});

app.listen(9090, function() {
    console.log('Mon serveur écoute sur le port 9090 !');
});

