import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import '@/styles/main.css'
import App from './app'
import ErrorBoundary from './error-boundar'

const root = document.getElementById('root')
if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.')

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Toaster position="bottom-center" />
    </ErrorBoundary>
  </StrictMode>
)
