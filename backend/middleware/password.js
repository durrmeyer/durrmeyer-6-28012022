
/*const passwordValidator = require('password-validator');

// Creation du schema validation
var schemaValidation = new passwordValidator();

// Add properties to it
schemaValidation
.is().min(6)                                    // Minimum length 6
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) =>{
    //si le mot de passe est bon alors on execute la demande et on passe//
    if(!schemaValidation.validate(req.body.password)){
        return res.status(400)
        .json({error: "mot de passe faible" + schemaValidation.validate(req.body.password, {list: true})});
    }else{
        next();
	}
       
    }*/
