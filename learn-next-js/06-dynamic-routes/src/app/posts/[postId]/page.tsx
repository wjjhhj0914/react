import { Link, Section } from '@/components'
import { tw } from '@/utils'
import { fetchSinglePostById, fetchUserById } from '../api'

export default async function PostDetailPage({ params }: Props) {
  const { postId } = await params
  const post = await fetchSinglePostById(postId)
  const { username, email } = await fetchUserById(post.userId)

  return (
    <Section title="포스트 아이템">
      <p>{postId}번째 포스트 상세 페이지 (작성자 정보 + 댓글 포함)</p>
      <article
        lang="en"
        className={tw`
          flex flex-col gap-3
          my-3 rounded-lg
          border-4 border-slate-300/80 w-full p-4 text-slate-800
        `}
      >
        <h3 className="-order-1 text-2xl font-medium uppercase text-slate-800/80">
          {post.title}
        </h3>
        <p className="text-slate-500 leading-loose">{post.body}</p>
        <div className="-order-1 flex justify-between">
          <span className="text-slate-700">
            <Link
              href={`/posts/user/${post.userId}`}
              className="font-semibold text-blue-700/70 hover:text-blue-900"
            >
              {username}
            </Link>{' '}
            |{' '}
            <a
              href={`mailto:${email}`}
              className="text-blue-700/70 hover:text-blue-900"
            >
              {email}
            </a>
          </span>
          <span className="text-slate-500/80 flex items-center gap-2">
            👍 {post.reactions.likes}{' '}
            <span className="text-slate-400 text-xs"> | </span> 👎{' '}
            {post.reactions.dislikes}
          </span>
        </div>
        <ul className="flex gap-x-2 mt-3">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/posts/tag/${tag}`}
                className="px-1.5 py-0.5 bg-slate-200/90 rounded text-xs"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </Section>
  )
}

interface Props {
  params: Promise<{ postId: string }>
}
