import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './components/signin'
import SignUp from './components/signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
