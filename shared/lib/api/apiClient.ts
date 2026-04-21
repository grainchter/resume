import { ApiClient } from "./apiClientClass";

export const api = new ApiClient({
  baseURL: "/api",
});

async function getAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("auth_token")?.value ?? null;
  } else {
    const match = document.cookie.match(/(?:^|; )auth_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
}

api.addRequestInterceptor(async ({ url, options }) => {
  const token = await getAuthToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return { url, options };
});

api.addResponseInterceptor(async (response) => {
  if (!response.ok) {
    if (process.env.NODE_ENV !== "production") {
      const text = await response.text();
      console.error(`API error ${response.status}:`, text);
    }

    if (response.status === 401 && typeof window !== "undefined") {
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    throw new Error(`API error: ${response.status}`);
  }
  return response;
});
