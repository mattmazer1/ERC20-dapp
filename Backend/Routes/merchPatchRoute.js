const express = require("express");
const router = express.Router();
const shirts = require("../Models/shirtModel");

router.patch("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		console.log(updatedData);
		const options = { new: true };

		const result = await shirts.findByIdAndUpdate(id, updatedData, options);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
