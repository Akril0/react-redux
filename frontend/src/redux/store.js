import booksSlice from './slices/bookSlice.js';
import {configureStore} from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice.js';
import errorReducer from './slices/errorSlice.js';

const store = configureStore({
    reducer: {
        books: booksSlice,
        filter: filterSlice,
        error: errorReducer,
    },
});

export default store;