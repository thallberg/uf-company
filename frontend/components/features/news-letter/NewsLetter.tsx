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

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Ange en giltig e-postadress.")
    .min(1, "Skriv in din e-postadress."),
})

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
      setMessage("Tack! Du är nu anmäld till nyhetsbrevet.")
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
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="overflow-hidden bg-background shadow-sm">
        <CardHeader className="space-y-2 px-6 pb-2 pt-6 sm:px-8">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Nyhetsbrev
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm text-muted-foreground">
            Få de senaste uppdateringarna, erbjudandena och nyheterna direkt till din inkorg.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-0 sm:px-8">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <label className="sr-only" htmlFor="newsletter-email">
                    E-postadress
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    value={field.state.value ?? ""}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Din e-postadress"
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
              Prenumerera
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
            Vi delar aldrig din e-postadress och du kan avregistrera dig när som helst.
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
