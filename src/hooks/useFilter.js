import { useState, useEffect } from 'react';

export default function useFilter(foods, drinks, { recipesLimit }) {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    setFilteredMeals(foods.slice(0, recipesLimit));
    setFilteredMeals(drinks.slice(0, recipesLimit));
  }, [foods, drinks, recipesLimit]);

  return [filteredMeals, filteredDrinks];
}
