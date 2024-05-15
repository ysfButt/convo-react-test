import React from 'react';
import { Input, Button} from 'antd';

const { Search } = Input;


const SearchField = () => {
  return (
    <div className="search-field">
      {/* Search */}
      <Search
        placeholder="Search the record"
        size="large"
      />
      {/* Search End */}

      {/* Sort by Wrap */}
      <div className="filter-wrap">
        <span className="filter-wrap-label">Sort By</span>
        <Button type="success" size="large">Most Upvoted</Button>
        <Button type="success" size="large">Most Recent</Button>
      </div>
      {/* Sort by Wrap End */}
    </div>
  )
}

export default SearchField;
