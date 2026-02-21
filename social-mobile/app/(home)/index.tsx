import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 21, marginBottom: 20 }}>
				Hello React Naitve
			</Text>

            <Link href={"/profile"}>Profile</Link>
		</View>
	);
}
