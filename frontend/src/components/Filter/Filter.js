import {useDispatch, useSelector} from 'react-redux';
import {
    resetFilters,
    selectAuthorFilter,
    selectOnlyFavorite,
    selectTitleFilter,
    setAuthorFilter, setOnlyFavorite,
    setTitleFilter,
} from '../../redux/slices/filterSlice.js';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavorite);
    const authorFilter = useSelector(selectAuthorFilter);
    const handleTitleFilterChange = (e) => {
        dispatch(setTitleFilter(e.target.value));
    };

    const handleAuthorFilterChange = (e) => {
        dispatch(setAuthorFilter(e.target.value));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    const handleOnlyFavoriteFilterChange = () => {
        dispatch(setOnlyFavorite());
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
                <div className="filter-group">
                    <input type="checkbox" checked={onlyFavoriteFilter}
                           onChange={handleOnlyFavoriteFilterChange}/>
                    <label>Only Favorite</label>
                </div>
                <button type="button" onClick={handleResetFilters}>Reset filters</button>
            </div>
        </div>);
};

export default Filter;