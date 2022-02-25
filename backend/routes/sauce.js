const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// router pour les sauces//

router.post('/', auth, multer, sauceCtrl.createSauce);//creation d'une fiche
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //mofifier une fiche
router.delete('/:id', auth, sauceCtrl.deleteSauce); //supprimer une fiche
router.get('/:id', auth, sauceCtrl.getOneSauce); //chercher une fiche
router.get('/', auth, sauceCtrl.getAllSauces); //chercher toutes les fiches
router.post('/:id/like', auth, sauceCtrl.likeUser); // like et dislike

module.exports = router;
