const express = require('express');
const router = express.Router();

const userController = require('./controller/userController');

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/view/homeView/index.html`);
});

router.post('/login', userController.selectUser);
router.post('/register', userController.insertUser);

module.exports = router;
