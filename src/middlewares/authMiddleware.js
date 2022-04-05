const path = require('path');

module.exports = (req, res, next) => {
    if (!req.session.user && (req.originalUrl != '/login' && req.originalUrl != '/register'))
        res.sendFile(path.join(__dirname, '../views/loginPage/index.html'));
    else
        next();
};