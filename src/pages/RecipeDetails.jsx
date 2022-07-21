import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = useParams();

  const apiRecipe = async () => {
    if (pathname === `/foods/${id.id}`) {
      const receita = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`;
      const response = await fetch(receita);
      const data = await response.json();
      const routeFilter = await data.meals[0];
      console.log(routeFilter);
      return routeFilter;
    } const receita = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.id}`;
    const response = await fetch(receita);
    const data = await response.json();
    const routeFilter = await data.drinks[0];
    console.log(routeFilter);
    return routeFilter;
  };

  apiRecipe();

  return (
    <div>
      <h1>Recipe Details em Construção</h1>
    </div>
  );
}

export default RecipeDetails;
