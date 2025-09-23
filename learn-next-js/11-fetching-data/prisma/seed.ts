import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      name: '정찬혁',
      email: 'jung.chanhyuk@email.com',
    },
    {
      name: '이수빈',
      email: 'subin.lee@email.com',
    },
    {
      name: '박준호',
      email: 'junho.park@email.com',
    },
    {
      name: '최유진',
      email: 'yujin.choi@email.com',
    },
  ]

  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
