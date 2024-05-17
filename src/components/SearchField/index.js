import React, { useState, useEffect } from 'react';
import { Input, Button} from 'antd';

const { Search } = Input;


const SearchField = ({handleSearch, handleSort}) => {
  // handleSearch('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm.length >= 3) {
      handleSearch(debouncedTerm);
    } else {
      handleSearch('');
    }
  }, [debouncedTerm, handleSearch]);

  return (
    <div className="search-field">
      {/* Search */}
      <Search
        placeholder="Search the record"
        size="large"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Search End */}

      {/* Sort by Wrap */}
      <div className="filter-wrap">
        <span className="filter-wrap-label">Sort By</span>
        <Button type="success" size="large" onClick={() => handleSort("upvotes")}>Most Upvoted</Button>
        <Button type="success" size="large" onClick={() => handleSort("DatePicker")}>Most Recent</Button>
        {/* <Button type="success" size="large" onClick={handleClearSort}>Clear</Button> */}
      </div>
      {/* Sort by Wrap End */}
    </div>
  )
}

export default SearchField;
