"use client"

import { Input } from "@/components/ui/input"
import { XIcon } from "lucide-react"

type Props = {
  field: any
  placeholder: string
  type?: string
}

export function FormField({ field, placeholder, type = "text" }: Props) {
  const isInvalid =
    field.state.meta.isTouched && !field.state.meta.isValid

  const error = field.state.meta.errors[0]

  const formatError = (err: unknown) => {
    if (typeof err === "string") return err
    if (typeof err === "object" && err !== null) {
      const msg = (err as { message?: unknown }).message
      if (typeof msg === "string") return msg
    }
    return String(err)
  }

  return (
    <div className="space-y-2">
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        aria-invalid={isInvalid}
      />

      {isInvalid && error && (
        <p className="text-sm text-destructive flex items-center gap-2">
          <XIcon className="h-4 w-4" />
          {formatError(error)}
        </p>
      )}
    </div>
  )
}