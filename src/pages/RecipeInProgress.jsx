import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import arrayIngredientsMeasure from '../services/arrayIngredientsMeasure';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const [recipeIngredient, setRecipeIngredient] = useState();
  const [recipeMeasure, setRecipeMeasure] = useState();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = useParams();

  useEffect(() => {
    const storeRecipe = async () => {
      setRecipe(await fetchRecipeDetails(id.id, pathname));
    };
    storeRecipe();
  }, []);

  function filterIngredient() {
    const ingredients = arrayIngredientsMeasure.ingredients.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => (pathname === `/foods/${id.id}`
      ? (ingredient !== '') : (ingredient !== null && ingredient !== undefined)));
    setRecipeIngredient(remove);
  }
  function filterMeasure() {
    const ingredients = arrayIngredientsMeasure.measure.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => ingredient !== ' ');
    setRecipeMeasure(remove);
  }

  useEffect(() => {
    if (recipe !== undefined) {
      filterIngredient();
      filterMeasure();
    }
  }, [recipe]);

  return (
    <div>
      {
        recipe !== undefined
          && recipeIngredient !== undefined
          && recipeMeasure !== undefined
          ? (
            <div>
              <img
                data-testid="recipe-photo"
                className="recipeCard"
                src={ pathname === `/foods/${id.id}/in-progress`
                  ? (recipe[0].strMealThumb) : (recipe[0].strDrinkThumb) }
                alt={ pathname === `/foods/${id.id}/in-progress`
                  ? (recipe[0].strMeal) : (recipe[0].strDrink) }
              />
              <h2 data-testid="recipe-title">
                { pathname === `/foods/${id.id}/in-progress`
                  ? (recipe[0].strMeal) : (recipe[0].strDrink) }
              </h2>
              <p data-testid="recipe-category">
                { pathname === `/foods/${id.id}/in-progress`
                  ? (recipe[0].strCategory)
                  : (`${recipe[0].strCategory} -- ${recipe[0].strAlcoholic}`)}
              </p>
              {
                recipeIngredient.map((e, i) => (
                  <p key={ `key${i}` } data-testid={ `${i}-ingredient-name-and-measure` }>
                    { `${e} - ${recipeMeasure[i]}` }
                  </p>
                ))
              }
              <p data-testid="instructions">{ recipe[0].strInstructions }</p>
              <br />
              <button type="button">Finish Recipe</button>

            </div>
          ) : (
            <p>...</p>
          )
      }
    </div>
  );
}
