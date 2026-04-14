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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { newsLetterContent } from "@/content/news-letter/NewsLetter.content"

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email(newsLetterContent.validation.emailInvalid)
    .min(1, newsLetterContent.validation.emailRequired),
})

const content = newsLetterContent

export function NewsLetter() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const form = useForm({
    defaultValues: { email: "" },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setStatus("success")
      setMessage(content.successMessage)
      form.setFieldValue("email", "")
    },
  })

  const handleSubmit = async (
    event: Parameters<NonNullable<JSX.IntrinsicElements["form"]["onSubmit"]>>[0]
  ) => {
    event.preventDefault()
    setStatus("idle")
    setMessage("")
    await form.handleSubmit()
  }

  return (
   
      <Card className="overflow-hidden bg-background shadow-sm">
        <CardHeader className="space-y-2 px-6 pb-2 pt-6 sm:px-8">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {content.title}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm text-muted-foreground">
            {content.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-0 sm:px-8">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor="newsletter-email">
                    {content.label}
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={content.placeholder}
                    className="w-full"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="inline-flex items-center gap-2 text-sm text-destructive">
                      <XIcon className="size-4" />
                      {typeof field.state.meta.errors[0] === "string"
                        ? field.state.meta.errors[0]
                        : field.state.meta.errors[0]?.message ?? String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <Button type="submit" variant="blue" size="lg">
              {content.submit}
            </Button>
          </form>

          {status !== "idle" && (
            <p
              className={`mt-4 inline-flex items-center gap-2 text-sm ${
                status === "success" ? "text-brand-green" : "text-destructive"
              }`}
            >
              {status === "success" ? (
                <CircleCheckIcon className="size-4" />
              ) : (
                <XIcon className="size-4" />
              )}
              {message}
            </p>
          )}
        </CardContent>

        <CardFooter className="px-6 pt-4 pb-6 sm:px-8">
          <p className="text-xs text-muted-foreground">
            {content.footer}
          </p>
        </CardFooter>
      </Card>
  
  )
}
