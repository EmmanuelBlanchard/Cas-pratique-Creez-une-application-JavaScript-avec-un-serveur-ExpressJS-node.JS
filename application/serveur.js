const express = require('express');
const app = express();

app.set('view engine','ejs');

app.get('/', function(req, res) {
    var obj = {
        pseudo : "toto", 
        age : 23
    }
    res.render('index', obj);
})

app.listen(9090, function() {
    console.log('Mon serveur écoute sur le port 9090 !');
})
