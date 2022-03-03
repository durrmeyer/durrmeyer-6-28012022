const rateLimit = require('express-rate-limit');

const limite = rateLimit({
	windowMs: 2 * 60 * 1000, //  durée de 2 min
	max: 5, // tentatives
	message: 'vous avez atteint les 5 connections!, veuillez recommencer dans 2 min',
	headers: true
});

module.exports = { limite };
