import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useNavigate } from "react-router";

export default function Comment({ comment }) {
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
						{comment.user.name[0]}
					</Avatar>
				</Box>
				<Box>
					<Typography>{comment.user.name}</Typography>
					<Typography sx={{ color: grey[500] }}>
						{comment.createdAt}
					</Typography>
					<Typography>
						{comment.content}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
