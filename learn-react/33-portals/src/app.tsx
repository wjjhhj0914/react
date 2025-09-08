import { ReactNode } from 'react'
import { WandSparkles, WarehouseIcon } from 'lucide-react'
import { AlertPortal, LearnSection } from '@/components'
import RandomCountUp from '@/demo'
import { useToggleState } from './hooks'

export default function App() {
  return (
    <LearnSection
      title="리액트의 포털(차원 이동)"
      className="flex flex-col gap-6 p-10 mt-10"
    >
      <Article>
        <p className="flex gap-2">
          <WarehouseIcon /> 컴포넌트 A
        </p>
      </Article>
      <Article>
        <AlertPortal message="using-portal">
          <p
            role="alert"
            className="fixed top-0 left-0 right-0 bg-indigo-900 text-white p-4 flex gap-2"
          >
            <WandSparkles /> 컴포넌트 B
          </p>
        </AlertPortal>
      </Article>
    </LearnSection>
  )
}

function Article({ children }: { children: ReactNode }) {
  const [isToggle, { toggle }] = useToggleState(false)

  return (
    <article className="bg-yellow-200 transform-3d p-5">
      <h2 className="text-2xl font-semibold mb-2">일반적인 컴포넌트 렌더링</h2>
      <button type="button" className="button" onClick={toggle}>
        {isToggle ? '감춤' : '표시'}
      </button>
      {isToggle && children}
    </article>
  )
}
