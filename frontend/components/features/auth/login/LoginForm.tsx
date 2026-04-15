import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { authContent } from "@/content/auth/Auth.content"
import { LoginFormClient } from "./Login"


export function LoginForm() {
  const content = authContent.login

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <LoginFormClient content={content} />
    </Card>
  )
}