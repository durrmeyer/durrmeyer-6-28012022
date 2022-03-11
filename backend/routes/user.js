const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const limit = require('../middleware/limite');
const validation = require('../middleware/validation');



router.post('/signup', validation, userCtrl.signup);
router.post('/login', limit, userCtrl.login);

module.exports = router;
