import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api' }),
    tagTypes: ['Books', 'Reservations'],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => '/books',
            providesTags: ['Books']
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Books']
        }),
        checkout: builder.mutation({
            query: ({id, token}) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {
                    available: false
                }
            }),
            invalidatesTags: ['Books', 'Reservations']
        }),
        getBookReservations: builder.query({
            query: (token) => ({
                url: `/reservations`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags: ['Reservations']
        }),
        returnBook: builder.mutation({
            query: ({id, token}) => ({
                url: `/reservations/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Reservations']
        })
    })
})

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api' }),
    endpoints: (builder) => ({
        setUser: builder.mutation({
            query: (token) => ({
                url: '/users/me',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }),
            
        }),

        createUser: builder.mutation({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            })
        }),
        
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            })
        })
    })
})

const loggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState: {
        user: false,
        info: null
    },
    reducers: {
        setLoggedUser: (state, action) => {
            state.user = true,
            state.info = action.payload
        },
        logoutUser: (state) => {
            state.user = false,
            state.info = null
        }
    }

})

export const store = configureStore({
    reducer: {
        booksApi: booksApi.reducer,
        userApi: userApi.reducer,
        loggedUser: loggedUserSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware, userApi.middleware)
})

export const { setLoggedUser, logoutUser } = loggedUserSlice.actions
export const { useGetAllBooksQuery, useGetBookByIdQuery, useCheckoutMutation, useGetBookReservationsQuery, useReturnBookMutation } = booksApi
export const { useSetUserMutation, useCreateUserMutation, useLoginUserMutation } = userApi