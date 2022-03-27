const express = require('express');
const router = express.Router();

const authController = require('./controller/authController');

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/view/homePage/index.html`);
});

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
