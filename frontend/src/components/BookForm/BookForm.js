import {useState} from 'react';
import {useDispatch} from 'react-redux';
import createBookWithId from '../../utils/createBookWithId.js'
import {addBook} from '../../redux/books/actionCreators.js';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && author) {
            const book = createBookWithId({
                title,
                author
            });
            dispatch(addBook(book));

            setAuthor('');
            setTitle('');
        }
    };

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = createBookWithId(booksData[randomIndex]);
        dispatch(addBook(randomBook));

    };
    return (<div className="app-block book-form">
        <h2>Add a new Book</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="author">Author: </label>
                <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <button type="submit">Add Book</button>
            <button type="button" onClick={handleAddRandomBook}>Add Random</button>
        </form>
    </div>);
};

export default BookForm;