import React, { useContext, useEffect } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import MapRecipes from '../components/MapRecipes';
import fetchDrink from '../services/fetchDrink';
import Footer from '../components/Footer';

export default function Drinks() {
  const {
    filteredDrinks,
    setFilteredDrinks,
    setDrinks,
    savedFilters,
    setEndPoints,
  } = useContext(recipesAppContext);

  const endpoint1 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${savedFilters.filterBySearch}`;
  const endpoint2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${savedFilters.filterBySearch}`;
  const endpoint3 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${savedFilters.filterBySearch}`;

  useEffect(() => {
    if (savedFilters.filterBySearch) {
      setEndPoints({ endpoint1, endpoint2, endpoint3 });
    }
  }, [savedFilters]);

  useEffect(() => {
    async function fetchData() {
      setDrinks(await fetchDrink([]));
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header setFilteredRecipe={ setFilteredDrinks } />
      <MapRecipes
        filteredRecipe={ filteredDrinks }
        id="strDrink"
        name="strDrink"
        thumb="strDrinkThumb"
      />
      <Footer />
    </div>
  );
}
