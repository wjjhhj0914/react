import { useState } from 'react'
import { LearnSection } from '@/components'

export default function App() {
  return (
    <LearnSection title="랜덤 카운트 업" className="p-10">
      <MemoizedDemo />
    </LearnSection>
  )
}

// --------------------------------------------------------------------------

const highCostList = Array(5e7)
  .fill(null)
  .map((_, i) => ({ key: i + 1 }))

function MemoizedDemo() {
  const [divideValue, setDivideValue] = useState<number>(1)

  console.time('리스트 필터링')
  const filteredHighCostList = highCostList.filter(({ key }) => {
    return key % divideValue === 0
  })
  console.timeEnd('리스트 필터링')

  const [isDark, setIsDark] = useState(true)

  const theme = isDark
    ? {
        backgroundColor: '#000',
        color: '#fff',
      }
    : {
        backgroundColor: '#fff',
        color: '#000',
      }

  return (
    <>
      <button
        type="button"
        className="cursor-pointer bg-blue-700 text-white p-2 rounded fixed right-3 top-3 z-50 text-xs"
        onClick={() => setIsDark((d) => !d)}
      >
        테마 스위치
      </button>

      <div className="p-5" style={theme}>
        <h2 className="text-xl font-semibold mb-6">메모이제이션 훅</h2>

        <div role="group">
          <label htmlFor="divide-value">나머지 수</label>
          <input
            type="number"
            id="divide-value"
            className="border p-2 w-[3rem]"
            value={divideValue}
            onChange={(e) => setDivideValue(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <output>
            리스트 총 갯수: {highCostList.length.toLocaleString()}
          </output>
          <output>
            필터링된 리스트의 갯수:{' '}
            {filteredHighCostList.length.toLocaleString()}
          </output>
        </div>
      </div>
    </>
  )
}
