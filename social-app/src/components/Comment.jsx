import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useNavigate } from "react-router";

export default function Post() {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				mb: 2,
				p: 3,
				border: "1px solid #99999920",
			}}>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Box>
					<Avatar
						sx={{ width: 48, height: 48, background: grey[500] }}>
						A
					</Avatar>
				</Box>
				<Box>
					<Typography>Alice Rhys</Typography>
					<Typography sx={{ color: grey[500] }}>
						a few seconds agao
					</Typography>
					<Typography>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Rerum adipisci obcaecati in recusandae expedita. Iure
						labore expedita omnis beatae soluta dolorem.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
