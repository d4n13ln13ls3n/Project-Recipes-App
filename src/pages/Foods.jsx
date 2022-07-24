import React, { useContext, useEffect } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import MapRecipes from '../components/MapRecipes';
import fetchFood from '../services/fetchFood';
import Footer from '../components/Footer';

export default function Foods() {
  const {
    filteredFoods,
    setFilteredFoods,
    setFoods,
    savedFilters,
    setEndPoints,
  } = useContext(recipesAppContext);

  const endpoint1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${savedFilters.filterBySearch}`;
  const endpoint2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${savedFilters.filterBySearch}`;
  const endpoint3 = `https://www.themealdb.com/api/json/v1/1/search.php?f=${savedFilters.filterBySearch}`;

  useEffect(() => {
    if (savedFilters.filterBySearch) {
      setEndPoints({ endpoint1, endpoint2, endpoint3 });
    }
  }, [savedFilters]);

  useEffect(() => {
    async function fetchData() {
      setFoods(await fetchFood([])); // era setada com array vazio antes
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header setFilteredRecipe={ setFilteredFoods } />
      <MapRecipes
        filteredRecipe={ filteredFoods }
        id="idMeal"
        name="strMeal"
        thumb="strMealThumb"
      />
      <Footer />
    </div>
  );
}
