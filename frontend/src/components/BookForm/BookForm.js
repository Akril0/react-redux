import {useState} from 'react';
import {useDispatch} from 'react-redux';
import createBookWithId from '../../utils/createBookWithId.js';
import {addBook, fetchBook} from '../../redux/slices/bookSlice.js';
import booksData from '../../data/books.json';
import './BookForm.css';
import axios from 'axios';
import {setError} from '../../redux/slices/errorSlice.js';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && author) {
            const book = createBookWithId({title, author}, 'manual');
            dispatch(addBook(book));
            setAuthor('');
            setTitle('');
        } else {
            dispatch(setError('You must fill title and author'));
        }
    };

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = createBookWithId(booksData[randomIndex], 'random');
        dispatch(addBook(randomBook));

    };

    const handleAddRandomBookViaAPI = async () => {
        dispatch(fetchBook());
    };

    return (<div className="app-block book-form">
        <h2>Add a new Book</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="author">Author: </label>
                <input type="text" id="author" value={author}
                       onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <button type="submit">Add Book</button>
            <button type="button" onClick={handleAddRandomBook}>Add Random</button>
            <button type="button" onClick={handleAddRandomBookViaAPI}>Add Random via API
            </button>
        </form>
    </div>);
};

export default BookForm;