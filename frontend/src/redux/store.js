import booksSlice from './slices/bookSlice.js';
import {configureStore} from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice.js';

const store = configureStore({
    reducer: {
        books: booksSlice,
        filter: filterSlice
    },
});

export default store;