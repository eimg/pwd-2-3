import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "./App";

import { useState, createContext, useContext } from "react";

const AppContext = createContext();

export default function AppPovider() {
	const [mode, setMode] = useState("dark");
	const [openDrawer, setOpenDrawer] = useState(false);

	const theme = createTheme({
		palette: { mode },
	});

	return (
		<AppContext.Provider
			value={{ mode, setMode, openDrawer, setOpenDrawer }}>
			<ThemeProvider theme={theme}>
				<App />
				<CssBaseline />
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
