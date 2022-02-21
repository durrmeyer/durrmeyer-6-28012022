const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/User');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

require('dotenv').config('/.env');
console.log(process.env);

const uri = process.env.ATLAS_URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
	// les ressources peuvent être partager de n'importe quelle origine//
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	// les requêtes autorisées pour le http //
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
