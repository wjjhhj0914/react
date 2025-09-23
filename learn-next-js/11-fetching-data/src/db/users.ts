import prisma from '@/libs/prisma'
// import { wait } from '@/utils'

export const getUsers = async () => {
  // await wait(1.1)
  return prisma.user.findMany()
}

export const getUser = async (userId: string | number) => {
  // await wait()
  return prisma.user.findUnique({ where: { id: Number(userId) } })
}
