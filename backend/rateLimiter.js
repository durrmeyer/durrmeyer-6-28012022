const rateLimit = require('express-rate-limit');

app.use(
	rateLimit({
		window: 12 * 60 * 60 * 1000,
		max: 5, //limite chaque IP à 5 requêtes
		message: ' vous avez depassé les 3 demandes',
		header: true
	})
);
module.exports = 'express/lib/request';
