const passwordValidator = require('password-validator');

const schemaValidation = new passwordValidator();

schemaValidation
.is().min(8)                                   
.is().max(100)                                
.has().uppercase()                              
.has().lowercase()                              
.has().digits(2)                              
.has().not().spaces()   

module.exports = schemaValidation;