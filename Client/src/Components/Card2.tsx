import { useState, useEffect, useContext } from "react";
import img2 from "../Images/polygon.jpg";
import { contract } from "../ABI";
import { ethers } from "ethers";
import { ErrorContext, WalletAddyContext } from "../App";

export default function Cards2() {
	const [polyShirts, setPolyShirts] = useState<any>([]);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [polyStockS, setPolyStockS] = useState<any>();
	const [polyStockM, setPolyStockM] = useState<any>();
	const [noStockS, setNoStockS] = useState<boolean>(false);
	const [noStockM, setNoStockM] = useState<boolean>(false);
	const { walletAddress } = useContext(WalletAddyContext);
	const { setShowError } = useContext(ErrorContext);

	const polyPatch1 = async (newNum: number) => {
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
				process.env.REACT_APP_PATCH_3 as string,
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

	const polyPatch2 = async (newNum2: number) => {
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
				process.env.REACT_APP_PATCH_3 as string,
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

	const polyData = async () => {
		const response = await fetch(process.env.REACT_APP_GET_POLY as string);

		if (!response.ok) {
			throw new Error("Something went wrong");
		}
		const data = await response.json();
		setPolyStockS(data[0].sizeS.stock);
		data[0].sizeS.stock === 0 ? setNoStockS(true) : setNoStockS(false);

		setPolyStockM(data[0].sizeM.stock);
		data[0].sizeM.stock === 0 ? setNoStockM(true) : setNoStockM(false);

		setPolyShirts(data);
	};

	const fetchAll = async () => {
		try {
			await polyData();
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
				const newStock = polyStockS - 1;
				polyPatch1(newStock);
			} catch (error) {
				setShowError(true);
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
				const newStock = polyStockM - 1;
				polyPatch2(newStock);
			} catch (error) {
				setShowError(true);
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
				{polyShirts.length > 0 && (
					<div className="card">
						<div className="flex flex-col justify-center items-center">
							<img
								className="h-imageHeight"
								src={img2}
								alt="Poly-shirt"
								height={200}
								width={200}
							/>
							{polyShirts.map((polyShirt: any, index: any) => (
								<div key={index} className="text-center mt-4">
									<div className=" text-xl font-bold">
										{polyShirt.design} shirt
									</div>
									<div>Colour: {polyShirt.color}</div>

									<div className=" flex flex-row, justify-center, items-center mt-2">
										<div className="smallBorder">
											<div>Size: {polyShirt.sizeS.size} </div>
											<div>Stock: {polyShirt.sizeS.stock} left</div>
											<button onClick={purchaseS} className=" buyNow">
												Buy Now
											</button>
										</div>
										<div className="smallBorder">
											<div>Size: {polyShirt.sizeM.size} </div>
											<div>Stock: {polyShirt.sizeM.stock} left</div>
											<button onClick={purchaseM} className=" buyNow">
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
