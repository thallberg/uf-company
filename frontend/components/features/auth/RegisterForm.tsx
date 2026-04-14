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
import { authContent } from "@/content/auth/AuthContent"

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
      form.setFieldValue("email", "")
      form.setFieldValue("password", "")
      form.setFieldValue("fullName", "")
      form.setFieldValue("address", "")
      form.setFieldValue("city", "")
      form.setFieldValue("postalCode", "")
      form.setFieldValue("phoneNumber", "")
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
      setMessage("Registreringen misslyckades. Kontrollera uppgifterna och försök igen.")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
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
                    autoComplete="new-password"
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

          <form.Field name="fullName">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.fullName}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    autoComplete="name"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.fullName}
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

          <form.Field name="address">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.address}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    autoComplete="street-address"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.address}
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

          <form.Field name="city">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.city}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    autoComplete="address-level2"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.city}
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

          <form.Field name="postalCode">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.postalCode}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    autoComplete="postal-code"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.postalCode}
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

          <form.Field name="phoneNumber">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor={field.name}>
                    {content.fields.phoneNumber}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    autoComplete="tel"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.fields.phoneNumber}
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
        <Button type="submit" form="register-form" className="w-full sm:w-auto">
          {content.submit}
        </Button>
      </CardFooter>
    </Card>
  )
}

