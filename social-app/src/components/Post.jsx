import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, IconButton, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";

import {
    FavoriteBorderOutlined as LikeIcon,
    ChatBubbleOutline as CommentIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function Post() {
    const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2, p: 3 }}>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Box>
					<Avatar
						sx={{ width: 52, height: 52, background: green[500] }}>
						A
					</Avatar>
				</Box>
				<Box>
					<Typography>Alice Rhys</Typography>
					<Typography sx={{ color: green[500] }}>
						a few seconds agao
					</Typography>
					<Typography onClick={() => navigate("/view")}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Rerum adipisci obcaecati in recusandae expedita. Iure
						labore expedita omnis beatae soluta dolorem repudiandae?
						Perspiciatis facilis dolorem odio architecto, suscipit
						iusto fugit!
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
				<ButtonGroup>
					<IconButton size="sm">
						<LikeIcon color="error" />
					</IconButton>
					<Button
						size="sm"
						variant="text">
						5
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<IconButton size="sm">
						<CommentIcon sx={{ color: grey[500] }} />
					</IconButton>
					<Button
						size="sm"
						variant="text">
						10
					</Button>
				</ButtonGroup>
			</Box>
		</Card>
	);
}
