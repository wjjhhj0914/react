import type {
  Post,
  PostCommentsResponse,
  PostListResponse,
  TagPostsResponse,
  User,
  UsersPostsResponse,
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

export const fetchUserById = async (userId: number | string): Promise<User> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`)
  return response.json()
}

export const fetchCommentsByPostId = async (
  postId: number | string
): Promise<PostCommentsResponse> => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}/comments`)
  return response.json()
}

export const fetchAllPostsByUserId = async (
  userId: number | string
): Promise<UsersPostsResponse> => {
  const response = await fetch(`https://dummyjson.com/posts/user/${userId}`)
  return response.json()
}

export const fetchAllPostByTag = async (
  tag: string
): Promise<TagPostsResponse> => {
  const response = await fetch(`https://dummyjson.com/posts/tag/${tag}`)
  return response.json()
}
