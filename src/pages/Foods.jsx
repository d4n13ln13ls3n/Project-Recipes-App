import React, { useContext } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import MapRecipes from '../components/MapRecipes';

export default function Foods() {
  const { filteredFoods } = useContext(recipesAppContext);

  return (
    <div>
      {console.log(filteredFoods)}
      <Header />
      <MapRecipes
        filteredRecipe={ filteredFoods }
        id="idMeal"
        name="strMeal"
        thumb="strMealThumb"
      />
    </div>
  );
}
