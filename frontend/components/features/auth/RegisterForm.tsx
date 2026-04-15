"use client"

import { JSX, useState } from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { CircleCheckIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { registerAction } from "@/api/Auth.api"
import { authContent } from "@/content/auth/Auth.content"

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Ange en giltig e-postadress.")
    .min(1, "Skriv in din e-postadress."),
  password: z
    .string()
    .min(8, "Lösenordet måste vara minst 8 tecken."),
  fullName: z.string().trim().min(1, "Skriv in ditt fullständiga namn."),
  address: z.string().trim().min(1, "Skriv in din adress."),
  city: z.string().trim().min(1, "Skriv in din stad."),
  postalCode: z.string().trim().min(1, "Skriv in ditt postnummer."),
  phoneNumber: z.string().trim().min(1, "Skriv in ditt telefonnummer."),
})

type RegisterValues = z.infer<typeof registerSchema>

// 🔥 FIX: strikt typade keys
const fieldNames: (keyof RegisterValues)[] = [
  "fullName",
  "address",
  "city",
  "postalCode",
  "phoneNumber",
]

const formatFieldError = (error: unknown) => {
  if (typeof error === "string") return error
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string") return message
  }
  return String(error)
}

export function RegisterForm() {
  const content = authContent.register
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }: { value: RegisterValues }) => {
      const res = await registerAction(value)
      localStorage.setItem("token", res.token)

      setStatus("success")
      setMessage("Kontot skapades. Du är nu inloggad.")

      form.reset()
    },
  })

  const handleSubmit = async (
    event: Parameters<NonNullable<JSX.IntrinsicElements["form"]["onSubmit"]>>[0]
  ) => {
    event.preventDefault()
    setStatus("idle")
    setMessage("")

    try {
      await form.handleSubmit()
    } catch {
      setStatus("error")
      setMessage(
        "Registreringen misslyckades. Kontrollera uppgifterna och försök igen."
      )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="register-form" onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.email}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <XIcon className="h-4 w-4" />
                      {formatFieldError(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          {/* PASSWORD */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="new-password"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.password}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <XIcon className="h-4 w-4" />
                      {formatFieldError(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          {/* 🔥 REUSE FIELDS (FIXED) */}
          {fieldNames.map((name) => (
            <form.Field key={name} name={name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <div className="space-y-2">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder={content.fields[name]}
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <p className="text-sm text-destructive flex items-center gap-2">
                        <XIcon className="h-4 w-4" />
                        {formatFieldError(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )
              }}
            </form.Field>
          ))}
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-none bg-card">

        {/* SUCCESS / SERVER ERROR */}
        {status !== "idle" && (
          <p
            className={`inline-flex items-center gap-2 text-sm ${
              status === "success" ? "text-brand-green" : "text-destructive"
            }`}
          >
            {status === "success" ? (
              <CircleCheckIcon className="h-4 w-4" />
            ) : (
              <XIcon className="h-4 w-4" />
            )}
            {message}
          </p>
        )}

        <Button type="submit" form="register-form" className="w-full">
          {content.submit}
        </Button>
      </CardFooter>
    </Card>
  )
}