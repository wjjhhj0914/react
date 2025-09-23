import { Link, Section } from '@/components'
import { fetchAllPosts, fetchUserById } from './api'

export default async function PostListPage() {
  const { posts } = await fetchAllPosts()
  const usersPromise = posts.map(({ userId }) => fetchUserById(userId))
  const users = await Promise.all(usersPromise)

  return (
    <Section title="포스트 리스트">
      <p>포스트 리스트 렌더링</p>
      <ul className="flex flex-col gap-y-5 my-10">
        {posts.map(({ id, userId, title, reactions: { likes, dislikes } }) => {
          const { username } = users.find((user) => user.id === userId)
          return (
            <li key={id}>
              <Link
                className="flex flex-col text-blue-500 hover:text-blue-800"
                href={`/posts/${id}`}
              >
                {title}{' '}
                <div className="flex justify-between">
                  <span className="text-slate-900">작성자: {username}</span>
                  <span className="text-slate-700 flex items-center gap-2">
                    👍{likes}{' '}
                    <span className="text-slate-400 text-xs"> | </span> 👎
                    {dislikes}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
