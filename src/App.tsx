import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import StartPage from "./pages/StartPage"
import NotFound from "./pages/NotFound"
import ExploreMapPage from "./pages/Modes/ExploreMap/ExploreMapPage"
import FullScreenLayout from "./layouts/FullScreenLayout"
import QuickStartMode from "./pages/Modes/QuickStartMode"
import { Analytics } from "@vercel/analytics/react"
import { useEffect } from "react"
import { ChallengeModePage } from "./pages/Modes/ChallengeModePage"
import ProvincePage from "./pages/Modes/ExploreMap/ProvincePage"

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
        <div className="dark:bg-retro-bg bg-[#4576b2]">
          <Routes>
            <Route index path="/" element={<StartPage />} />

            <Route element={<FullScreenLayout />}>
              <Route path="/quickstart" element={<QuickStartMode />} />
              <Route path="/exploremap" element={<ExploreMapPage />}>
                <Route path=":provinceName" element={<ProvincePage />} />
              </Route>
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
