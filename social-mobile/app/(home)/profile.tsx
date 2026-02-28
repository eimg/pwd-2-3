import {
	Text,
	View,
	TextInput,
	Alert,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { API_BASE_URL } from "@/utils/api";

const API_BASE = `${API_BASE_URL}/users`;

export default function Profile() {
	const { user, setUser } = useApp();

	const [isRegisterMode, setIsRegisterMode] = useState(false);
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const login = async () => {
		if (!username.trim() || !password.trim()) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setIsLoading(true);
		try {
			const res = await fetch(`${API_BASE}/login`, {
				method: "POST",
				body: JSON.stringify({ username: username.trim(), password }),
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
				const errorData = await res.json().catch(() => ({}));
				Alert.alert("Error", errorData.msg || "Invalid username or password");
			}
		} catch (error) {
			Alert.alert("Error", "Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const register = async () => {
		if (!name.trim() || !username.trim() || !password.trim()) {
			Alert.alert("Error", "Please fill in all required fields");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters long");
			return;
		}

		setIsLoading(true);
		try {
			const res = await fetch(API_BASE, {
				method: "POST",
				body: JSON.stringify({ 
					name: name.trim(), 
					username: username.trim(), 
					password,
					bio: bio.trim() || undefined
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const userData = await res.json();
				Alert.alert("Success", "Account created successfully! Please login.", [
					{
						text: "OK",
						onPress: () => {
							setIsRegisterMode(false);
							setName("");
							setBio("");
							// Keep username filled for easy login
						}
					}
				]);
			} else {
				const errorData = await res.json().catch(() => ({}));
				Alert.alert("Error", errorData.msg || "Registration failed");
			}
		} catch (error) {
			Alert.alert("Error", "Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const clearForm = () => {
		setName("");
		setUsername("");
		setPassword("");
		setBio("");
	};

	const toggleMode = () => {
		setIsRegisterMode(!isRegisterMode);
		clearForm();
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
					<TouchableOpacity
						onPress={() => setUser(null)}
						style={{
							backgroundColor: "red",
							paddingVertical: 10,
                            paddingHorizontal: 20,
							borderRadius: 20,
						}}>
						<Text
							style={{
								color: "white",
								fontSize: 18,
								fontWeight: "bold",
							}}>
							Logout
						</Text>
					</TouchableOpacity>
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
						{isRegisterMode ? "Register" : "Login"}
					</Text>

					{isRegisterMode && (
						<TextInput
							placeholder="Full Name"
							value={name}
							onChangeText={setName}
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
					)}

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
						placeholder={isRegisterMode ? "Password (min 6 characters)" : "Password"}
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

					{isRegisterMode && (
						<TextInput
							placeholder="Bio (optional)"
							value={bio}
							onChangeText={setBio}
							multiline
							numberOfLines={3}
							style={{
								borderWidth: 1,
								borderColor: "#99999980",
								borderRadius: 20,
								padding: 10,
								marginBottom: 10,
								fontSize: 18,
								width: "80%",
								alignSelf: "center",
								textAlignVertical: "top",
							}}
						/>
					)}

					<TouchableOpacity
						onPress={isRegisterMode ? register : login}
						disabled={isLoading}
						style={{
                            width: "80%",
                            alignSelf: "center",
							backgroundColor: isLoading ? "#cccccc" : "#007AFF",
							padding: 10,
							borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center",
							marginBottom: 10,
						}}>
						<Text
							style={{
								color: "white",
								fontSize: 18,
								fontWeight: "bold",
							}}>
							{isLoading ? "Please wait..." : (isRegisterMode ? "Register" : "Login")}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={toggleMode}
						disabled={isLoading}
						style={{
							padding: 10,
						}}>
						<Text
							style={{
								color: "#007AFF",
								fontSize: 16,
								textAlign: "center",
							}}>
							{isRegisterMode 
								? "Already have an account? Login" 
								: "Don't have an account? Register"}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
