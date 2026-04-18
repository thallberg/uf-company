const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function ApiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  // const text = await res.text();

  // if (!text) {
  //   return {} as T; 
  // }

    if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}
