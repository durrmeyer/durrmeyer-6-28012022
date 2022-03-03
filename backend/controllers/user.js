const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash
			});
			user
				.save()
				.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
				.catch((error) => res.status(400).json({ message: error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: 'aucun compte ne correspond à votre adresse mail !' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: 'Mot de passe incorrect !' });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{
								userId: user._id
							},
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '2h' }
						)
					});
				})
				.catch((error) => res.status(500).json({ message: error }));
		})
		.catch((error) => res.status(500).json({ message: error }));
};
