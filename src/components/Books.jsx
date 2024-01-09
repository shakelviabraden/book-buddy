import React from "react"
import { useNavigate } from "react-router-dom";
import { useGetAllBooksQuery } from '../store'
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';


const Books = () => {
  const { data: books, isLoading, error } = useGetAllBooksQuery()
  const navigate = useNavigate()

  return (
    <>
      <Typography sx={{ textAlign: 'center', fontSize: 45 }}>Books</Typography>
      {isLoading ?
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress />
        </Box> :
        <Grid container spacing={3} padding={5} justifyContent="center">
          {books ?
            books.books.map((book) => {
              return (
                <Box key={book.id} sx={{ margin: 1 }}>
                  <Card variant="outlined" sx={{ height: 425, width: 300, border: '5px solid PaleTurquoise' }}>
                    <Box sx={{ padding: 1 }}>
                      <CardContent sx={{ textAlign: 'center', paddingBottom: 0 }}>
                        <Typography sx={{ fontSize: 15 }}>
                          {book.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {`Author: ${book.author}`}
                        </Typography>
                      </CardContent>
                      <CardMedia
                        sx={{ height: 300, width: 200, margin: 'auto' }}
                        image={book.coverimage}
                        title={book.title}
                      />
                      <CardActions>
                        <Button size="small" sx={{ margin: 'auto' }} onClick={() => navigate(`/book/
												${book.id}`)}>Details</Button>
                      </CardActions>
                    </Box>
                  </Card>
                </Box>
              )
            })
            : null}
        </Grid>
      }
    </>


  )
}

export default Books