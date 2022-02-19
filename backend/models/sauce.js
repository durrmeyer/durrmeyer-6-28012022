const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	mainPepper: { type: String, required: true },
	ImageUrl: { type: String },
	heat: { type: Number, required: true },
	likes: { type: Number },
	dislikes: { type: Number },
	usersLiked: { type: String },
	usersDisliked: { type: String }
});

module.exports = mongoose.model('Sauce', sauceSchema);
module.exports = new mongoose.model('Image', sauceSchema);
