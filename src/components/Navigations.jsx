/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

//Assets
import bookLogo from '../assets/books.png'

//Material UI
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide
} from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const NavBar = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const user = useSelector((state) => state.loggedUser.user)

	const cookies = new Cookies()

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		navigate('/login')
		cookies.remove('token')
		dispatch(logoutUser())
		setOpen(false)
	}

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
								<Button color="inherit" onClick={handleClickOpen}>Logout</Button>
								<Dialog
									open={open}
									TransitionComponent={Transition}
									keepMounted
									onClose={handleClose}
									aria-describedby="alert-dialog-slide-description"
								>
									<DialogTitle>{"Logout"}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-slide-description">
											Are you sure you want to log out?
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose}>Go Back</Button>
										<Button onClick={handleLogout}>Agree</Button>
									</DialogActions>
								</Dialog>
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