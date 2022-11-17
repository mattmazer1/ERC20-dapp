const hre = require("hardhat");

async function main() {
	const MattCoin = await hre.ethers.getContractFactory("MattCoin");
	const mattCoin = await MattCoin.deploy();

	await mattCoin.deployed();

	console.log("Contract deployed to", mattCoin.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
