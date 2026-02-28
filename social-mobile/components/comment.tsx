import { View, Text, TouchableOpacity, Alert } from "react-native";
import type { CommentType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useApp } from "@/components/AppProvider";
import { deleteComment } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export default function Comment({ comment, postId }: { comment: CommentType; postId?: number }) {
	const { user } = useApp();
	const queryClient = useQueryClient();

	const handleDeleteComment = async () => {
		if (!user || user.id !== comment.user.id) {
			Alert.alert("Error", "You can only delete your own comments");
			return;
		}

		Alert.alert(
			"Delete Comment",
			"Are you sure you want to delete this comment?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						const success = await deleteComment(comment.id);
						if (success) {
							if (postId) {
								queryClient.invalidateQueries({ queryKey: ["post", postId.toString()] });
							}
							queryClient.invalidateQueries({ queryKey: ["posts"] });
							Alert.alert("Success", "Comment deleted successfully");
						} else {
							Alert.alert("Error", "Failed to delete comment");
						}
					},
				},
			]
		);
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
						width: 48,
						height: 48,
						borderRadius: 52,
						backgroundColor: "grey",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text style={{ color: "white", fontSize: 18 }}>
						{comment.user.name[0]}
					</Text>
				</View>
				<View style={{ flexShrink: 1, flex: 1 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
						<Text style={{ fontWeight: "bold", fontSize: 16 }}>
							{comment.user.name}
						</Text>
						{user && user.id === comment.user.id && (
							<TouchableOpacity onPress={handleDeleteComment}>
								<Ionicons name="trash-outline" size={18} color="red" />
							</TouchableOpacity>
						)}
					</View>
					<Text style={{ fontSize: 16, marginTop: 8 }}>
						{comment.content}
					</Text>
				</View>
			</View>
		</View>
	);
}
