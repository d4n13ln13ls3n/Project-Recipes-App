import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import recipesAppContext from '../context/RecipesAppContext';
import searchIcon from '../images/searchIcon.svg';
import { useHistory } from 'react-router';

export default function SearchBar({ setFilteredRecipe }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  const initialSelectedFilters = {
    filterBySearch: '',
    filterByRadio: '',
  };

  // salva nesse componente de maneira local os filtros selecionados
  const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters);

  const {
    savedFilters,
    setSavedFilters,
    endPoints,
  } = useContext(recipesAppContext);

  const handleInputChange = ({ target: { value } }) => {
    setSelectedFilters((prevState) => ({ ...prevState, filterBySearch: value }));
  };

  const handleRadioChange = ({ target: { value } }) => {
    setSelectedFilters((prevState) => ({ ...prevState, filterByRadio: value }));
  };

  const checkLengthMeals = (data) => {
    if (data.meals.length === 1 && pathname === '/foods') {
      history.push(`${pathname}/${data.meals[0].idMeal}`);
    }
  };

  const checkLengthDrinks = (data) => {
    if (data.drinks.length === 1 && pathname === '/drinks') {
      history.push(`${pathname}/${data.drinks[0].idDrink}`);
    }
  };

  const noMatchMessage = 'Sorry, we haven\'t found any recipes for these filters.';

  const getJsonData = async (endpoint) => {
    const maxLimit = 12;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.meals) {
        checkLengthMeals(data);
        return data.meals.filter((_, index) => index < maxLimit);
      }
      if (data.drinks) {
        checkLengthDrinks(data);
        return data.drinks.filter((_, index) => index < maxLimit);
      }
      return null;
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleSearch = () => {
    // está passando o valor do state local (selectedFilters) para o state do context (global)
    setSavedFilters(selectedFilters);
  };

  const filterByIngredient = async () => {
    const data = await getJsonData(endPoints.endpoint1);
    if (!data) {
      return global.alert(noMatchMessage);
    }
    return setFilteredRecipe(data);
  };

  const filterByName = async () => {
    const data = await getJsonData(endPoints.endpoint2);
    if (!data) {
      return global.alert(noMatchMessage);
    }
    return setFilteredRecipe(data);
  };

  const filterByFirstLetter = async () => {
    const data = await getJsonData(endPoints.endpoint3);
    if (!data) {
      return global.alert(noMatchMessage);
    }
    return setFilteredRecipe(data);
  };

  useEffect(() => {
    const callBack = async () => {
      const { filterByRadio, filterBySearch } = selectedFilters;
      if (savedFilters.filterBySearch && filterByRadio === 'ingredient') {
        return filterByIngredient();
      }

      if (savedFilters.filterBySearch && filterByRadio === 'name') {
        return filterByName();
      }

      if (savedFilters.filterBySearch
          && filterByRadio === 'first-letter' && filterBySearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      return filterByFirstLetter();
    };
    callBack();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPoints]);

  return (
    <>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          name="search-input"
          onChange={ handleInputChange }
          value={ selectedFilters.filterBySearch }
        />
      </label>
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
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        <img src={ searchIcon } alt="search" />
        <span>Fazer busca</span>
      </button>
    </>
  );
}

SearchBar.propTypes = {
  setFilteredRecipe: PropTypes.func.isRequired,
};
