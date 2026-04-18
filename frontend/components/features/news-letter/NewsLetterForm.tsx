"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { ConsentField, EmailField } from "./fields"

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Ogiltig e-post")
    .min(1, "E-post krävs"),

  consent: z.boolean().refine((v) => v === true, {
    message: "Du måste godkänna för att fortsätta",
  }),
})

type Props = {
  content: {
    placeholder: string
    successMessage: string
  }
}

export function NewsLetterForm({ content }: Props) {
  const [status, setStatus] = useState<"idle" | "success">("idle")
  const [message, setMessage] = useState("")

  const form = useForm({
    defaultValues: { email: "", consent: false },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async () => {
      setStatus("success")
      setMessage(content.successMessage)
      form.setFieldValue("email", "")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setStatus("idle")
        setMessage("")
        form.handleSubmit()
      }}
      className="w-full md:max-w-md space-y-4"
    >
      {/* 📧 EMAIL */}
      <form.Field name="email">
        {(field) => {
          const error = field.state.meta.errors[0]

          return (
            <EmailField
              field={field}
              placeholder={content.placeholder}
              error={error}
              status={status}
              message={message}
            />
          )
        }}
      </form.Field>

      {/* ✅ CONSENT */}
      <form.Field name="consent">
        {(field) => {
          const error = field.state.meta.errors[0]

          return (
            <ConsentField
              field={field}
              error={error}
            />
          )
        }}
      </form.Field>
    </form>
  )
}