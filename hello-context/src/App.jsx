import { useState, createContext, useContext } from "react";

const AppContext = createContext();

function Title() {
    const mode = useContext(AppContext);

	return (
		<h1
			style={{
				padding: 20,
				background: mode == "dark" ? "black" : "silver",
				color: mode == "dark" ? "white" : "black",
			}}>
			Hello React
		</h1>
	);
}

function Header() {
	return (
		<div>
			<Title />
		</div>
	);
}

export default function App() {
	const [mode, setMode] = useState("dark");

	return (
		<AppContext.Provider value={mode}>
			<Header/>
			<button onClick={() => setMode(mode == "dark" ? "light" : "dark")}>
				Mode
			</button>
		</AppContext.Provider>
	);
}
