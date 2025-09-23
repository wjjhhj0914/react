import { Link, Section } from '@/components'
import { fetchAllPostByTag } from '../../api'

export default async function TagPostsPage({ params }: Props) {
  const { tag } = await params
  const { posts } = await fetchAllPostByTag(tag)

  return (
    <Section title={`"${tag}" 태그의 포스트 목록`}>
      <ul className="flex flex-col gap-y-5 my-8">
        {posts.map((post) => (
          <li key={post.id} className="">
            <Link href={`/posts/${post.id}`} className="text-sky-600">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

interface Props {
  params: Promise<{ tag: string }>
}
