'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { Section } from '@/components'
import { tw } from '@/utils'
import { fetchQuoteById, type Quote, type QuoteError } from '../api'

export default function QuoteSinglePage() {
  const { quoteId } = useParams<{ quoteId: string }>()

  const [quoteResponse, setQuoateResponse] = useState<
    null | Quote | QuoteError
  >(null)

  useEffect(() => {
    fetchQuoteById(quoteId).then((data) => {
      setQuoateResponse(data)
    })
  }, [quoteId])

  if (!quoteResponse) return null

  if ('message ' in quoteResponse) {
    return notFound()
  } else {
    return (
      <Section title="인용 구절">
        <blockquote
          className={tw`
          flex flex-col gap-y-4 
          p-5 border-5 border-slate-200 text-slate-700
        `}
        >
          <p>{quoteResponse.quote}</p>
          <cite>{quoteResponse.author}</cite>
        </blockquote>
      </Section>
    )
  }
}
