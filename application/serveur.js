// Charger les éléments dont nous avons besoin
const personnages = require('./personnages.json');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Définir le moteur d'affichage à ejs
app.set('view engine','ejs');

// Lorsqu'un client fait la demande d'un fichier, il doit aller le chercher dans le dossier public
app.use(express.static('public'));
// Utilisation de bodyParser
app.use(bodyParser.urlencoded({ extended: true}));

// Utiliser res.render pour charger un fichier de vue ejs

// Page d'accueil
app.get(['/','/index'],function(req, res) {
    res.render('index', {pseudo : "toto",age : 23});
});

// Page des personnages
app.get('/personnages', function(req, res) {
    res.render('personnages', {mesPersonnages : personnages});
});

// Page de personnage
app.get('/personnage', function(req, res) {
    var idPersonnage = req.query.perso;
    res.render('personnage', {perso : personnages[idPersonnage]});
});

app.post('/personnage', function(req, res) {
    // console.log(req.body);
    var monArme = req.body.arme;
    var monPersonnage = req.body.perso;

    var perso;
    for(perso in personnages) {
        if(monPersonnage === personnages[perso].nom) {
            personnages[perso].arme = monArme;
            break;
        }
    }
    // Enregistrement
    fs.writeFileSync("personnages.json",JSON.stringify(personnages,undefined,4));
    // Renvoi de la page au client (navigateur)
    res.render('personnage', {perso : personnages[perso]});
});

app.listen(9090, function() {
    console.log('Mon serveur écoute sur le port 9090 !');
});

