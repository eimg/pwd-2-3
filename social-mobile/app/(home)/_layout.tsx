import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="home"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="person"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
}
