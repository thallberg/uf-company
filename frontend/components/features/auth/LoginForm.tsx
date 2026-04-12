"use client"

import { AuthForm } from "./AuthForm"
import { LoginRequest } from "./Auth.types"
import { authContent } from "@/content/auth/AuthContent"
import { loginAction } from "@/api/Auth.api"

export function LoginForm() {
  const content = authContent.login
  return (
    <AuthForm<LoginRequest>
      submitLabel={content.submit}
      fields={[
        { name: "email", placeholder: content.fields.email },
        { name: "password", type: "password", placeholder: content.fields.password }
      ]}
      onSubmit={async (data) => {
        const res = await loginAction(data)
        localStorage.setItem("token", res.token)
      }}
    />
  )
}