const Sauce = require('../models/sauce');
/*const fs = require('fs');*/

// Créer et sauvegarder une sauce
exports.createSauce = (req, res) => {
	const sauceObjet = JSON.parse(req.body.sauce);
	console.log(sauceObjet);
	const sauce = new Sauce({
		...sauceObjet,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: 'Sauce crée !!' }))
		.catch((error) => res.status(400).json({ message: error }));
};

//-------------------------------------création d'une nouvelle pubication------------------------------//
exports.createSauce = (req, res) => {
	const sauceObjet = JSON.parse(req.body.sauce);

	const sauce = new Sauce({
		...sauceObjet,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	console.log(sauce);
	sauce
		.save()
		.then(() => res.status(201).json({ message: 'Sauce crée !!' }))
		.catch((error) => res.status(400).json({ message: error }));
};

// ----------------------------------modification de la publication----------------------------------//
exports.modifySauce = (req, res, next) => {
	const sauceObjet = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			}
		: { ...req.body };
	Sauce.updateOne(
		{ _id: req.params.id },
		{
			...sauceObjet,
			_id: req.params.id
		}
	)
		.then(() => res.status(200).json({ message: 'Objet modifié !' }))
		.catch((error) => res.status(400).json({ message: error }));
};

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(' images/${filename}', () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Objet supprimé!' }))
					.catch((error) => res.status(400).json({ message: error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res) => {
	Sauce.find({ _i: req.parmas.id })
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ message: error }));
};

exports.getOneSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(400).json({ error }));
};
