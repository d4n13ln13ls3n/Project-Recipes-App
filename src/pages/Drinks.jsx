import React, { useContext, useEffect } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import fetchDrink from '../services/fetchDrink';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Drinks() {
  const {
    filteredDrinks,
    savedFilters,
    setFilteredDrinks,
    setDrinks,
    setEndPoints,
  } = useContext(recipesAppContext);

  useEffect(() => {
    const fetchData = async () => {
      if (savedFilters.filterBySearch) {
        const endpoint1 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${savedFilters.filterBySearch}`;
        const endpoint2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${savedFilters.filterBySearch}`;
        const endpoint3 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${savedFilters.filterBySearch}`;

        return setEndPoints({ endpoint1, endpoint2, endpoint3 });
      }
      const maxLimit = 12;
      const newDrinks = await fetchDrink([]);
      setDrinks(newDrinks.filter((_, index) => index < maxLimit));
    };
    fetchData();
  }, [savedFilters.filterBySearch]);

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
