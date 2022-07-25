import React, { useContext, useEffect } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
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
      const maxLimit = 12;
      const newFoods = await fetchDrink([]);
      setDrinks(newFoods.filter((_, index) => index < maxLimit));
    }
    fetchData();
  }, []);

  return (
    <>
      <Header setFilteredRecipe={ setFilteredDrinks } />
      <Recipes
        filteredRecipe={ filteredDrinks }
        id="strDrink"
        name="strDrink"
        thumb="strDrinkThumb"
      />
      <Footer />
    </>
  );
}
