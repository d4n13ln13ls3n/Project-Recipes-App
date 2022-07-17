import React, { useContext } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import MapRecipes from '../components/MapRecipes';

export default function Foods() {
  const { filteredFoods } = useContext(recipesAppContext);

  return (
    <MapRecipes
      filteredRecipe={ filteredFoods }
      id="idMeal"
      name="strMeal"
      thumb="strMealThumb"
    />
  );
}
