import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import StartPage from "./pages/StartPage"
import NotFound from "./pages/NotFound"
import ExploreMapPage from "./pages/Modes/ExploreMapPage"
import FullScreenLayout from "./layouts/FullScreenLayout"
import QuickStartMode from "./pages/Modes/QuickStartMode"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col items-center justify-center m-auto">
          <Routes>

            <Route index path="/" element={<StartPage />} />
            <Route element={<FullScreenLayout />}>
              <Route path="/exploremap" element={<ExploreMapPage />} />
              <Route path="/quickstart" element={<QuickStartMode />} />
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
