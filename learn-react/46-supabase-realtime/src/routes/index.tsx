import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { tw } from '@/utils'

function Page() {
  useEffect(() => {
    console.log('effect')
    const body = document.body
    body.style.setProperty('background-color', '#000')

    return () => {
      body.style.removeProperty('background-color')
    }
  }, [])

  return (
    <>
      <title>리액트 배우기</title>
      <section
        lang="en"
        className={tw`
        flex justify-center items-center
        h-[calc(100vh_-_150px)]
      `}
      >
        <h1
          lang="en"
          className={tw`
          text-8xl text-transparent uppercase font-black 
          bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400
        `}
        >
          Learning React
        </h1>
      </section>
    </>
  )
}

export const Route = createFileRoute('/')({
  component: Page,
})
