import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { authContent } from "@/content/auth/Auth.content"
import { RegisterFormClient } from "./Register"

export function RegisterForm() {
  const content = authContent.register

  return (
    <Card className="p-6 w-full h-full ring-0 rounded-none">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <RegisterFormClient content={content} />
    </Card>
  )
}