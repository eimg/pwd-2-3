import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	IconButton,
	Typography,
} from "@mui/material";

import { green, grey } from "@mui/material/colors";

import {
	FavoriteBorderOutlined as LikeIcon,
	ChatBubbleOutline as CommentIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";

export default function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2, p: 3 }}>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Box>
					<Avatar
						sx={{ width: 52, height: 52, background: green[500] }}>
						{post.user.name[0]}
					</Avatar>
				</Box>
				<Box>
					<Typography>{post.user.name}</Typography>
					<Typography sx={{ color: green[500] }}>
						{post.createdAt}
					</Typography>
					<Typography onClick={() => navigate(`/view/${post.id}`)}>
						{post.content}
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
						{post.comments.length}
					</Button>
				</ButtonGroup>
			</Box>
		</Card>
	);
}
