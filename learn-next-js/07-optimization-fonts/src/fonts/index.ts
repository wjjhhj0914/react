import { Noto_Sans_KR, Gothic_A1 } from 'next/font/google'

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--noto-sans-kr',
})

export const gothicA1 = Gothic_A1({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--gothic-a1',
})

const fonts = {
  notoSansKR,
  gothicA1,
}

export default fonts
