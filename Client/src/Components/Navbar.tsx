import { useState, useEffect, useContext } from "react";
import { provider, signer } from "../ABI";
import { ErrorContext, LoggedInContext, WalletAddyContext } from "../App";

export default function Navbar() {
	const [buttonText, setButtonText] = useState("Connect wallet");
	const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
	const { setWalletAddress } = useContext(WalletAddyContext);
	const { setShowError } = useContext(ErrorContext);

	const connectNetwork = async () => {
		const chainId = 5; //goerli
		if (window.ethereum.networkVersion !== chainId) {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x5" }],
			});
			setButtonText("Connected");
			setLoggedIn(true);
		}
	};

	const connectWallet = async () => {
		if (window.ethereum) {
			await provider.send("eth_requestAccounts", []);
			connectNetwork();

			window.ethereum.on("accountsChanged", function () {
				fetchAddress();
			});

			window.ethereum.on("networkChanged", function () {
				window.location.reload();
			});
		} else {
			setButtonText("Connect Wallet");
			setShowError(true);
			const err1 = setTimeout(() => {
				setShowError(false);
			}, 2000);

			return () => clearTimeout(err1);
		}
	};

	useEffect(() => {
		connectWallet();
	}, []);

	const fetchAddress = async () => {
		const signerAddress = await signer.getAddress();
		setWalletAddress(signerAddress);
	};
	useEffect(() => {
		fetchAddress();
	}, [loggedIn]);
	return (
		<div className=" mt-5 relative flex flex-row justify-center">
			<div className="text-3xl mt-20 sm:mt-5">Featured products</div>

			<button
				onClick={connectWallet}
				className=" absolute right-2 text-xl bg-orange-600 rounded-lg px-3 py-2 hover:bg-orange-700 bounce"
			>
				{buttonText}
			</button>
		</div>
	);
}
