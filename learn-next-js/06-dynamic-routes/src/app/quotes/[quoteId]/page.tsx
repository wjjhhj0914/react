import { notFound } from 'next/navigation'
import { Section } from '@/components'
import { tw } from '@/utils'
import { fetchQuoteById } from '../api'
import ShowParamsButton from './show-params-button'

export default async function QuoteSinglePage({ params }: Props) {
  const { quoteId } = await params
  const quoteResponse = await fetchQuoteById(quoteId)

  if ('message' in quoteResponse) notFound()

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
      <ShowParamsButton />
    </Section>
  )
}

interface Props {
  params: Promise<{ quoteId: string }>
}
