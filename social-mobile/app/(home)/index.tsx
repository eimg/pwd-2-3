import Post from "@/components/post";
import { useQuery } from "@tanstack/react-query";
import {
	ScrollView,
	Text,
	View,
} from "react-native";

const api = "http://192.168.1.4:8800/posts";

import type { PostType } from "@/types/global";

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch(api);
	return res.json();
}

export default function Home() {
	const {
		data: posts,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	if (isLoading) {
		return (
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flex: 1,
				}}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flex: 1,
				}}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{posts?.map(post => {
				return (
					<Post
						key={post.id}
						post={post}
					/>
				);
			})}
		</ScrollView>
	);
}
