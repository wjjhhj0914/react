import { wait } from '@/utils'
import type {
  Post,
  PostCommentsResponse,
  PostListResponse,
  TagPostsResponse,
  User,
  UsersPostsResponse,
} from './types'

export const fetchAllPosts = async (): Promise<PostListResponse> => {
  await wait(0.45)
  const response = await fetch('https://dummyjson.com/posts')
  return response.json()
}

export const fetchSinglePostById = async (
  postId: number | string
): Promise<Post> => {
  await wait(0.45)
  const response = await fetch(`https://dummyjson.com/posts/${postId}`)
  return response.json()
}

export const fetchUserById = async (userId: number | string): Promise<User> => {
  await wait(0.45)
  // throw new Error('사용자 정보를 가져올 수 없습니다. ⚠️')
  const response = await fetch(`https://dummyjson.com/users/${userId}`)
  return response.json()
}

export const fetchCommentsByPostId = async (
  postId: number | string
): Promise<PostCommentsResponse> => {
  await wait(0.45)
  const response = await fetch(`https://dummyjson.com/posts/${postId}/comments`)
  return response.json()
}

export const fetchAllPostsByUserId = async (
  userId: number | string
): Promise<UsersPostsResponse> => {
  await wait(0.45)
  const response = await fetch(`https://dummyjson.com/posts/user/${userId}`)
  return response.json()
}

export const fetchAllPostByTag = async (
  tag: string
): Promise<TagPostsResponse> => {
  await wait(0.45)
  const response = await fetch(`https://dummyjson.com/posts/tag/${tag}`)
  return response.json()
}
