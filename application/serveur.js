// Charger les éléments dont nous avons besoin
var personnages = require('./personnages.json');
var classes = require('./classes.json');
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
    res.render('personnages', {mesPersonnages : personnages,mesClasses: classes});
});

app.post('/personnages', function(req, res) {
    var monPersonnage = req.body.perso;
    var maClasse = req.body.classe;
    console.log(maClasse);

    personnages[monPersonnage].classe= parseInt(maClasse);
    // Enregistrement
    fs.writeFileSync('personnages.json',JSON.stringify(personnages,undefined,4));
    // Renvoi de la page au client (navigateur)
    res.render('personnages',{mesPersonnages : personnages,mesClasses : classes});

});

// Page de personnage
app.get('/personnage', function(req, res) {
    var idPersonnage = req.query.perso;
    res.render('personnage', {perso : personnages[idPersonnage]});
});

app.post('/personnage', function(req, res) {
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

// Page de classe
app.get('/classe', function(req, res) {
    var nomClasse = req.query.nom;
    res.render('classe', {maClasse : classes[nomClasse],modification:false});
});

app.post('/classe', function(req, res) {
    var classeNom = req.body.nom;
    var classeDescription = req.body.description;
    
    var classe;
    for(classe in classes) {
        if(classeNom === classes[classe].nom) {
            classes[classe].description = classeDescription;
            break;
        }
    }
    // Enregistrement
    fs.writeFileSync("classes.json",JSON.stringify(classes,undefined,4));
    // Renvoi de la page au client (navigateur)
    res.render('classe', {maClasse : classes[classe],modification:true});
});


app.listen(9090, function() {
    console.log('Mon serveur écoute sur le port 9090 !');
});
