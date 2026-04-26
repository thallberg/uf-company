"use client";

import { CircleCheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { CardContent } from "@/components/ui/card";
import { useLoginForm } from "@/hooks/use.loginForm";

export function LoginFormClient({ content }: any) {
  const { form, status, message } = useLoginForm();

  return (
    <>
      <CardContent className="flex flex-col flex-1 justify-between">
        {/* TOP */}
        <div className="space-y-4">
          <form
            id="login-form"
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
          </form>

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
        </div>

        {/* BOTTOM */}
        <Button
        aria-label="Logga in"
          variant="green"
          type="submit"
          form="login-form"
          className="w-full mt-6"
        >
          {content.submit}
        </Button>
      </CardContent>
    </>
  );
}
