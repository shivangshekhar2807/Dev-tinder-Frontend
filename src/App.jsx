import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Body from './components/body'
import Feed from './components/feed'
import Profile from './components/profile'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Body></Body>}>
          <Route path='/' element={<Feed></Feed>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        </Route>
      </Routes>
    
      
    </>
  )
}

export default App
