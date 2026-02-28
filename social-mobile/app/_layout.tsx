import { Stack } from "expo-router";
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
						}}
					/>
					<Stack.Screen
						name="view/[id]"
						options={{
							title: "View",
						}}
					/>
				</Stack>
			</AppProvider>
		</QueryClientProvider>
	);
}
