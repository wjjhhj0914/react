import { createContext, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { LearnSection } from '@/components';
import RandomCountUp from './components/random-count-up';

type ThemeContextValue = 'light' | 'dark';

const defaultThemeValue: ThemeContextValue = 'light';

const themeConfig = {
  dark: {
    backgroundColor: 'darkblue',
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: 'darkgray',
  },
};

const ThemeContext = createContext<ThemeContextValue>(defaultThemeValue);
ThemeContext.displayName = 'ThemeContext';

// --------------------------------------------------------------------------

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

  const [themeMode, setThemeMode] = useState<ThemeContextValue>('light');

  const isDarkMode = themeMode.includes('dark');

  return (
    // 2. 컨텍스트 공급(제공, provider)하기
    <ThemeContext.Provider value={themeMode}>
      <GlobalStateContext.Provider value={{ mood, currentYear }}>
        <button
          type="button"
          className="button m-4"
          aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          onClick={() => {
            setThemeMode(tm => (tm.includes('light') ? 'dark' : 'light'));
          }}
        >
          {isDarkMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
        </button>
        <LearnSection
          title="리액트 컨텍스트를 사용해 데이터 공유"
          showTitle
          className="text-indigo-600"
        >
          <div className="scale-80 flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600">
            <h2 className="text-inherit">App</h2>
            <GrandParent />
          </div>
        </LearnSection>
      </GlobalStateContext.Provider>
    </ThemeContext.Provider>
  );
}

function GrandParent() {
  return (
    <div className="flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600">
      <h2 className="text-inherit">Grand Parent</h2>
      <Parent />
    </div>
  );
}

function Parent() {
  return (
    <ThemeContext.Consumer>
      {themeContextValue => {
        const currentTheme = themeConfig[themeContextValue];

        return (
          <div
            style={currentTheme}
            className="flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600"
          >
            <h2 className="text-inherit">Parent</h2>
            <Child />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

function Child() {
  return (
    <div className="flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600">
      <h2 className="text-inherit">Child</h2>
      <GrandChild />
    </div>
  );
}

function GrandChild() {
  return (
    <ThemeContext.Consumer>
      {themeContextValue => {
        const currentTheme = themeConfig[themeContextValue];

        return (
          <div
            style={currentTheme}
            className="flex gap-10 justify-center items-center p-20 border-8 border-indigo-600 text-indigo-600"
          >
            <h2 className="text-inherit">Grand Child</h2>
            {/* <RandomCountUp /> */}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}
