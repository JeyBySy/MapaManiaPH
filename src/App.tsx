import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import StartPage from "./pages/StartPage"
import NotFound from "./pages/NotFound"
import ExploreMapPage from "./pages/Modes/ExploreMapPage"
import FullScreenLayout from "./layouts/FullScreenLayout"
import QuickStartMode from "./pages/Modes/QuickStartMode"
import { Analytics } from "@vercel/analytics/react"
import { useEffect } from "react"
import { ChallengeModePage } from "./pages/Modes/ChallengeModePage"

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col items-center justify-center m-auto dark:bg-retro-bg">
          <Routes>
            <Route index path="/" element={<StartPage />} />
            <Route element={<FullScreenLayout />}>
              <Route path="/quickstart" element={<QuickStartMode />} />
              <Route path="/exploremap" element={<ExploreMapPage />} />
              <Route path="/challenge" element={<ChallengeModePage />} />
            </Route>
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Analytics />
      </Router>
    </>
  )
}

export default App
