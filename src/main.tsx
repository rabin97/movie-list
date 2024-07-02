import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import AppProvider from './redux/providers/Redux.provider.tsx'
import Nav from './components/NavBar.tsx'
import StateContextProvider from './hooks/state.context.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <StateContextProvider>
        <Nav />
        <App />
      </StateContextProvider>
    </AppProvider>
  </React.StrictMode>,
)
