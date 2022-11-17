const express = require("express");
const router = express.Router();
const shirts = require("../Models/shirtModel");

router.get("/getAll", async (req, res) => {
	try {
		const data = await shirts.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/getEth", async (req, res) => {
	try {
		const data = await shirts.find({ design: "Ethereum" });
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/getPoly", async (req, res) => {
	try {
		const data = await shirts.find({ design: "Polygon" });
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/getAvax", async (req, res) => {
	try {
		const data = await shirts.find({ design: "Avalanche" });
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/getBitcoin", async (req, res) => {
	try {
		const data = await shirts.find({ design: "Bitcoin" });
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
