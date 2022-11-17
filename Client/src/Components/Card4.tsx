import { useState, useEffect, useContext } from "react";
import img4 from "../Images/bitcoin.jpg";
import { contract } from "../ABI";
import { ethers } from "ethers";
import { ErrorContext, WalletAddyContext } from "../App";

export default function Cards4() {
	const [bitcoinShirts, setBitcoinShirts] = useState<any>([]);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [bitcoinStockS, setBitcoinStockS] = useState<any>();
	const [bitcoinStockM, setBitcoinStockM] = useState<any>();
	const [noStockS, setNoStockS] = useState<boolean>(false);
	const [noStockM, setNoStockM] = useState<boolean>(false);
	const { walletAddress } = useContext(WalletAddyContext);
	const { setShowError } = useContext(ErrorContext);

	const bitcoinPatch1 = async (newNum: number) => {
		const patchData = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				sizeS: {
					size: "S",
					stock: newNum,
				},
			}),
		};

		try {
			const response = await fetch(
				process.env.REACT_APP_PATCH_7 as string,
				patchData
			);
			await response.json();

			if (!response.ok) {
				throw new Error("Something went wrong");
			}
		} catch (error: any) {
			setError(error.message);
			console.log(error);
		}
	};

	const bitcoinPatch2 = async (newNum2: number) => {
		const patchData = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				sizeM: {
					size: "M",
					stock: newNum2,
				},
			}),
		};

		try {
			const response = await fetch(
				process.env.REACT_APP_PATCH_7 as string,
				patchData
			);
			await response.json();

			if (!response.ok) {
				throw new Error("Something went wrong");
			}
		} catch (error: any) {
			setError(error.message);
			console.log(error);
		}
	};

	const bitcoinData = async () => {
		const response = await fetch(process.env.REACT_APP_GET_BITCOIN as string);

		if (!response.ok) {
			throw new Error("Something went wrong");
		}
		const data = await response.json();
		setBitcoinStockS(data[0].sizeS.stock);
		data[0].sizeS.stock === 0 ? setNoStockS(true) : setNoStockS(false);

		setBitcoinStockM(data[0].sizeM.stock);
		data[0].sizeM.stock === 0 ? setNoStockM(true) : setNoStockM(false);

		setBitcoinShirts(data);
	};

	const fetchAll = async () => {
		try {
			await bitcoinData();
			setLoading(false);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchAll();
	}, []);

	const purchaseS = async () => {
		if (noStockS === false) {
			const price = ethers.utils.parseEther("1");
			const myWallet = "0x5e84BDda5426F59Db64991157e081AE653FB0c6f";
			try {
				const approveFunction = await contract.approve(walletAddress, price);
				await approveFunction.wait(1);
				await contract.transferFrom(walletAddress, myWallet, price);
				//await approveTransfer.wait();
				const newStock = bitcoinStockS - 1;
				bitcoinPatch1(newStock);
			} catch (error) {
				const err3 = setTimeout(() => {
					setShowError(false);
				}, 2000);
				return () => clearTimeout(err3);
			}
		} else {
			setShowError(true);
			const err1 = setTimeout(() => {
				setShowError(false);
			}, 2000);
			return () => clearTimeout(err1);
		}
	};

	const purchaseM = async () => {
		if (noStockM === false) {
			const price = ethers.utils.parseEther("1");
			const myWallet = "0x5e84BDda5426F59Db64991157e081AE653FB0c6f";
			try {
				const approveFunction = await contract.approve(walletAddress, price);
				await approveFunction.wait(1);
				await contract.transferFrom(walletAddress, myWallet, price);
				//await approveTransfer.wait();
				const newStock = bitcoinStockM - 1;
				bitcoinPatch2(newStock);
			} catch (error) {
				const err4 = setTimeout(() => {
					setShowError(false);
				}, 2000);
				return () => clearTimeout(err4);
			}
		} else {
			setShowError(true);
			const err2 = setTimeout(() => {
				setShowError(false);
			}, 2000);
			return () => clearTimeout(err2);
		}
	};

	return (
		<div>
			<div>
				{loading && <div>Loading...</div>}
				{error && <h1>{error}</h1>}
				{bitcoinShirts.length > 0 && (
					<div className="card mb-10">
						<div className="flex flex-col justify-center items-center">
							<img
								className=" h-imageHeight"
								src={img4}
								alt="Bitcoin-shirt"
								height={200}
								width={200}
							/>
							{bitcoinShirts.map((bitcoinShirt: any, index: any) => (
								<div key={index} className=" text-center mt-4">
									<div className="text-xl font-bold">
										{bitcoinShirt.design} shirt
									</div>
									<div>Colour: {bitcoinShirt.color}</div>
									<div className=" flex flex-row, justify-center, items-center mt-2">
										<div className="smallBorder">
											<div>Size: {bitcoinShirt.sizeS.size} </div>
											<div>Stock: {bitcoinShirt.sizeS.stock} left</div>
											<button onClick={purchaseS} className="buyNow">
												Buy Now
											</button>
										</div>
										<div className=" smallBorder">
											<div>Size: {bitcoinShirt.sizeM.size} </div>
											<div>Stock: {bitcoinShirt.sizeM.stock} left </div>
											<button onClick={purchaseM} className="buyNow ">
												Buy Now
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
