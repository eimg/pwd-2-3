import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppProvider from "@/components/AppProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<Stack>
					<Stack.Screen
						name="(home)"
						options={{
							title: "Home",
							headerRight: () => (
								<TouchableOpacity
									onPress={() => router.push("/new-post")}>
									<Ionicons
										name="add"
										size={28}
										color="black"
									/>
								</TouchableOpacity>
							),
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
			</AppProvider>
		</QueryClientProvider>
	);
}
