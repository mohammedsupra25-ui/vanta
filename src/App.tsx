import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import LandingPage from './pages/LandingPage'
import Analysis from './pages/Analysis'
import AnalysisDetail from './pages/AnalysisDetail'

function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <Cursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/:slug" element={<AnalysisDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
