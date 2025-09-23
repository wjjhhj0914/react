import Script from 'next/script'
import JqueryButton from './jquery-button'

export default function usingJqueryPage() {
  return (
    <section id="load-external-script" className="p-10">
      <Script
        // strategy="beforeInteractive"
        src="https://code.jquery.com/jquery-3.7.1.slim.min.js"
      />
      <h1 className="mb-5">외부 스크립트 로드</h1>
      <JqueryButton />
    </section>
  )
}
