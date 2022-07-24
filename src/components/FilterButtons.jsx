import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function FilterButtons() {
  const [filterButtons, setFilterButtons] = useState();
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

  return (
    <div>
      { filterButtons && filterButtons.map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
