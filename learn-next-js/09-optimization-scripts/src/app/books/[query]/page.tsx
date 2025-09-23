import type { Metadata } from 'next'
import { Section } from '@/components'
// import { wait } from '@/utils'
import fetchBooks from '../api'
import Books from '../components/books'

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { query } = await params
  const decodedQuery = decodeURIComponent(query)

  return {
    title: `${decodedQuery} 검색 결과`,
  }
}

export default async function BooksQueryResultPage({ params }: Props) {
  const { query } = await params
  const decodedQuery = decodeURIComponent(query)
  // await wait(0.45)
  const booksData = await fetchBooks({ query: decodedQuery })

  const title = (
    <>
      <strong>{decodedQuery}</strong>
      검색 결과
    </>
  )

  return (
    <Section title={title}>
      <Books items={booksData.documents} />
    </Section>
  )
}

interface Props {
  params: Promise<{ query: string }>
}