import * as actionTypes from './actionTypes.js';

export const addBook = (newBook) => {
    return {
        type: actionTypes.ADD_BOOK,
        payload: newBook,
    };
};