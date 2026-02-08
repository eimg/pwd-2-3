import { Box, Button, OutlinedInput } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

export default function View() {
	return (
		<Box sx={{ mt: 4 }}>
			<Post />

			<form>
				<OutlinedInput placeholder="your reply" fullWidth sx={{ mb: 2 }} />
				<Button variant="contained" color="secondary" fullWidth>
					Add Comment
				</Button>
			</form>

			<Box sx={{ mt: 4 }}>
				<Comment />
				<Comment />
				<Comment />
			</Box>
		</Box>
	);
}
