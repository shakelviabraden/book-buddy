/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"
import { useSelector } from "react-redux"
import { useGetBookReservationsQuery, useReturnBookMutation } from "../store"

//Material UI
import {
	Grid,
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	CircularProgress,
	Snackbar,
	Paper
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Account = () => {
	const cookies = new Cookies()
	const token = cookies.get('token')

	const { data, isLoading, error } = useGetBookReservationsQuery(token)
	const [returnBook] = useReturnBookMutation()
	const [success, setSuccess] = useState(false)
	const [open, setOpen] = useState(false)
	const [actionError, setActionError] = useState(false)

	const handleOnClick = (props) => {
		const id = props

		returnBook({ id, token })
			.unwrap()
			.then((payload) => { setSuccess(true), setOpen(true) })
			.catch((error) => { setActionError(true), setOpen(true) })
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false)
		setSuccess(false)
		setActionError(false)
	};


	return (
		<Box sx={{ padding: 3 }}>
			<Typography sx={{ textAlign: 'center', fontSize: 35 }}>My Checked Out Books</Typography>
			{isLoading ?
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<CircularProgress />
				</Box> :
			<Grid container spacing={3} padding={5} justifyContent="center">
				{data && data.reservation.length >= 1 ?
					<>
					{console.log(data)}
						{success ?
							<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
								<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
									Book successfully returned.
								</Alert>
							</Snackbar>
							:
							actionError ?
								<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
									<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
										Something went wrong.
									</Alert>
								</Snackbar>
								:
								null
						}
						{data.reservation.map((reservation) => {
							return (
								<Box key={reservation.id} sx={{ margin: 1 }}>
									<Card variant="outlined" sx={{ height: 425, width: 300, border: '5px solid PaleTurquoise' }}>
										<Box sx={{ padding: 1 }}>
											<CardContent sx={{ textAlign: 'center', paddingBottom: 0 }}>
												<Typography sx={{ fontSize: 15 }}>
													{reservation.title}
												</Typography>
												<Typography color="text.secondary">
													{`Author: ${reservation.author}`}
												</Typography>
											</CardContent>
											<CardMedia
												sx={{ height: 300, width: 200, margin: 'auto' }}
												image={reservation.coverimage}
												title={reservation.title}
											/>
											<CardActions>
												<Button onClick={() => handleOnClick(reservation.id)} size="small" sx={{ margin: 'auto' }}>Return Book</Button>
											</CardActions>
										</Box>
									</Card>
								</Box>)
						})}
					</>
					: data && data.reservation.length < 1 ?
					<Box>
						<Paper elevation={3} sx={{height: 350, width: 500, padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
							<Box sx={{width: 'auto'}}>
							<Typography sx={{fontSize: 30, textAlign: 'center'}}>
							You have no books! <Link to='/'>Check some out.</Link>
							</Typography>
							</Box>
						</Paper>
					</Box>
					: 
					<Box>
						<Paper elevation={3} sx={{height: 350, width: 500, padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
							<Box sx={{width: 'auto'}}>
							<Typography sx={{fontSize: 30, textAlign: 'center'}}>
							Nothing to show here.
							</Typography>
							</Box>
						</Paper>
					</Box>}
			</Grid>}
		</Box>

	)
}