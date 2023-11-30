import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId.js';
import {setError} from './errorSlice.js';

const initialState = {
    books: [],
    isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setError(error.message));
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const bookSlice = createSlice(({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            return {
                ...state,
                books: [...state.books, action.payload],
            };
        },
        deleteBook: (state, action) => {
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
            };
        },
        toggleFavorite: (state, action) => {
            return {
                ...state,
                books: state.books.map(book =>
                    book.id === action.payload
                        ? ({...book, isFavorite: !book.isFavorite})
                        : book,
                ),
            };
        },
    },
    // //OPTION 1
    // extraReducers: {
    //     [fetchBook.fulfilled]: (state, action) => {
    //         if (action?.payload?.title && action?.payload?.author) {
    //             const book = createBookWithId(action.payload, 'API');
    //             return [...state, book];
    //         }
    //         return state;
    //     },
    // },
    //OPTION 2
    extraReducers: (builder) => {
        builder.addCase(fetchBook.pending, (state) => {
            return {...state, isLoadingViaAPI: true};
        });
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            if (action?.payload?.title && action?.payload?.author) {
                const book = createBookWithId(action.payload, 'API');
                return {
                    ...state,
                    books: [...state.books, book],
                    isLoadingViaAPI: false,
                };
            }
            return {...state, isLoadingViaAPI: false};
        });
        builder.addCase(fetchBook.rejected, (state) => {
            return {...state, isLoadingViaAPI: false};
        });
    },
}));

export const {
    addBook,
    deleteBook,
    toggleFavorite,
} = bookSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;


export default bookSlice.reducer;