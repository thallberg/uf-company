"use client"

import { JSX, useState } from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { CircleCheckIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { CardContent, CardFooter } from "@/components/ui/card"

import { registerAction } from "@/api/Auth.api"

const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  phoneNumber: z.string().min(1),
})

const fieldNames = [
  "fullName",
  "address",
  "city",
  "postalCode",
  "phoneNumber",
] as const

export function RegisterFormClient({ content }: any) {
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
    onSubmit: async ({ value }) => {
      const res = await registerAction(value)
      localStorage.setItem("token", res.token)

      setStatus("success")
      setMessage("Kontot skapades.")

      form.reset()
    },
  })

  return (
    <>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault()
            setStatus("idle")
            setMessage("")
            form.handleSubmit()
          }}
          className="space-y-4"
        >

          <form.Field name="email">
            {(field) => (
              <FormField field={field} type="email" placeholder={content.fields.email} />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <FormField field={field} type="password" placeholder={content.fields.password} />
            )}
          </form.Field>

          {fieldNames.map((name) => (
            <form.Field key={name} name={name}>
              {(field) => (
                <FormField field={field} placeholder={content.fields[name]} />
              )}
            </form.Field>
          ))}

        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-none bg-card">
        {status !== "idle" && (
          <p className={`text-sm flex items-center gap-2 ${status === "success" ? "text-brand-green" : "text-destructive"
            }`}>
            {status === "success"
              ? <CircleCheckIcon className="h-4 w-4" />
              : <XIcon className="h-4 w-4" />}
            {message}
          </p>
        )}

        <Button type="submit" form="register-form" className="w-full">
          {content.submit}
        </Button>
      </CardFooter>
    </>
  )
}