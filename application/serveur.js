const express = require('express');
const app = express();

app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index', {pseudo : "toto",age : 23});
});

app.listen(9090, function() {
    console.log('Mon serveur écoute sur le port 9090 !');
});
