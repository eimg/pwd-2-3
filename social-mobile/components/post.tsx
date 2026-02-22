import { View, Text, TouchableOpacity } from "react-native";
import type { PostType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Post({ post }: { post: PostType }) {
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
				<View style={{ flexShrink: 1 }}>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						{post.user.name}
					</Text>
					<Text style={{ color: "green" }}>{post.createdAt}</Text>
					<Text style={{ fontSize: 16, marginTop: 8 }}>
						{post.content}
					</Text>
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
					<TouchableOpacity>
						<Ionicons
							color="red"
							name="heart-outline"
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>5</Text>
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
						<Text>3</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
