import { View, Text, TouchableOpacity } from "react-native";
import type { CommentType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function Comment({ comment }: { comment: CommentType }) {
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
				<View style={{ flexShrink: 1 }}>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						{comment.user.name}
					</Text>
					<TouchableOpacity
						onPress={() => router.push(`/view/${comment.id}`)}>
						<Text style={{ fontSize: 16, marginTop: 8 }}>
							{comment.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
