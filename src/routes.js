const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');

// define authenticator middleware for root route
router.use('/', authMiddleware);

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/homePage/index.html`);
});

// #region Authentication
router.post('/login', authController.login);
router.post('/register', authController.register);
// #endregion

router.get('/list', (req, res) => {
    res.sendFile(`${__dirname}/views/homePage/index.html`);
});

module.exports = router;
