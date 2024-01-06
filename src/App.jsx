import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/Navigations'
import { SingleBook } from './components/SingleBook'
import { Login } from './components/Login'
import { Register } from './components/Register'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<h1>account</h1>} />
        <Route path='/book/:id' element={<SingleBook />} />
      </Routes>
    </>
  )
}

export default App
