"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { CircleCheckIcon, XIcon, ArrowRightCircle } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Ogiltig e-post")
    .min(1, "E-post krävs"),

  // 🔥 ALL validation här
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

      {/* EMAIL */}
      <form.Field name="email">
        {(field) => {
          const error = field.state.meta.errors[0]

          return (
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={content.placeholder}
                  className="w-full pr-12 h-12"
                />

                <Button
                  type="submit"
                  size="icon"
                  variant="outline"
                  className="absolute right-1 top-1/2 -translate-y-1/2 border-none text-brand-blue hover:text-brand-blue"
                >
                  <ArrowRightCircle className="size-8" />
                </Button>
              </div>

              {/* 🔥 EMAIL ERROR */}
              {error && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <XIcon className="size-4" />
                  {typeof error === "string"
                    ? error
                    : (error as any)?.message ?? "Ogiltigt värde"}
                </p>
              )}

              {/* ✅ SUCCESS */}
              {!error && status === "success" && (
                <p className="text-sm text-brand-green flex items-center gap-2">
                  <CircleCheckIcon className="size-4" />
                  {message}
                </p>
              )}
            </div>
          )
        }}
      </form.Field>

      {/* CHECKBOX */}
      <form.Field name="consent">
        {(field) => {
          const error = field.state.meta.errors[0]

          return (
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(!!checked)
                  }
                  className="mt-1"
                />

                <span className="text-sm text-muted-foreground leading-relaxed">
                  Ja tack, jag vill få nyheter och marknadsföring från UF Company via e-post om produkter, erbjudanden, evenemang och tävlingar.
                </span>
              </label>

              {/* 🔥 CONSENT ERROR */}
              {error && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <XIcon className="size-4" />
                  {typeof error === "string"
                    ? error
                    : (error as any)?.message ?? "Ogiltigt värde"}
                </p>
              )}
            </div>
          )
        }}
      </form.Field>

    </form>
  )
}