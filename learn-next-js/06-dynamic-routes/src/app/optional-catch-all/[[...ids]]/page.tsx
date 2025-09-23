import { Link, Section } from '@/components'

export default async function OptionalCatchAllSegmentsPage({ params }: Props) {
  const { ids } = await params
  console.log({ ids })

  // /shop ids: undefinded
  // /shop/clothes ids: ['clothes']
  // /shop/clothes/tops ids: ['clothes', 'tops']
  // /shop/clothes/tops/t-shirts ids: ['clothes', 'tops', 't-shirts']

  return (
    <Section title="옵셔널 Catch-all 세그먼트">
      <p>모든 라우트를 포착하는 페이지입니다.</p>
      <output className="bg-slate-200/80 py-1.5 px-3.5 rounded">
        {ids?.join(' / ') ?? 'ids 세그먼트는 존재하지 않습니다.'}
      </output>

      <Link
        href="/optional-catch-all/react/next/supabase"
        className="text-blue-600 hover:text-blue-800"
      >
        <q>/react/next/supabase</q> 세그먼트가 있는 경우
      </Link>
    </Section>
  )
}

interface Props {
  params: Promise<{ ids?: string[] }>
}
