"use client"

import { AuthForm } from "./AuthForm"
import { RegisterRequest } from "./Auth.types"
import { authContent } from "@/content/auth/AuthContent"
import { registerAction } from "@/api/Auth.api"

export function RegisterForm() {
  const content = authContent.register
  return (
    <AuthForm<RegisterRequest>
      submitLabel={content.submit}
      fields={[
        { name: "email", placeholder: content.fields.email },
        { name: "password", type: "password", placeholder: content.fields.password },
        { name: "fullName", placeholder: content.fields.fullName },
        { name: "address", placeholder: content.fields.address },
        { name: "city", placeholder: content.fields.city },
        { name: "postalCode", placeholder: content.fields.postalCode },
        { name: "phoneNumber", placeholder: content.fields.phoneNumber }
      ]}
      onSubmit={async (data) => {
        const res = await registerAction(data)
        localStorage.setItem("token", res.token)
      }}
    />
  )
}