import type {
  Post,
  PostCommentsResponse,
  PostListResponse,
  User,
} from './types'

export const fetchAllPosts = async (): Promise<PostListResponse> => {
  const response = await fetch('https://dummyjson.com/posts')
  return response.json()
}

export const fetchSinglePostById = async (
  postId: number | string
): Promise<Post> => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`)
  return response.json()
}

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`)
  return response.json()
}

export const fetchCommentsByPostId = async (
  postId: number | string
): Promise<PostCommentsResponse> => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}/comments`)
  return response.json()
}
