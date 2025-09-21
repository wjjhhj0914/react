import type { PropsWithChildren } from 'react'
import '@/styles/main.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <head>
        <link
          as="font"
          rel="stylesheet"
          fetchPriority="high"
          crossOrigin="anonymous"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        />
      </head>
      <body className="overflow-y-scroll">
        <main className="flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  )
}
