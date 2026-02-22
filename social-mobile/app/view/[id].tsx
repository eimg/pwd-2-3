import { useLocalSearchParams } from "expo-router";
import type { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";

import { View, Text, ScrollView, TextInput } from "react-native";
import Post from "@/components/post";
import { Button } from "@react-navigation/elements";
import Comment from "@/components/comment";

const api = "http://localhost:8800/posts";

async function fetchPost(id: string): Promise<PostType> {
	const res = await fetch(`${api}/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useLocalSearchParams();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id as string),
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
			{post && <Post post={post} />}
			<View style={{ paddingHorizontal: 16 }}>
				<TextInput
					style={{
						padding: 10,
						borderRadius: 20,
						fontSize: 18,
						borderWidth: 1,
						borderColor: "#99999980",
						marginBottom: 6,
					}}
					placeholder="Your reply"
				/>
				<Button>Add Comment</Button>

				<View style={{ marginTop: 10 }}>
					{post?.comments.map(comment => {
						return (
							<Comment
								key={comment.id}
								comment={comment}
							/>
						);
					})}
				</View>
			</View>
		</ScrollView>
	);
}
