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
import { loginAction } from "@/api/Auth.api"
import { authContent } from "@/content/auth/Auth.content"

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Ange en giltig e-postadress.")
    .min(1, "Skriv in din e-postadress."),
  password: z
    .string()
    .min(8, "Lösenordet måste vara minst 8 tecken."),
})

type LoginValues = z.infer<typeof loginSchema>

const formatFieldError = (error: unknown) => {
  if (typeof error === "string") return error
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string") return message
  }

  return String(error)
}

export function LoginForm() {
  const content = authContent.login
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }: { value: LoginValues }) => {
      const res = await loginAction(value)
      localStorage.setItem("token", res.token)
      setStatus("success")
      setMessage("Inloggning lyckades.")
    },
    onSubmitInvalid: () => {
      setStatus("error")
      setMessage("Fyll i alla fält korrekt.")
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
      setMessage("Inloggning misslyckades. Kontrollera dina uppgifter.")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
          <form.Field name="email">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.email}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.email}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (
                    <p className="inline-flex items-center gap-2 text-sm text-destructive">
                      <XIcon className="h-4 w-4" />
                      {formatFieldError(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.password}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="current-password"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.password}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (
                    <p className="inline-flex items-center gap-2 text-sm text-destructive">
                      <XIcon className="h-4 w-4" />
                      {formatFieldError(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {status !== "idle" && (
          <p className={`inline-flex items-center gap-2 text-sm ${status === "success" ? "text-brand-green" : "text-destructive"}`}>
            {status === "success" ? <CircleCheckIcon className="h-4 w-4" /> : <XIcon className="h-4 w-4" />}
            {message}
          </p>
        )}
        <Button type="submit" form="login-form" className="w-full sm:w-auto">
          {content.submit}
        </Button>
      </CardFooter>
    </Card>
  )
}

