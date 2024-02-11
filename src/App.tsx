import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./Home"
import Game1 from "./games/game1"
import Game2 from "./games/game2"
import Game3 from "./games/game3"
import { NameProvider } from "./provider"

function App() {
  const [username, setUsername] = useState('')

  const handleChangeUsername = (name: string) => {
    setUsername(name)
  }

  return (
    <NameProvider>
      <Router>

          <Routes>
            <Route path="/" element={<Home username={username} setUsername={handleChangeUsername}/>}/>
            <Route path="/game1" element={<Game1 username={username}/>}/>
            <Route path="/game2" element={<Game2 username={username}/>}/>
            <Route path="/game3" element={<Game3 username={username}/>}/>
          </Routes>
      </Router>
    </NameProvider>
  )
}

export default App
