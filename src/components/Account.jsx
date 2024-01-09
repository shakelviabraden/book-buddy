/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React from "react"
import Cookies from "universal-cookie"
import { useSelector } from "react-redux"
import { useGetBookReservationsQuery } from "../store"

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

export const Account = () => {
    const cookies = new Cookies()
    const token = cookies.get('token')

    const { data, isLoading, error } = useGetBookReservationsQuery(token)

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <Box sx={{padding: 3}}>
               <Typography sx={{textAlign: 'center', fontSize: 35}}>My Checked Out Books</Typography>
               <Grid container spacing={3} padding={5} justifyContent="center">
               {data? data.reservation.map((reservation) => {
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
                        </Box>
                    </Card>
                </Box> )
               }): null}
               </Grid>
        </Box>
 
    )
}