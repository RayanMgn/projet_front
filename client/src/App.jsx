
import HomePage from "./Pages/home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import GamePage from "./Pages/game"
import ChoixLevelPage from "./Pages/choixLevel"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/choix-level" element={<ChoixLevelPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
