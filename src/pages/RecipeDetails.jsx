import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import apiRecipeDetails from '../services/fetchRecipeDetails';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recipeIngredient, setRecipeIngredient] = useState();
  const [recipeMeasure, setRecipeMeasure] = useState();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = useParams();
  // storeRecipe();

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
  // na linha 29 estava uma tag <dir> anteriormente, mas troquei (Daniel) por estar obsoleta
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
  useEffect(() => {
    async function storeRecipe() {
      setRecipe(await apiRecipeDetails(id.id, pathname));
    }
    storeRecipe();
  }, []);

  function filterIngredient() {
    if (recipe !== undefined) {
      console.log('passou em ingredient');
      const keys = Object.keys(recipe[0]);
      const number = -8;
      const filtro = keys.filter((e, i) => (
        e === `strIngredient${`${number + i}`}`
      ));
      const ingre = filtro.map((element) => (
        recipe[0][element]
      ));
      const remove = ingre.filter((element) => element !== '');
      setRecipeIngredient(remove);
    }
  }

  function filterMeasure() {
    if (recipe !== undefined) {
      console.log('passou no measure');
      const keys = Object.keys(recipe[0]);
      const number = -28;
      const filtro = keys.filter((e, i) => (
        e === `strMeasure${`${number + i}`}`
      ));
      const ingre = filtro.map((element) => (
        recipe[0][element]
      ));
      const remove = ingre.filter((element) => element !== ' ');
      setRecipeMeasure(remove);
    }
  }

  // setTimeout(() => {
  //   filterIngredient();
  //   filterMeasure();
  // }, '1200');

  useEffect(() => {
    filterIngredient();
    filterMeasure();
  }, [recipe]);

  console.log('item', recipe, recipeIngredient, recipeMeasure);

  return (
    <div>
      { recipe !== undefined
      && recipeIngredient !== undefined
      && recipeMeasure !== undefined
        ? (
          <div>
            <img
              data-testid="recipe-photo"
              className="recipeCard"
              src={ recipe[0].strMealThumb }
              alt={ recipe[0].strMeal }
            />
            <h2 data-testid="recipe-title">{ recipe[0].strMeal }</h2>
            <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
            {
              recipeIngredient.map((e, i) => (
                <p key={ `key${i}` } data-testid={ `${i}-ingredient-name-and-measure` }>
                  { `Ingredient: ${e} -- Measure: ${recipeMeasure[i]}` }
                </p>
              ))
            }
            <p data-testid="instructions">{ recipe[0].strInstructions }</p>
            <iframe
              title="Video"
              width="320"
              height="215"
              src="https://www.youtube.com/watch?v=VVnZd8A84z4"
            />
          </div>
        ) : (
          <p>...</p>
        )}

</div>
  );
}

export default RecipeDetails;
