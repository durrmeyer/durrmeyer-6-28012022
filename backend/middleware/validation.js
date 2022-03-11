
const schemaValidation = require('../models/password');

module.exports = (req, res, next) => {

    if(schemaValidation.validate(req.body.password)){
        return res.status((400),"8 caratères minimun").send({message: 'Mot de passe pas assez fort ! :' + schemaValidation.validate(req.body.password, {list:true})});
    }else{
              next()
    }
   
};








