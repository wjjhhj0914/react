'use client'

import Script from 'next/script'

export default function JqueryButton() {
  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" />
      <button type="button"> </button>
    </>
  )
}
