import { ITEMS } from './constants'

export function getData(cutoff: number): Promise<typeof ITEMS> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cutoff > 10 || cutoff < 1) {
        return reject(new Error('cutoff 값이 10보다 크거나, 1보다 작습니다.'))
      }
      resolve(ITEMS.filter((item) => item > cutoff))
    }, 1000)
  })
}
