const mongoose = require("mongoose");

const shirtSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},

	design: {
		type: String,
		required: true,
	},

	color: {
		type: String,
		required: true,
	},

	sizeS: {
		size: {
			type: String,
			required: true,
		},

		stock: {
			type: Number,
			required: true,
		},
	},

	sizeM: {
		size: {
			type: String,
			required: true,
		},

		stock: {
			type: Number,
			required: true,
		},
	},
});

const shirts = mongoose.model("shirts", shirtSchema);

module.exports = shirts;
