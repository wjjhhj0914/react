import type { PostListResponse, User } from './types'

export const fetchAllPosts = async (): Promise<PostListResponse> => {
  const response = await fetch('https://dummyjson.com/posts')
  return response.json()
}

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`)
  return response.json()
}
