import { createContext, useState } from 'react';
import { LearnSection } from '@/components';
import RandomCountUp from './components/random-count-up';

// 컨텍스트 값(value)의 타입 정의
interface GlobalStateValue {
  mood: string;
  currentYear: number;
}

// 1. 컨텍스트 생성하기
export const GlobalStateContext = createContext<null | GlobalStateValue>(null);
// 컨텍스트 이름 지정하기
GlobalStateContext.displayName = 'GlobalStateContext';

export default function App() {
  const [mood] = useState('기분 많이 좋음');
  const [currentYear] = useState(new Date().getFullYear());

  return (
    // 2. 컨텍스트 공급(제공, provider)하기
    <GlobalStateContext.Provider value={{ mood, currentYear }}>
      <LearnSection title="리액트 컨텍스트를 사용해 데이터 공유">
        <GrandParent />
      </LearnSection>
    </GlobalStateContext.Provider>
  );
}

function GrandParent() {
  return (
    <>
      <Parent />
    </>
  );
}

function Parent() {
  return (
    <>
      <Child />
    </>
  );
}

function Child() {
  return (
    <>
      <GrandChild />
    </>
  );
}

function GrandChild() {
  return (
    <>
      <RandomCountUp />
    </>
  );
}
