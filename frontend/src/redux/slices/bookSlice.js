import {createSlice} from '@reduxjs/toolkit';

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



export default bookSlice.reducer;