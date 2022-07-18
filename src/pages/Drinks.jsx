import React, { useContext } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import MapRecipes from '../components/MapRecipes';

export default function Drinks() {
  const { filteredDrinks } = useContext(recipesAppContext);

  return (
    <MapRecipes
      filteredRecipe={ filteredDrinks }
      id="strDrink"
      name="strDrink"
      thumb="strDrinkThumb"
    />
  );
}
