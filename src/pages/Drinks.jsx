import React, { useContext, useEffect } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import MapRecipes from '../components/MapRecipes';
import fetchDrink from '../services/fetchDrink';

export default function Drinks() {
  const { filteredDrinks, setDrinks, setEndPoints } = useContext(recipesAppContext);
  const endpoint1 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${savedFilters.filterBySearch}`;
  const endpoint2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${savedFilters.filterBySearch}`;
  const endpoint3 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${savedFilters.filterBySearch}`;

  useEffect(() => {
    setEndPoints({ endpoint1, endpoint2, endpoint3 });
  }, []);

  useEffect(() => {
    async function fetchData() {
      setDrinks(await fetchDrink([]));
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header
        filteredRecipe={ filteredDrinks }
      />
      <MapRecipes
        filteredRecipe={ filteredDrinks }
        id="strDrink"
        name="strDrink"
        thumb="strDrinkThumb"
      />
    </div>
  );
}
