import { Link, Section } from '@/components'
import { fetchAllPosts, fetchUserById } from './api'

export default async function PostListPage() {
  const { posts } = await fetchAllPosts()
  const usersPromise = posts.map(({ userId }) => fetchUserById(userId))
  const users = await Promise.all(usersPromise)

  return (
    <Section title="포스트 리스트">
      <p>포스트 리스트 렌더링</p>
      <ul lang="en" className="flex flex-col gap-y-5 my-10 w-full lg:w-xl">
        {posts.map(({ id, userId, title, reactions: { likes, dislikes } }) => {
          const { username } = users.find((user) => user.id === userId)

          return (
            <li
              key={id}
              className="border-3 border-slate-200 rounded-md bg-white shadow-sm"
            >
              <Link
                className="flex flex-col text-blue-700/70 hover:text-blue-900 p-5"
                href={`/posts/${id}`}
              >
                <strong className="w-3/4 truncate" title={title}>
                  {title}
                </strong>
                <div className="flex justify-between">
                  <span className="text-slate-700">작성자: {username}</span>
                  <span className="text-slate-500/80 flex items-center gap-2">
                    👍 {likes}{' '}
                    <span className="text-slate-400 text-xs"> | </span> 👎{' '}
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
