const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto-js"); //permet de chiffrer le mail

const User = require('../models/user');

const dotenv = require('dotenv').config('/.env');

exports.signup = (req, res) => {
	const emailCrypto = crypto.HmacSHA1(req.body.email,`${process.env.CryptoEmail}`).toString();
	
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email : req.body.email,
				email: emailCrypto, // email chiffré
				password: hash
			});
			console.log(new user, 'hummmm')
			user
				.save()
				.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
				.catch((error) => res.status(400).json({ error }));
				})
				.catch((error) => res.status(500).json({ message: error }));
		
};

exports.login = (req, res) => {
	User.findOne(req.body.email)
		.then((user) => {
			if (!user) {
				return res.status(401).json({ message: 'aucun compte ne correspond à votre adresse mail !' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ message: 'Mot de passe incorrect !' });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{
								userId: user._id
							},
							'KEY_SECRET',
							{ expiresIn: '12h' }
						)
					});
				})
				.catch((error) => res.status(500).json({ message: error }));
		})
		.catch((error) => res.status(500).json({ message:error}));
};
