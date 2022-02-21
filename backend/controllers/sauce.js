const Sauce = require('../models/sauce');
const fs = require('fs');

//-------------------------------------création d'une nouvelle pubication------------------------------//
exports.createSauce = (req, res) => {
	const sauceObjet = JSON.parse(req.body.sauce);
	console.log(sauceObjet);
	delete sauceObjet._id;
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
	console.log(req);
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

exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(' images/${filename}', () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Objet supprimé!' }))
					.catch((error) => res.status(400).json({ message: error }));
			});
			console.log(Sauce.deleteOne);
		})
		.catch((error) => res.status(500).json({ message: error }));
};

exports.getAllSauces = (req, res) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ message: error }));
};

exports.getOneSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ message: error }));
};
