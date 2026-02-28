import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/utils/api";

const api = `${API_BASE_URL}/posts`;

export default function NewPost() {
	const [content, setContent] = useState("");
	const queryClient = useQueryClient();

	const createPost = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(api, {
			method: "POST",
			body: JSON.stringify({ content }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
			router.dismissTo("/");
		} else {
			Alert.alert("Error", "Failed to create post");
		}
	};

	return (
		<View style={{ flex: 1, padding: 16, gap: 16 }}>
			<TextInput
				placeholder="What's on your mind?"
				value={content}
				onChangeText={setContent}
				style={{
					borderWidth: 1,
					borderColor: "#99999980",
					borderRadius: 20,
					padding: 10,
				}}
			/>
			<TouchableOpacity
				onPress={createPost}
				style={{
					backgroundColor: "#007AFF",
					padding: 10,
					borderRadius: 20,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Text
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "bold",
					}}>
					Post
				</Text>
			</TouchableOpacity>
		</View>
	);
}
