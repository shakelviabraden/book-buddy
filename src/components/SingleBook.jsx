/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useGetBookByIdQuery, useCheckoutMutation } from '../store'
import Cookies from "universal-cookie";

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
	Divider,
	Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SingleBook = () => {
	const { id } = useParams()
	const { data, isLoading, error } = useGetBookByIdQuery(id)

	const user = useSelector((state) => state.loggedUser.user)
	const cookies = new Cookies()
	const token = cookies.get('token')

	const [checkout] = useCheckoutMutation()

	const [success, setSuccess] = useState(false)
	const [actionError, setActionError] = useState(false)
	const [unavailableError, setUnavailableError] = useState(false)
	const [open, setOpen] = useState(false);

	const handleCheckout = () => {
		if (user) {
			checkout({ id, token })
				.unwrap()
				.then((payload) => { if (payload.book) { setSuccess(true), setOpen(true) }})
				.catch((error) => console.log(error))
		} else if (!user) {
			setActionError(true)
			setOpen(true)
		}
	}

	const handleUnavailable = () => {
		setUnavailableError(true)
		setOpen(true)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false)
		setSuccess(false)
		setActionError(false)
		setUnavailableError(false)
	};

	return (
		<>
			{isLoading ?
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<CircularProgress />
				</Box> :
				error ? <h1>Error</h1> : data ?
				<>
				{success ?
							<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
								<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
									Book successfully checked out.
								</Alert>
							</Snackbar>
						: 
						actionError ? 
						<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
							You must be logged in to perform this action.
						</Alert>
					</Snackbar> 
					: 
					unavailableError ? 
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
						This book is unavailable. No action to be performed. 
						</Alert>
					</Snackbar> 
					:
					null
				 }
				
						<Box display='flex' sx={{ padding: 5 }}>
							<Box sx={{ margin: 1 }}>
								<Card variant="outlined" sx={{ height: 425, width: 300, border: '5px solid PaleTurquoise' }}>
									<Box sx={{ padding: 1 }}>
										<CardContent sx={{ textAlign: 'center', paddingBottom: 1.5 }}>
										</CardContent>
										<CardMedia
											sx={{ height: 350, width: 225, margin: 'auto' }}
											image={data.book.coverimage}
											title={data.book.title}
										/>
										<CardActions>
											{
												data.book.available ?
													<Button size="small" sx={{ margin: 'auto' }} onClick={handleCheckout}>
														Available
													</Button>
													:
													<Button onClick={handleUnavailable} size="small" sx={{ margin: 'auto' }}>
														Unavailable
													</Button>
											}
										</CardActions>
									</Box>
								</Card>
							</Box>
							<Box sx={{ margin: 1, padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
								<Box>
									<Typography sx={{ fontWeight: 'bold' }}>Title</Typography>
									<Divider light />
									<Typography>{data.book.title}</Typography>
								</Box>
								<Box>
									<Typography sx={{ fontWeight: 'bold' }}>Author</Typography>
									<Divider light />
									<Typography>{data.book.author}</Typography>
								</Box>
								<Box>
									<Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
									<Divider light />
									<Typography>{data.book.description}</Typography>
								</Box>
								<Box>
								</Box>
							</Box>
						</Box> 
						</>: null
			}
		</>
	)
}