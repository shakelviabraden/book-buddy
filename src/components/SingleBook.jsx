/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React from "react"
import { useParams } from "react-router-dom"
import { useGetBookByIdQuery } from '../store'
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
	Divider
} from '@mui/material';

export const SingleBook = () => {
	const { id } = useParams()
	const { data, isLoading, error } = useGetBookByIdQuery(id)

	return (
		<>
			{isLoading ?
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<CircularProgress />
				</Box> :
				error ? <h1>Error</h1> : data ?
					<Box display='flex' sx={{padding: 5}}>
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
										{data.book.available ? <Button size="small" sx={{ margin: 'auto' }}>Checkout</Button> : <Button size="small" sx={{ margin: 'auto' }}>Unavailable</Button>}
									</CardActions>
								</Box>
							</Card>
						</Box>
						<Box sx={{ margin: 1, padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
							<Box>
								<Typography sx={{fontWeight: 'bold'}}>Title</Typography>
								<Divider light />
								<Typography>{data.book.title}</Typography>
							</Box>
							<Box>
								<Typography sx={{fontWeight: 'bold'}}>Author</Typography>
								<Divider light />
								<Typography>{data.book.author}</Typography>
							</Box>
							<Box>
								<Typography sx={{fontWeight: 'bold'}}>Description</Typography>
								<Divider light />
								<Typography>{data.book.description}</Typography>
							</Box>
							<Box>
							</Box>
						</Box>
					</Box> : null
			}
		</>
	)
}