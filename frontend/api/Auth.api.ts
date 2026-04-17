import { LoginRequest } from "@/components/features/auth/Auth.types"

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
    throw new Error(text || "Serverfel");
  }

 if (!res.ok) {
  if (res.status === 400) {
    throw new Error("E-postadressen används redan");
  }

  throw new Error("Något gick fel, försök igen");
}

  return responseData;
}