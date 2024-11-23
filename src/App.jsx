import { Routes, Route } from 'react-router-dom'
import './App.css'
import SplashPage from './pages/SplashPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  

  return (
    <>      
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
