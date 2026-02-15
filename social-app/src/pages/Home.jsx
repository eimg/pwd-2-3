import { Box } from "@mui/material";
import Post from "../components/Post";

import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800/posts";

export default function Home() {
	const {
		data: posts,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await fetch(api);
			return res.json();
		},
	});

	if (isLoading) {
		return <Box sx={{ mt: 4, textAlign: "center" }}>Loading...</Box>;
	}

	if (error) {
		return <Box sx={{ mt: 4, textAlign: "center" }}>{error.message}</Box>;
	}

	return (
		<Box sx={{ mt: 4 }}>
			{posts.map(post => {
				return (
					<Post
						key={post.id}
						post={post}
					/>
				);
			})}
		</Box>
	);
}
