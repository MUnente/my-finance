const path = require('path');

module.exports = (req, res, next) => {
    if (!req.session.user && (req.originalUrl != '/login' && req.originalUrl != '/register'))
        res.status(401).sendFile(path.join(__dirname, '../views/authPage/index.html'));
    else
        next();
};