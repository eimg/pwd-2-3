import { useLocalSearchParams } from "expo-router";
import type { PostType } from "@/types/global";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { View, Text, ScrollView, TextInput, Alert, TouchableOpacity } from "react-native";
import Post from "@/components/post";
import Comment from "@/components/comment";
import { useApp } from "@/components/AppProvider";
import { addComment, API_BASE_URL } from "@/utils/api";
import { useState } from "react";

const api = `${API_BASE_URL}/posts`;

async function fetchPost(id: string): Promise<PostType> {
	const res = await fetch(`${api}/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useLocalSearchParams();
	const { user } = useApp();
	const queryClient = useQueryClient();
	const [commentText, setCommentText] = useState("");
	const [isAddingComment, setIsAddingComment] = useState(false);

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id as string),
	});

	const handleAddComment = async () => {
		if (!commentText.trim()) {
			Alert.alert("Error", "Please enter a comment");
			return;
		}

		setIsAddingComment(true);
		try {
			await addComment(Number(id), commentText.trim());
			setCommentText("");
			queryClient.invalidateQueries({ queryKey: ["post", id] });
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		} catch (error) {
			Alert.alert("Error", "Failed to add comment");
		} finally {
			setIsAddingComment(false);
		}
	};

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
				{/* Only show comment form if user is authenticated */}
				{user ? (
					<>
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
							value={commentText}
							onChangeText={setCommentText}
							editable={!isAddingComment}
							multiline
						/>
						<TouchableOpacity
							onPress={handleAddComment}
							disabled={!commentText.trim() || isAddingComment}
							style={{
								backgroundColor: (!commentText.trim() || isAddingComment) ? "#cccccc" : "#007AFF",
								padding: 12,
								borderRadius: 20,
								alignItems: "center",
							}}
						>
							<Text style={{ 
								color: "white", 
								fontSize: 16, 
								fontWeight: "bold" 
							}}>
								{isAddingComment ? "Adding..." : "Add Comment"}
							</Text>
						</TouchableOpacity>
					</>
				) : (
					<View style={{
						padding: 16,
						backgroundColor: "#f8f8f8",
						borderRadius: 10,
						alignItems: "center",
						marginBottom: 6,
					}}>
						<Text style={{ color: "#666", fontSize: 16 }}>
							Please log in to add comments
						</Text>
					</View>
				)}

				<View style={{ marginTop: 10 }}>
					{post?.comments.map(comment => {
						return (
							<Comment
								key={comment.id}
								comment={comment}
								postId={post.id}
							/>
						);
					})}
				</View>
			</View>
		</ScrollView>
	);
}
