import booksReducer from './books/reducer.js';
import {configureStore} from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice.js';

const store = configureStore({
    reducer: {
        books: booksReducer,
        filter: filterSlice
    },
});

export default store;