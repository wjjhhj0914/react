import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import RandomCountUp from './random-count-up'
import './styles/main.css'

const root = document.getElementById('root')
if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.')

hydrateRoot(
  root,
  <StrictMode>
    <RandomCountUp />
  </StrictMode>
)
