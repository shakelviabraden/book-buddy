import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api' }),
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

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        setUser: builder.query({
            query: (token) => ({
                url: '/users/me',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }),
            providesTagsTags: 'User'
        }),

        createUser: builder.mutation({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            }),
            invalidatesTags: 'User'
        }),
        
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            }),
            invalidatesTags: 'User'
        })
    })
})

export const store = configureStore({
    reducer: {
        booksApi: booksApi.reducer,
        userApi: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware, userApi.middleware)
})

export const { useGetAllBooksQuery, useGetBookByIdQuery } = booksApi
export const { useSetUserQuery, useCreateUserMutation, useLoginUserMutation } = userApi