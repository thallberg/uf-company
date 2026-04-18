import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowRightCircle, CircleCheckIcon, XIcon } from "lucide-react";

export function EmailField({
  field,
  placeholder,
  error,
  status,
  message,
}: any) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type="email"
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          className="w-full pr-12 h-12"
        />

        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="absolute right-1 top-1/2 -translate-y-1/2 border-none text-brand-white hover:text-brand-white"
        >
          <ArrowRightCircle className="size-8" />
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-sm text-destructive flex items-center gap-2">
          <XIcon className="size-4" />
          {typeof error === "string"
            ? error
            : (error as any)?.message ?? "Ogiltigt värde"}
        </p>
      )}

      {/* SUCCESS */}
      {!error && status === "success" && (
        <p className="text-sm text-green-900 flex items-center gap-2">
          <CircleCheckIcon className="size-4" />
          {message}
        </p>
      )}
    </div>
  )
}

export function ConsentField({ field, error }: any) {
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
          Ja tack, jag vill få nyheter och marknadsföring...
        </span>
      </label>

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
}