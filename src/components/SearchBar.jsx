/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [searchInput, setSearchInput] = useState('');
  const [radioSelected, setRadioSelected] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);

  const onInputChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleRadioChange = ({ target: { value } }) => {
    setRadioSelected(value);
  };

  const filterDrinks = async () => {
    if (pathname === '/drinks') {
      if (radioSelected === 'ingredient') {
        const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const response = await fetch(INGREDIENT_API);
        const data = await response.json();
        setFilteredMeals((prevState) => ({ ...prevState, data }));
        return filteredMeals;
      }
      if (radioSelected === 'name') {
        const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(INGREDIENT_API);
        const data = await response.json();
        setFilteredMeals((prevState) => ({ ...prevState, data }));
        return filteredMeals;
      }
      if (radioSelected === 'first-letter' && searchInput.length === 1) {
        const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(INGREDIENT_API);
        const data = await response.json();
        setFilteredMeals((prevState) => ({ ...prevState, data }));
        return filteredMeals;
      }
      global.alert('Your search must have only 1 (one) character');
      return filteredMeals;
    }
  };

  const filteredSearch = async () => {
    if (pathname === '/foods') {
      if (radioSelected === 'ingredient') {
        const INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const response = await fetch(INGREDIENT_API);
        const data = await response.json();
        console.log(data);
        setFilteredMeals((prevState) => ({ ...prevState, data }));
        return filteredMeals;
      }
      if (radioSelected === 'name') {
        const INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(INGREDIENT_API);
        const data = await response.json();
        setFilteredMeals((prevState) => ({ ...prevState, data }));
        return filteredMeals;
      }
      if (radioSelected === 'first-letter' && searchInput.length === 1) {
        const INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(INGREDIENT_API);
        const data = await response.json();
        setFilteredMeals((prevState) => ({ ...prevState, data }));
        return filteredMeals;
      }
      global.alert('Your search must have only 1 (one) character');
      return filteredMeals;
    }
    filterDrinks();
  };

  // useEffect(() => { // mostra resultado depois de atualizar
  //   console.log('filtered meals:', filteredMeals);
  // }, [filteredMeals]);

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
          onClick={ () => filteredSearch() }
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
