import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import { GlobalContextProvider } from './GlobalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <Router />
    </GlobalContextProvider>
  </StrictMode>,
)
