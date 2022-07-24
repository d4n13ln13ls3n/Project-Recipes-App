import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import fetchRecipeDetails from '../services/fetchRecipeDetails';

function RecipeDetails() {
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
    const keys = Object.keys(recipe);
    const number = -8;
    const filtro = keys.filter((key, index) => (
      key === `strIngredient${`${number + index}`}`
    ));
    const ingredients = filtro.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => ingredient !== '');
    setRecipeIngredient(remove);
  }

  function filterMeasure() {
    const keys = Object.keys(recipe);
    const number = -28;
    const filtro = keys.filter((key, i) => (
      key === `strMeasure${`${number + i}`}`
    ));
    const ingredients = filtro.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => ingredient !== ' ');
    setRecipeMeasure(remove);
  }

  useEffect(() => {
    if (recipe !== undefined) {
      console.log(recipe);
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
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
              <h2 data-testid="recipe-title">{ recipe.strMeal }</h2>
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
              {
                recipeIngredient.map((e, i) => (
                  <p key={ `key${i}` } data-testid={ `${i}-ingredient-name-and-measure` }>
                    { `Ingredient: ${e} -- Measure: ${recipeMeasure[i]}` }
                  </p>
                ))
              }
              <p data-testid="instructions">{ recipe.strInstructions }</p>
              <iframe
                title="Video"
                width="320"
                height="215"
                data-testid="video"
                src={ recipe.strYoutube }
              />
              <div
                data-testid="0-recomendation-card"
              />
              Essa vai ser a recomendação.
            </div>
          ) : (
            <p>...</p>
          )
      }
    </div>
  );
}

export default RecipeDetails;
