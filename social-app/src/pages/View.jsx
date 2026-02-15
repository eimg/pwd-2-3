import { Box, Button, OutlinedInput } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800/posts";

export default function View() {
    const { id } = useParams();
    const {
        data: post,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["posts", id],
        queryFn: async () => {
            const res = await fetch(`${api}/${id}`);
            return res.json();
        }
    });

    if (isLoading) {
		return <Box sx={{ mt: 4, textAlign: "center" }}>Loading...</Box>;
	}

	if (error) {
		return <Box sx={{ mt: 4, textAlign: "center" }}>{error.message}</Box>;
	}

	return (
		<Box sx={{ mt: 4 }}>
			<Post post={post} />

			<form>
				<OutlinedInput placeholder="your reply" fullWidth sx={{ mb: 2 }} />
				<Button variant="contained" color="secondary" fullWidth>
					Add Comment
				</Button>
			</form>

			<Box sx={{ mt: 4 }}>
				{post.comments.map(comment => {
                    return <Comment key={comment.id} comment={comment} />
                })}
			</Box>
		</Box>
	);
}
