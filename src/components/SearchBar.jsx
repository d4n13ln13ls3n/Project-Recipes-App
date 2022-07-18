import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [radioSelected, setRadioSelected] = useState('');

  const onInputChange = ({ event: { value } }) => {
    setSearchInput(value);
  };

  // const filterItems = async () => {
  //   if (searchInput.length === 0) {
  //     return 'O campo de busca não pode estar vazio';
  //   } else {

  //   }
  // }

  // const handleRadioChange = ({ target: { value } }) => {
  //   if (target.checked) {
  //     setRadioSelected(value);
  //   }
  // };

  const handleRadioChange = ({ target: { value } }) => {
    setRadioSelected(value);
  };

  return (
    <div>
      <form>
        <label htmlFor="search-input">
          <input
            data-testid="search-input"
            name="search-input"
            onChange={ onInputChange }
            value={ searchInput }
          />
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
            name="search-radio"
            data-testid="ingredient-search-radio"
            onChange={ handleRadioChange }
            value="ingredient"
          />
          Ingredient
        </label>
        <label htmlFor="name" name="name">
          <input
            type="radio"
            name="search-radio"
            id="name"
            data-testid="name-search-radio"
            onChange={ handleRadioChange }
            value="name"
          />
          Name
        </label>
        <label htmlFor="first-letter" name="first-letter">
          <input
            type="radio"
            name="search-radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadioChange }
            value="first-letter"
          />
          First Letter
        </label>
      </form>
    </div>
  );
}

export default SearchBar;
