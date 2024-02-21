import './UserFilter.css';
/**
 * 
 * @param {string} searchKey
 * @param {function} setSearchKey
 * @param {string} sortBy 
 * @param {function} setSortBy
 * @param {function} clearFiltersHandler
 * @returns {JSX.Element} UserFilter component
 */
const UserFilter = ({ searchKey, setSearchKey, sortBy, setSortBy, clearFiltersHandler }) => {

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by name,email,city or state"
        className="filter search-input"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <select className='filter sort-select' value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="" disabled>-- Select --</option>
        <option value="first">Sort by Firstname</option>
        <option value="last">Sort by Lastname</option>
      </select>
      <button className="filter clear-button" onClick={clearFiltersHandler}>Clear</button>
    </div>
  );
};

export default UserFilter;