import React, { useContext } from 'react';
import recipesAppContext from '../context/RecipesAppContext';
import Header from '../components/Header';
import MapRecipes from '../components/MapRecipes';

export default function Drinks() {
  const { filteredDrinks } = useContext(recipesAppContext);

  return (
    <div>
      <Header filteredDrinks={ filteredDrinks }/>
      <MapRecipes
        filteredRecipe={ filteredDrinks }
        id="strDrink"
        name="strDrink"
        thumb="strDrinkThumb"
      />
    </div>
  );
}
