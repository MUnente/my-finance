require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon');
const session = require('express-session');
const path = require('path');

const port = process.env.PORT;
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

// configuring session
app.use('/', session({
    secret: process.env.SESSION_SECRET_PASSWORD,
    resave: false,
    saveUninitialized: true
}));

// configuring routes
app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`⚡️ Server listening on http://localhost:${port}`);
});