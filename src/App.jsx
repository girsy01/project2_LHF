import { Routes, Route } from 'react-router-dom'
import './App.css'
import SplashPage from './pages/SplashPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const registered = false;

  return (
    <>      
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
