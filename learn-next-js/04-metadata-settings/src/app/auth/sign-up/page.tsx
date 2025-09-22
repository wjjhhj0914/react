import type { Metadata } from 'next'
import { Section } from '@/components'

// 동적 메타데이터 생성 함수
// export const generateMetadata = (): Metadata => {
//   return {
//     title: '회원가입 (동적 생성)',
//     description:
//       '회원 가입하면 OOO 이벤트에 참여할 수 있어 더 풍부한 학습이 가능해질거에요!',
//   }
// }

// 정적 메타데이터 선언 (빠름! 빠름! 빠름!)
export const metadata: Metadata = {
  title: '회원가입',
  description:
    '회원 가입하면 OOO 이벤트에 참여할 수 있어 더 풍부한 학습이 가능해질거에요!',
}

export default function SignUpPage() {
  return (
    <Section title="회원가입 페이지">
      <p>회원가입 페이지 방문</p>
    </Section>
  )
}
