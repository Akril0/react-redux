import './BookList.css';
import {useDispatch, useSelector} from 'react-redux';
import {BsBookmarkStar, BsBookmarkStarFill} from 'react-icons/bs';
import {deleteBook, toggleFavorite} from '../../redux/slices/bookSlice.js';
import {selectAuthorFilter, selectOnlyFavorite, selectTitleFilter} from '../../redux/slices/filterSlice.js';

const BookList = () => {
    const books = useSelector((state) => state.books);
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavorite);
    const dispatch = useDispatch();
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };

    const filteredBooks = books.filter(book => {
        const matchByTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        const matchByAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase());
        const matchByOnlyFavorite = onlyFavoriteFilter ? book.isFavorite : true;
        return matchByAuthor && matchByTitle && matchByOnlyFavorite;
    });

    const highlightMatch = (text, filter) => {
        if (!filter) return text;

        const regex = new RegExp(`(${filter})`, 'gi');
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className="highlight">{substring}</span>
                );
            }
            return substring;
        });
    };

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (<ul>
                {filteredBooks.map((book, i) => (
                    <li key={book.id}>
                        <div
                            className="book-info">{++i}. {highlightMatch(book.title, titleFilter)} by <strong>{highlightMatch(book.author, authorFilter)}</strong>
                        </div>
                        <div className="book-actions">
                            <span onClick={() => handleToggleFavorite(book.id)}>
                            {book.isFavorite ? (
                                <BsBookmarkStarFill className="star-icon"/>
                            ) : (
                                <BsBookmarkStar className="star-icon"/>
                            )}
                            </span>
                            <button onClick={() => handleDeleteBook(book.id)}>delete</button>
                        </div>
                    </li>
                ))}
            </ul>)}
        </div>);
};

export default BookList;