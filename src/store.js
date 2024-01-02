import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api'}),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => '/books',
            providesTags: 'Books'
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: 'Books'
        })
    })
})

export const store = configureStore({
    reducer: {
        booksApi: booksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware)
})

export const { useGetAllBooksQuery, useGetBookByIdQuery } = booksApi