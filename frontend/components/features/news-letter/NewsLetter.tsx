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
    <Card className="overflow-hidden bg-brand-green/70 rounded-none">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12 md:grid md:grid-cols-2 md:gap-8">

        {/* LEFT (SERVER) */}
        <CardHeader className="py-6 gap-0">
          <CardTitle className="text-2xl font-semibold tracking-tight text-brand-white">
            {content.title}
          </CardTitle>
          <CardDescription className="max-w-md text-sm text-brand-white">
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