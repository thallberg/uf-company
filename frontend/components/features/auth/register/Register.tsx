"use client";

import { CircleCheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useLoginForm } from "@/hooks/use.loginForm";
import { fieldRegister } from "@/content/fields-content/Fields.content";

export function RegisterFormClient({ content }: any) {
 const { form, status, message } = useLoginForm();

  return (
    <>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="email">
            {(field) => (
              <FormField
                field={field}
                type="email"
                placeholder={content.fields.email}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <FormField
                field={field}
                type="password"
                placeholder={content.fields.password}
              />
            )}
          </form.Field>

          {fieldRegister.map((name) => (
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
          <p
            className={`text-sm flex items-center gap-2 ${
              status === "success" ? "text-brand-green" : "text-destructive"
            }`}
          >
            {status === "success" ? (
              <CircleCheckIcon className="h-4 w-4" />
            ) : (
              <XIcon className="h-4 w-4" />
            )}
            {message}
          </p>
        )}

        <Button aria-label="Registrera användare" type="submit" form="register-form" className="w-full">
          {content.submit}
        </Button>
      </CardFooter>
    </>
  );
}
