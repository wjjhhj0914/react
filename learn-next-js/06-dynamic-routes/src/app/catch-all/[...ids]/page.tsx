import { Link, Section } from '@/components'

export default async function CatchAllSegmentsPage({ params }: Props) {
  const { ids } = await params
  console.log({ ids })

  // /shop
  // /shop/clothes
  // /shop/clothes/tops
  // /shop/clothes/tops/t-shirts

  return (
    <Section title="Catch-all 세그먼트">
      <p>모든 라우트를 포착하는 페이지입니다.</p>
      <output className="bg-slate-200/80 py-1.5 px-3.5 rounded">
        {ids.join(' / ')}
      </output>

      <Link href="/catch-all" className="text-blue-600 hover:text-blue-800">
        아무런 세그먼트가 없는 경우
      </Link>
    </Section>
  )
}

interface Props {
  params: Promise<{ ids: string[] }>
}
