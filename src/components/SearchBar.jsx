import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <label htmlFor="search-input">
          <input data-testid="search-input" name="search-input" />
        </label>
      </form>
    </div>
  );
}

export default SearchBar;
