import { useState, createContext, useContext, useEffect } from "react";
import type { UserType } from "@/types/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "@/utils/api";

const AppContext = createContext<{
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    isLoading: boolean;
}>({
    user: null,
    setUser: () => {},
    isLoading: true,
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token and auto-login
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    // Verify token with the server
                    const response = await apiRequest("/users/verify");
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        // Token is invalid, remove it
                        await AsyncStorage.removeItem("token");
                    }
                }
            } catch (error) {
                console.error("Error checking auth token:", error);
                // Remove invalid token
                await AsyncStorage.removeItem("token");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthToken();
    }, []);

    const handleSetUser = async (newUser: UserType | null) => {
        setUser(newUser);
        if (!newUser) {
            // User is logging out, remove token
            await AsyncStorage.removeItem("token");
        }
    };

    return (
        <AppContext.Provider value={{ user, setUser: handleSetUser, isLoading }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }

    return context;
}
