import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesAppContext from '../context/RecipesAppContext';

function FilterButtons() {
  const [filterButtons, setFilterButtons] = useState();
  const { setFilteredRecipes } = useContext(recipesAppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getFoodCategories = async () => {
      if (pathname === '/foods') {
        const maxLimit = 5;
        const foodsCategorysUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const categories = await fetch(foodsCategorysUrl);
        const response = await categories.json();
        setFilterButtons(response.meals.filter((_, index) => index < maxLimit));
      }
      if (pathname === '/drinks') {
        const maxLimit = 5;
        const drinksCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const categories = await fetch(drinksCategoryUrl);
        const response = await categories.json();
        setFilterButtons(response.drinks.filter((_, index) => index < maxLimit));
      }
    };
    getFoodCategories().catch(console.error);
  }, []);

  const filterByCategory = async ({ target }) => {
    if (pathname === '/foods') {
      const endpointFilterFoods = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`;
      const category = await fetch(endpointFilterFoods);
      const response = await category.json();
      setFilteredRecipes();
      console.log(response);
    }
    if (pathname === '/drinks') {
      const endpointFilterDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`;
      const category = await fetch(endpointFilterDrinks);
      const response = await category.json();
      setFilteredRecipes();
      console.log(response);
    }
  };

  return (
    <div>
      <button type="button" data-testid="All-category-filter">All</button>
      { filterButtons && filterButtons.map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          value={ category.strCategory }
          onClick={ filterByCategory }
        >
          { category.strCategory }
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
