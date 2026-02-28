import { Text, View, Button, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const api = "http://localhost:8800/users/login";

export default function Profile() {
	const { user, setUser } = useApp();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		const res = await fetch(api, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const { token, user } = await res.json();
			setUser(user);
			await AsyncStorage.setItem("token", token);
			router.push("/");
		} else {
			Alert.alert("Error", "Invalid username or password");
		}
	};

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{user ? (
				<View>
					<View
						style={{
							marginBottom: 20,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 21,
								marginBottom: 16,
							}}>
							Profile
						</Text>
						<Text style={{ fontSize: 16, fontWeight: "bold" }}>
							{user.name}
						</Text>
						<Text style={{ color: "#999999" }}>
							{user.username}
						</Text>
					</View>
					<Button
						title="Logout"
						onPress={() => setUser(null)}
					/>
				</View>
			) : (
				<View
					style={{
						alignItems: "center",
						width: "100%",
						flex: 1,
						justifyContent: "center",
					}}>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 21,
							marginBottom: 20,
						}}>
						Login
					</Text>
					<TextInput
						autoCapitalize="none"
						placeholder="Username"
						value={username}
						onChangeText={setUsername}
						style={{
							borderWidth: 1,
							borderColor: "#99999980",
							borderRadius: 20,
							padding: 10,
							marginBottom: 10,
							fontSize: 18,
							width: "80%",
							alignSelf: "center",
						}}
					/>
					<TextInput
						secureTextEntry={true}
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						style={{
							borderWidth: 1,
							borderColor: "#99999980",
							borderRadius: 20,
							padding: 10,
							marginBottom: 10,
							fontSize: 18,
							width: "80%",
							alignSelf: "center",
						}}
					/>
					<Button
						title="Login"
						onPress={login}
					/>
				</View>
			)}
		</View>
	);
}
