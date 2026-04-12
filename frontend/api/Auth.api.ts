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

export async function registerAction(data: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error("Register failed")
  }

  return res.json()
}