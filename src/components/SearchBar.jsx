import React from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  return (
    <div>
      <form>
        <label htmlFor="search-input">
          <input data-testid="search-input" name="search-input" />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          <img src={ searchIcon } alt="search" />
        </button>
        <label htmlFor="ingredient" name="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name" name="name">
          <input
            type="radio"
            name="name"
            id="name"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="first-letter" name="first-letter">
          <input
            type="radio"
            name="first-letter"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </form>
    </div>
  );
}

export default SearchBar;
