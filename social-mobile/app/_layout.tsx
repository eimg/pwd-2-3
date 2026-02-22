import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen
					name="(home)"
					options={{
						title: "Home",
					}}
				/>
				<Stack.Screen
					name="view/[id]"
					options={{
						title: "View",
					}}
				/>
			</Stack>
		</QueryClientProvider>
	);
}
