import {useDispatch, useSelector} from 'react-redux';
import {
    resetFilters,
    selectAuthorFilter,
    selectTitleFilter,
    setAuthorFilter,
    setTitleFilter,
} from '../../redux/slices/filterSlice.js';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter)
    const handleTitleFilterChange = (e) => {
        dispatch(setTitleFilter(e.target.value));
    };

    const handleAuthorFilterChange = (e) => {
        dispatch(setAuthorFilter(e.target.value));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input type="text" placeholder="Filter by title..." value={titleFilter}
                           onChange={handleTitleFilterChange}/>
                </div>
                <div className="filter-group">
                    <input type="text" placeholder="Filter by author..." value={authorFilter}
                           onChange={handleAuthorFilterChange}/>
                </div>
                <button type="button" onClick={handleResetFilters}>Reset filters </button>
            </div>
        </div>);
};

export default Filter;