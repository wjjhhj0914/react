import type { PropsWithChildren } from 'react'

import '@/styles/main.css'
import GlobalNavigation from './global-navigation'

export default function RootLayout({ children }: PropsWithChildren) {
  // console.log('루트 레이아웃')

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
        <GlobalNavigation />
        <main className="flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  )
}
