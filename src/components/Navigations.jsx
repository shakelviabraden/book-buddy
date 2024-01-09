/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Assets
import bookLogo from '../assets/books.png'

//Material UI
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Button
} from '@mui/material'

export const NavBar = () => {
	const navigate = useNavigate()
	const user = useSelector((state) => state.loggedUser.user)

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ backgroundColor: 'black' }}>
					<Toolbar sx={{ fontFamily: 'Georgia' }}>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
							<Button>
								<Typography sx={{ color: 'white', fontFamily: 'Georgia', fontSize: 30, textTransform: 'none' }}>
									<img id='logo-image' src={bookLogo} />
									Library App
								</Typography>
							</Button>
						</Typography>
						{user ?
							<>
							<Button color="inherit" onClick={() => navigate('/account')}>Account</Button>
							</>
							:
							<>
								<Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
								<Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
							</>}
					</Toolbar>
				</AppBar>
			</Box>
		</>

	)
}