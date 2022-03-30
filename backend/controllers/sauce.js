const Sauce = require('../models/sauce');
// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modifier ou supprimer des fichiers

//-------------------------------------création d'une nouvelle pubication------------------------------//
exports.createSauce = (req, res) => {
	const sauceObjet = JSON.parse(req.body.sauce);
	const sauce = new Sauce({
		...sauceObjet,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});

	sauce
		.save()
		.then(() => res.status(201).json({ message: 'Sauce crée !!' }))
		.catch((error) => res.status(400).json({ message: error }));
};

// ----------------------------------modification de la publication----------------------------------//
exports.modifySauce = (req, res) => {
	const sauceObjet = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			}
		: { ...req.body }; //fichier n'existe pas

	Sauce.updateOne(
		{ _id: req.params.id },
		{
			...sauceObjet, //copie de notre objet
			_id: req.params.id
		}
	)
		.then(() => res.status(200).json({ message: 'Objet modifié !' }))
		.catch((error) => res.status(400).json({ message: error }));
};

// ----------------------------------suppression de la publication----------------------------------//
exports.deleteSauce = (req, res) => {
	//récupération dans la base de donnée

	//l'id de la sauce doit être le même que le paramètre de requête
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			//supprime l'ancienne image du server
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Objet supprimé!' }))
					.catch((error) => res.status(400).json({ message: error }));
			});
		})
		.catch((error) => res.status(500).json({ message: error }));
};

// Permet de récuperer toutes les sauces de la base MongoDB
exports.getAllSauces = (req, res) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ message: error }));
};
// Permet de récuperer une sauce de la base MongoDB
exports.getOneSauce = (req, res) => {
	// On l'identifie par l'ID
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ message: error }));
};

////////////////////////////////////////////    LIKE   OU    DISLIKE  ////////////////////////////////////////////////////////////

exports.likeUser = (req, res) => {
	let like = req.body.like;
	// On prend le userID
	let userId = req.body.userId;
	// On prend l'id de la sauce
	let sauceId = req.params.id;
	//l'utilisateur aime une sauce
	if (like === 1) {
		// On ajoute 1 like et on l'envoie dans le tableau "usersLiked"

		Sauce.updateOne({ _id: sauceId }, { $inc: { likes: +1 }, $push: { usersLiked: userId } })
			.then(() => res.status(200).json({ message: 'Like ajouté !' }))
			.catch((error) => res.status(400).json({ error }));
	} else if (like === -1) {
		//l'utilisateur n'aime pas une sauce//
		// On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
		Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } })
			.then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
			.catch((error) => res.status(400).json({ error }));
	} else if (like === 0) {
		// Si like === 0 l'utilisateur supprime son vote
		Sauce.findOne({ _id: sauceId }).then((sauce) => {
			// Si le tableau "userLiked" contient l'ID de l'utilisateur
			if (sauce.usersLiked.includes(userId)) {
				// On enlève un like du tableau "userLiked"
				sauce
					.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
					.then(() => {
						res.status(200).json({ message: 'Like supprimé !' });
					})
					.catch((error) => res.status(400).json({ error }));
			} else if (sauce.usersDisliked.includes(userId)) {
				// Si le tableau "userDisliked" contient l'ID de l'utilisateur
				// On enlève un dislike du tableau "userDisliked"
				sauce
					.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
					.then(() => {
						res.status(200).json({ message: 'Dislike supprimé !' });
					})
					.catch((error) => res.status(400).json({ error }));
			}
		});
	}
};
