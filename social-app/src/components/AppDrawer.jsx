import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import {
	Home as HomeIcon,
	Person as ProfileIcon,
	PersonAdd as RegisterIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

export default function () {
	const { openDrawer, setOpenDrawer } = useApp();

	return (
		<Drawer
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}
			onClick={() => setOpenDrawer(false)}>
			<Box sx={{ background: grey[500], width: 300, height: 180 }}></Box>

			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<ProfileIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<RegisterIcon />
						</ListItemIcon>
						<ListItemText primary="Register" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
}
