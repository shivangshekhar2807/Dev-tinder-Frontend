import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './login'
import Body from './body'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Body></Body>}>
        <Route path='/login' element={<Login></Login>}></Route>
        </Route>
      </Routes>
    
      
    </>
  )
}

export default App
