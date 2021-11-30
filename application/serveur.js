const express = require('express');
const app = express();

app.set('view engine','ejs');

app.listen(9090, function() {
    console.log('Mon serveur écoute usr le port 9090 !');
})
