"use client";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

type Props = {
  field: any;
  label?: string;
  placeholder?: string;
  type?: string;
};

export function FormField({
  field,
  label,
  placeholder,
  type = "text",
}: Props) {
  const isInvalid =
    field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <FieldContent>
        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
        />

        <FieldError errors={field.state.meta.errors} />
      </FieldContent>
    </Field>
  );
}