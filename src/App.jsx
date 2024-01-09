import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { setLoggedUser, useSetUserMutation } from './store'
import Cookies from 'universal-cookie'

import bookLogo from './assets/books.png'

import Books from './components/Books'
import { NavBar } from './components/Navigations'
import { SingleBook } from './components/SingleBook'
import { Login } from './components/Login'
import { Register } from './components/Register'


function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser)
  const cookies = new Cookies();
  const [setUser] = useSetUserMutation()

  useEffect(() => {
    const loggedIn = () => {
      const token = cookies.get('token') 

      if (token) {
        setUser(token)
        .unwrap()
        .then((payload) => {dispatch(setLoggedUser(payload))})
        .catch((error) =>  console.log(error))
      }
    }
    loggedIn()
  }, [])

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
