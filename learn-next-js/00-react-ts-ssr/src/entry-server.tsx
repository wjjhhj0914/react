import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import RandomCountUp from './random-count-up'

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <RandomCountUp />
    </StrictMode>
  )
  return { html }
}
