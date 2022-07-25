import React, { useContext, useEffect } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import fetchFood from '../services/fetchFood';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Foods() {
  const {
    filteredFoods,
    savedFilters,
    setFilteredFoods,
    setFoods,
    setEndPoints,
  } = useContext(recipesAppContext);

  useEffect(() => {
    const fetchData = async () => {
      if (savedFilters.filterBySearch) {
        const endpoint1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${savedFilters.filterBySearch}`;
        const endpoint2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${savedFilters.filterBySearch}`;
        const endpoint3 = `https://www.themealdb.com/api/json/v1/1/search.php?f=${savedFilters.filterBySearch}`;

        return setEndPoints({ endpoint1, endpoint2, endpoint3 });
      }
      const maxLimit = 12;
      const newFoods = await fetchFood([]);
      setFoods(newFoods.filter((_, index) => index < maxLimit));
    };
    fetchData();
  }, [savedFilters.filterBySearch]);

  return (
    <>
      <Header setFilteredRecipe={ setFilteredFoods } />
      <Recipes
        filteredRecipe={ filteredFoods }
        id="idMeal"
        name="strMeal"
        thumb="strMealThumb"
      />
      <Footer />
    </>
  );
}
