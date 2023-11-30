import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId.js';

const initialState = [];

const bookSlice = createSlice(({
    name: 'book',
    initialState,
    reducers:{
        addBook: (state, action)=>{
            return [...state, action.payload];
        },
        deleteBook:(state, action) =>{
            return state.filter((book) => book.id !== action.payload);
        },
        toggleFavorite:(state, action)=>{
            return state.map(book =>
                book.id === action.payload
                    ? ({...book, isFavorite: !book.isFavorite})
                    : book,
            );
        }
    }
}))

export const {
    addBook,
    deleteBook,
    toggleFavorite
} = bookSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
    try {
        const res = await axios.get('http://localhost:4000/random-book');
        if (res?.data?.title && res?.data?.author) {
            const book = createBookWithId(res.data, 'API');
            dispatch(addBook(book));
        }
    } catch (e) {
        console.log(e);
    }
};

export default bookSlice.reducer;