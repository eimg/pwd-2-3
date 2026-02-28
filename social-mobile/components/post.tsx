import { View, Text, TouchableOpacity, Alert } from "react-native";
import type { PostType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useApp } from "@/components/AppProvider";
import { deletePost, likePost, unlikePost } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Post({ post }: { post: PostType }) {
	const { user } = useApp();
	const queryClient = useQueryClient();
	const [isLiked, setIsLiked] = useState(
		post.likes.some(like => like.userId === user?.id)
	);
	const [likeCount, setLikeCount] = useState(post.likes.length);

	const handleDeletePost = async () => {
		if (!user || user.id !== post.user.id) {
			Alert.alert("Error", "You can only delete your own posts");
			return;
		}

		Alert.alert(
			"Delete Post",
			"Are you sure you want to delete this post?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						const success = await deletePost(post.id);
						if (success) {
							queryClient.invalidateQueries({ queryKey: ["posts"] });
							Alert.alert("Success", "Post deleted successfully");
						} else {
							Alert.alert("Error", "Failed to delete post");
						}
					},
				},
			]
		);
	};

	const handleLikeToggle = async () => {
		if (!user) {
			Alert.alert("Error", "Please login to like posts");
			return;
		}

		const success = isLiked ? await unlikePost(post.id) : await likePost(post.id);
		
		if (success) {
			setIsLiked(!isLiked);
			setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
			Alert.alert("Error", "Failed to update like status");
		}
	};

	return (
		<View
			style={{
				padding: 20,
				marginBottom: 20,
				borderBottomColor: "#99999960",
				borderBottomWidth: 1,
			}}>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<View
					style={{
						width: 52,
						height: 52,
						borderRadius: 52,
						backgroundColor: "green",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text style={{ color: "white", fontSize: 18 }}>
						{post.user.name[0]}
					</Text>
				</View>
				<View style={{ flexShrink: 1, flex: 1 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
						<View>
							<Text style={{ fontWeight: "bold", fontSize: 16 }}>
								{post.user.name}
							</Text>
							<Text style={{ color: "green" }}>{post.createdAt}</Text>
						</View>
						{user && user.id === post.user.id && (
							<TouchableOpacity onPress={handleDeletePost}>
								<Ionicons name="trash-outline" size={20} color="red" />
							</TouchableOpacity>
						)}
					</View>
					<TouchableOpacity onPress={() => router.push(`/view/${post.id}`)}>
						<Text style={{ fontSize: 16, marginTop: 8 }}>
							{post.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					marginTop: 14,
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}>
					<TouchableOpacity onPress={handleLikeToggle}>
						<Ionicons
							color="red"
							name={isLiked ? "heart" : "heart-outline"}
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleLikeToggle}>
						<Text>{likeCount}</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							color="green"
							name="chatbubble-outline"
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>{post.comments.length}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
