const rateLimit = require('express-rate-limit');

const limit = rateLimit({
	window: 5 * 60 * 1000, // attente de 5 min
	max: 5, //limite chaque IP à 5 requêtes
	message: ' vous avez depassé les 3 demandes',

});

module.exports = limit;
