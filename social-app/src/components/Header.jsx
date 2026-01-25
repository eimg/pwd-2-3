import { useApp } from "../AppProvider";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

export default function Header() {
	const { mode, setMode, setOpenDrawer } = useApp();

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
                    sx={{ mr: 2 }}
					color="inherit"
					onClick={() => setOpenDrawer(true)}>
					<MenuIcon />
				</IconButton>
				<Typography sx={{ flexGrow: 1 }}>Social</Typography>
				{mode === "dark" ? (
					<IconButton
						color="inherit"
						onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
