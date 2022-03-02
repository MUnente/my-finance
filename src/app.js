const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/view/homeView`));

// para o node entender os body params,
// é necessário declarar que seu servidor irá utilizar arquivos json
app.use(express.json());

app.use('/', require('./routes'));

module.exports = app;