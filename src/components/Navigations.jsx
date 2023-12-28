/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */ 
import React from 'react'
import { Link } from 'react-router-dom'

//Assests
import bookLogo from '../assets/books.png'

export const NavBar = () => {
    return (
        <div>
            <h1><img id='logo-image' src={bookLogo} />Library App</h1>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
}