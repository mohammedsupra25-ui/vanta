import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Analysis from './pages/Analysis'
import AnalysisDetail from './pages/AnalysisDetail'
import Education from './pages/Education'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <div className="grain-overlay" aria-hidden />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/:slug" element={<AnalysisDetail />} />
          <Route path="/education" element={<Education />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
