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
    // console.log(routeFilter);
    return routeFilter;
  };

  const recipe = apiRecipe();
  // na linha 29, estava uma tag <dir> anteriormente, mas troquei (Daniel) por estar obsoleta
  return (
    <div>
      <h1>Testing recipe details</h1>
      { recipe.strMeal !== undefined
    && (
      <div>
        <h1>Testing recipe details</h1>
        <img
          data-testid="recipe-photo"
          className="recipeCard"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
        />
        <h2 data-testid="recipe-title">{ recipe.strMeal }</h2>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        {/* <p data-testid="${index}-ingredient-name-and-measure">{  }</p> */}
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>)}
    </div>
  );
}

export default RecipeDetails;
