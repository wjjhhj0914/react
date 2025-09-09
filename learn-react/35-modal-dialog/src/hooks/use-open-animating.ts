import { useEffect, useRef, useState } from 'react'

export default function useOpenAnimating(
  open: boolean,
  // 애니메이션 지속시간 설정
  duration: 250
) {
  // useOpenAnimating 훅 제작
  // 먼저 컴포넌트 내에서 로직 작성

  // 컴포넌트의 상태 (open에 의해 파생된 상태)
  const [visible, setVisible] = useState<boolean>(open)

  // 애니메이션 진행/종료 상태
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  // 타임아웃 식별자(id) 기억하기 위한 타임아웃 ref 생성
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // 부수효과 (컴포넌트의 표시, 애니메이션 상태 제어)
  useEffect(() => {
    // 모달 다이얼로그가 열릴 때
    // 열림 상태 (중간 단계: 애니메이션 중...)
    // - 다이얼로그 표시 (보임 상태 true)
    // - 애니메이션 시작 (애니메이션 상태 true)
    // - 애니메이션이 종료되면 애니메이션 상태 false
    if (open) {
      // visible, isAnimating 상태가 모두 true로 설정되어야 함.
      setVisible(true)
      setIsAnimating(true)
      // 애니메이션 지속시간이 지나면, 애니메이션 종료 상태로 변경
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
      }, duration)
    }
    // 모달 다이얼로그가 닫힐 때 (단, 다이얼로그가 화면에 표시되었다면)
    // 닫힘 상태 (중간 단계: 애니메이션 중...)
    // - 애니메이션 시작 (애니메이션 상태 true)
    // - 애니메이션이 종료되면 애니메이션 상태 false
    // - 다이얼로그 감춤 (보임 상태 false)
    else if (visible) {
      // 닫히기 전에 애니메이션 시작
      setIsAnimating(true)
      // 애니메이션 지속시간이 지나면, 감춤 & 애니메이션 종료 상태로 변경
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
        setIsAnimating(false)
      }, duration)
    }

    // 타임아웃 정리 (cleanup)
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [visible, open, duration])

  // 커스텀 훅이 반환하는 상태 값
  return {
    isAnimating,
    openFinished: visible && !isAnimating,
  }
}
