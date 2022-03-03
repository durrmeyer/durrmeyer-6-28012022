const express = require('express');
const router = express.Router();
const limit = require('../middleware/limite');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', limit.limite, userCtrl.login);

module.exports = router;
