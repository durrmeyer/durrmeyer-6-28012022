const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

 require('dotenv').config('/.env');
 const regEpx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

 exports.signup = (req, res) => {
    // vérifie si l'email est bien formé et/ou si le mot de passe fait plus de 4 caractères
    if (regEpx.test(String(req.body.email).toLowerCase()) && req.body.password.length > 8) {
        // Vérifie si l'utilisateur existe déjà
        User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                //  sécurise le mot de passe en le hachant
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    // crée une instance du model User, y insert les données et les sauvegardes dans la base de données.
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(() => {
                        // message retourné en cas de réussite
                        res.status(201).json({ message: 'Utilisateur créé !'})
                    })
                    .catch(error => {
                        // message d'erreur retourné en cas d'échec de l'ajout des données dans la BDD 
                        res.status(500).json({ error });
                    });
                })
                // message d'erreur en cas d'échec de hachage du mot de passe
                .catch(error => res.status(500).json({ error }));
            } else {
                // message d'erreur si l'utilisateur à été trouvé dans la BDD
                return res.status(401).json({ message: ' déjà inscrit!'});
            }
            
        })
        // message d'erreur si la présence de l'utilisateur dans la BDD n'a pu être vérifié
        .catch(error => res.status(500).json({ error }));
    } else {
        //message d'erreur si l'email est mal formé ou/et si le mot de passe est trop court
        res.status(401).json({ message: 'mot de passe trop court, il vous faut 8 lettres minimum !'});
    }
};


 exports.login = (req, res) => {
	User.findOne({email: req.body.email})
		.then(user => {
			if (!user) {
				return res.status(401).json({ message: 'aucun compte ne correspond à votre adresse mail !' });
			} 
			bcrypt
				.compare(req.body.password, user.password)
				.then(valid => {
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
                .catch(error => res.status(500).json({ error }));
				});
        }
		
		
			
				


