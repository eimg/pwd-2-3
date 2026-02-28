import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Dynamic API base URL based on platform
const getApiBaseUrl = (): string => {
  if (Platform.OS === "ios") {
    return "http://localhost:8800";
  } else {
    // Android - use 10.0.2.2 for Android emulator or 10.0.0.x for physical device
    return "http://10.0.2.2:8800";
  }
};

const API_BASE_URL = getApiBaseUrl();

export { API_BASE_URL };

export async function getAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function deletePost(postId: number): Promise<boolean> {
  try {
    const response = await apiRequest(`/posts/${postId}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}

export async function addComment(postId: number, content: string): Promise<any> {
  try {
    const response = await apiRequest(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Failed to add comment");
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId: number): Promise<boolean> {
  try {
    const response = await apiRequest(`/comments/${commentId}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
}

export async function likePost(postId: number): Promise<boolean> {
  try {
    const response = await apiRequest(`/posts/${postId}/like`, {
      method: "POST",
    });
    return response.ok;
  } catch (error) {
    console.error("Error liking post:", error);
    return false;
  }
}

export async function unlikePost(postId: number): Promise<boolean> {
  try {
    const response = await apiRequest(`/posts/${postId}/like`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error unliking post:", error);
    return false;
  }
}