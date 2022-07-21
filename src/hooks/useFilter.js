import { useState, useEffect } from 'react';

export default function useFilter(foods, drinks, { recipesLimit }, savedFilters) {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    setFilteredFoods(foods.slice(0, recipesLimit));
    setFilteredDrinks(drinks.slice(0, recipesLimit));
  }, [foods, drinks, recipesLimit]);

  return [filteredFoods, filteredDrinks, setFilteredFoods];
}
