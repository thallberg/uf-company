import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { newsLetterContent } from "@/content/news-letter/NewsLetter.content"
import { NewsLetterForm } from "./NewsLetterForm"


export function NewsLetter() {
  const content = newsLetterContent

  return (
    <Card className="overflow-hidden bg-brand-blue/30 rounded-none">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12 md:grid md:grid-cols-2 md:items-center md:gap-8">

        {/* LEFT (SERVER) */}
        <CardHeader className="space-y-2 py-6">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {content.title}
          </CardTitle>
          <CardDescription className="max-w-md text-sm text-muted-foreground">
            {content.description}
          </CardDescription>
        </CardHeader>

        {/* RIGHT (CLIENT FORM) */}
        <CardContent className="py-6 md:flex md:justify-end">
          <NewsLetterForm content={content} />
        </CardContent>

      </div>
    </Card>
  )
}