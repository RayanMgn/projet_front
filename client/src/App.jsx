
import HomePage from "./Pages/home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import GamePage from "./Pages/game"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
