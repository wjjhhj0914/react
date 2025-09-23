import { Link, Section } from '@/components'
import { fetchAllPostsByUserId, fetchUserById } from '../../api'

export default async function UsersPostsPage({ params }: Props) {
  const { userId } = await params
  const user = await fetchUserById(userId)
  const { posts } = await fetchAllPostsByUserId(userId)

  return (
    <Section title={`${user.username}의 포스트 목록`}>
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
  params: Promise<{ userId: string }>
}
