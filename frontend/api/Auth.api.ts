import { LoginRequest, RegisterRequest } from "@/components/features/auth/Auth.types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

type AuthResponse = {
  token: string
}

export async function loginAction(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error("Login failed")
  }

  return res.json()
}

export async function registerAction(data: any) {
  const res = await fetch("http://localhost:5011/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text(); // ✅ läs EN gång

  let responseData;

  try {
    responseData = JSON.parse(text);
  } catch {
    console.error("RAW BACKEND ERROR:", text);
    throw new Error(text || "Serverfel");
  }

  if (!res.ok) {
    console.error("BACKEND ERROR:", responseData);
    throw new Error(responseData.message || "Register failed");
  }

  return responseData;
}