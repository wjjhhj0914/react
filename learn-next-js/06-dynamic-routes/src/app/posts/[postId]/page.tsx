import { LucideHeart } from 'lucide-react'
import { Link, Section } from '@/components'
import { tw } from '@/utils'
import {
  fetchCommentsByPostId,
  fetchSinglePostById,
  fetchUserById,
} from '../api'

export default async function PostDetailPage({ params }: Props) {
  const { postId } = await params
  const post = await fetchSinglePostById(postId)
  const { username, email } = await fetchUserById(post.userId)
  const { comments } = await fetchCommentsByPostId(postId)

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
      <article
        data-comments
        className={tw`
          flex flex-col gap-3
          my-1 rounded-lg
          border-4 border-slate-300/80 w-full p-4 text-slate-800  
        `}
      >
        <h3 className="text-xl font-medium text-slate-800">댓글 목록</h3>
        {comments.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className={tw`
                relative
                rounded-lg
                bg-slate-200/50 w-full py-3 px-4 text-slate-800  
              `}
              >
                <Link
                  href={`/posts/user/${comment.user.id}`}
                  className="text-md font-medium text-blue-700/70 hover:text-blue-900"
                >
                  {comment.user.username}
                </Link>
                <p className="text-sm">{comment.body}</p>
                <button
                  type="button"
                  aria-label={`좋아요 (현재 좋아요 갯수: ${comment.likes}개)`}
                  className={tw`
                  cursor-pointer 
                  absolute top-1/2 -translate-y-1/2 right-4
                  text-rose-600 hover:text-rose-800
                `}
                >
                  <span
                    className={tw`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    font-black
                    text-xs
                    text-white
                  `}
                  >
                    {comment.likes}
                  </span>
                  <LucideHeart strokeWidth={0} size={36} fill="currentColor" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-slate-700">댓글이 없어요! 🥲</div>
        )}
      </article>
    </Section>
  )
}

interface Props {
  params: Promise<{ postId: string }>
}
