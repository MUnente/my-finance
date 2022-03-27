const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

// configuring favicon icon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// configuring static files
app.use('/public', express.static(`${__dirname}/public`));

/**
 * For the framework to understand the body params,
 * it's necessary declare that the server will use JSON files.
 */
app.use(express.json());

app.use('/', require('./routes'));

module.exports = app;