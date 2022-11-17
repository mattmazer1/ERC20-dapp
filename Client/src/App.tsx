import { useState, createContext } from "react";
import Cards2 from "./Components/Card2";
import Cards3 from "./Components/Card3";
import Cards4 from "./Components/Card4";
import Cards1 from "./Components/Cards1";
import ErrorNotify from "./Components/Error";
import Navbar from "./Components/Navbar";

export const LoggedInContext = createContext({
	loggedIn: false,
	setLoggedIn: (setLoggedIn: boolean): void => {},
});

export const WalletAddyContext = createContext({
	walletAddress: undefined,
	setWalletAddress: (setWalletAddress: any): void => {},
});

export const ErrorContext = createContext({
	showError: false,
	setShowError: (setShowError: boolean): void => {},
});

export default function App() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [walletAddress, setWalletAddress] = useState<any>();
	const [showError, setShowError] = useState(false);
	return (
		<div>
			<LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
				<WalletAddyContext.Provider value={{ walletAddress, setWalletAddress }}>
					<ErrorContext.Provider value={{ showError, setShowError }}>
						<Navbar />
						<ErrorNotify />
						<div className=" flex flex-row justify-center flex-wrap ml-20 mr-20 mt-20 ">
							<Cards1 />
							<Cards2 />
							<Cards3 />
							<Cards4 />
						</div>
					</ErrorContext.Provider>
				</WalletAddyContext.Provider>
			</LoggedInContext.Provider>
			<div className="flex flex-col justify-center items-center text-center ml-20 mr-20 mb-28">
				<div>All shirts cost 1 MATT each</div>
				<div>
					You can buy MattCoin
					<a
						href="https://app.uniswap.org/#/swap?chain=goerli"
						target="_blank"
						rel="noopener noreferrer"
						className=" text-cyan-400 underline"
					>
						here
					</a>
				</div>
				<div>MattCoin token address on Goerli:</div>
				<div>
					<a
						href="https://goerli.etherscan.io/address/0xd84393dc39A6b83235a74B9C3081c8DE9DB6e5FF"
						target="_blank"
						rel="noopener noreferrer"
						className=" text-cyan-400 underline"
					>
						Address
					</a>
				</div>
			</div>
		</div>
	);
}
