/* eslint-disable sonarjs/no-duplicate-string */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { Redirect } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [searchInput, setSearchInput] = useState('');
  const [radioSelected, setRadioSelected] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  const onInputChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleRadioChange = ({ target: { value } }) => {
    setRadioSelected(value);
  };

  const checkLengthMeals = (data) => {
    console.log('chamei a func');
    console.log('verifica estado', data);
    if (data.meals.length === 1 && pathname === '/foods') {
      console.log(pathname);
      history.push(`${pathname}/${data.meals[0].idMeal}`);
    }
  };

  const checkLengthDrinks = (data) => {
    if (data.drinks.length === 1 && pathname === '/drinks') {
      console.log(pathname);
      history.push(`${pathname}/${data.drinks[0].idDrink}`);
    }
  };

  const getJsonData = async (INGREDIENT_API) => {
    const response = await fetch(INGREDIENT_API);
    const data = await response.json();
    return data;
  };

  const filterDrinks = async () => {
    if (pathname === '/drinks') {
      if (radioSelected === 'ingredient') {
        const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        getJsonData(INGREDIENT_API);
        console.log('data from drinks:', data);
        checkLengthDrinks(data);
        setFilteredDrinks((prevState) => ({ ...prevState, data }));
        return filteredDrinks;
      }
      if (radioSelected === 'name') {
        const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
        getJsonData(INGREDIENT_API);
        checkLengthDrinks(data);
        setFilteredDrinks((prevState) => ({ ...prevState, data }));
        return filteredDrinks;
      }
      if (radioSelected === 'first-letter' && searchInput.length === 1) {
        const INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
        getJsonData(INGREDIENT_API);
        console.log('drinks filtered by first letter:', data);
        checkLengthDrinks(data);
        setFilteredDrinks((prevState) => ({ ...prevState, data }));
        return filteredDrinks;
      }
      global.alert('Your search must have only 1 (one) character');
      return filteredDrinks;
    }
  };
  const showDetails = () => {
    console.log('filtered meals inside showDetails:', filteredMeals);
    if (filteredMeals.data.meals.length > 1 || filteredDrinks.data.drinks.length > 1) {
      setRenderItems(true);
    }
  };

  const updateFilteredMeals = () => {
    checkLengthMeals(data);
    setFilteredMeals((prevState) => ({ ...prevState, data }));
    return filteredMeals;
  };

  const noMatchMessage = 'Sorry, we haven\'t found any recipes for these filters.';

  const filteredSearch = async () => {
    // console.log(filteredMeals.data.meals[0].idMeal);
    // console.log('verifica o length', filteredMeals.data.meals.length);
    if (pathname === '/foods') {
      if (radioSelected === 'ingredient') {
        const INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        getJsonData(INGREDIENT_API);
        if (data) {
          updateFilteredMeals();
        }
        global.alert(noMatchMessage);
      }
      if (radioSelected === 'name') {
        const INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        getJsonData(INGREDIENT_API);
        if (data) {
          updateFilteredMeals();
        }
        global.alert(noMatchMessage);
      }
      if (radioSelected === 'first-letter' && searchInput.length === 1) {
        const INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        getJsonData(INGREDIENT_API);
        if (data) {
          updateFilteredMeals();
        }
        global.alert(noMatchMessage);
      }
      global.alert('Your search must have only 1 (one) character');
      return filteredMeals;
    }
    filterDrinks();
    showDetails();
  };

  useEffect(() => { // mostra resultado depois de atualizar
    console.log('filtered meals:', filteredMeals);
  }, [filteredMeals]);

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
