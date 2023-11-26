import booksReducer from './books/reducer.js';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        books: booksReducer,
    },
});

export default store;