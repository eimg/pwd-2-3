import { router, Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppProvider, { useApp } from "@/components/AppProvider";

const queryClient = new QueryClient();

function AppContent() {
	const { isLoading, user } = useApp();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<Stack>
					<Stack.Screen
						name="(home)"
						options={{
							title: "Home",
							headerRight: () => user ? (
								<TouchableOpacity
									onPress={() => router.push("/new-post")}>
									<Ionicons
										name="add"
										size={28}
										color="black"
									/>
								</TouchableOpacity>
							) : null,
						}}
					/>
					<Stack.Screen
						name="view/[id]"
						options={{
							title: "View",
						}}
					/>
                    <Stack.Screen
                        name="new-post"
                        options={{
                            title: "New Post",
                            presentation: "modal",
                        }}
                    />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<AppContent />
			</AppProvider>
		</QueryClientProvider>
	);
}
