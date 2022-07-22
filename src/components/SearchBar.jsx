import React, { useState, useContext } from 'react';
// import { useHistory } from 'react-router';
import recipesAppContext from '../context/RecipesAppContext';
import searchIcon from '../images/searchIcon.svg';

function SearchBar({ filteredRecipe }) {
  // const history = useHistory();
  // const { location: { pathname } } = history;

  const initialSelectedFilters = {
    filterBySearch: '',
    filterByRadio: '',
  };

  const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters);

  const { setFilteredFoods, setSavedFilters, endPoints } = useContext(recipesAppContext);

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

  // const checkLengthDrinks = (data) => {
  //   if (data.drinks.length === 1 && pathname === '/drinks') {
  //     history.push(`${pathname}/${data.drinks[0].idDrink}`);
  //   }
  // };

  // const filterDrinks = async () => {
  //   if (pathname === '/drinks') {
  //     if (radioSelected === 'ingredient') {
  //       const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
  //       getJsonData(INGREDIENT_API);
  //       checkLengthDrinks(data);
  //       setFilteredDrinks((prevState) => ({ ...prevState, data }));
  //       return filteredDrinks;
  //     }
  //     if (radioSelected === 'name') {
  //       const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
  //       getJsonData(INGREDIENT_API);
  //       checkLengthDrinks(data);
  //       setFilteredDrinks((prevState) => ({ ...prevState, data }));
  //       return filteredDrinks;
  //     }
  //     if (radioSelected === 'first-letter' && searchInput.length === 1) {
  //       const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
  //       getJsonData(INGREDIENT_API);
  //       checkLengthDrinks(data);
  //       setFilteredDrinks((prevState) => ({ ...prevState, data }));
  //       return filteredDrinks;
  //     }
  //     global.alert('Your search must have only 1 (one) character');
  //     return filteredDrinks;
  //   }
  // };

  const updateFilteredFoods = (data) => {
    setFilteredFoods(data);
  };

  const noMatchMessage = 'Sorry, we haven\'t found any recipes for these filters.';

  const getJsonData = async (INGREDIENT_API) => {
    const response = await fetch(INGREDIENT_API);
    const { meals } = await response.json();
    if (!meals) {
      global.alert(noMatchMessage);
      return null;
    }
    return meals;
  };

  const handleSearch = async () => {
    // está passando o valor do state local para o state do context (global)
    setSavedFilters(selectedFilters);
    if (selectedFilters.filterByRadio === 'ingredient') {
      const meals = await getJsonData(endPoints.endpoint1);
      if (meals) {
        updateFilteredFoods(meals);
      }
    }
    if (selectedFilters.filterByRadio === 'name') {
      const meals = await getJsonData(endPoints.endpoint2);
      if (meals) {
        updateFilteredFoods(meals);
      }
    }
    if (selectedFilters.filterByRadio === 'first-letter' && selectedFilters.filterBySearch.length === 1) {
      const meals = await getJsonData(endPoints.endpoint3);
      if (meals) {
        updateFilteredFoods(meals);
      }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <div>
      <section>
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
      </section>
    </div>
  );
}

export default SearchBar;
