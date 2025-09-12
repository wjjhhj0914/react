import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components'
import { AuthProvider } from '@/contexts/auth'
import App from './app'
import './styles/main.css'

const root = document.getElementById('root')
if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.')

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster position="bottom-right" />
    </ErrorBoundary>
  </StrictMode>
)
