import type { Post, PostListResponse, User } from './types'

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
