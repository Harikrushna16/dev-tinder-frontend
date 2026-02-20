import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Body from "./components/Body"
import Profile from "./components/Profile"
import Signup from "./components/Signup"

function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
