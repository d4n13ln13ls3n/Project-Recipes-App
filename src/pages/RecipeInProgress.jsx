import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import '../css/RecipeInProgress.css';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import arrayIngredientsMeasure from '../services/arrayIngredientsMeasure';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function RecipeInProgress() {
  const [appearLink, setAppearLink] = useState(false);
  const [recipe, setRecipe] = useState();
  const [recipeIngredient, setRecipeIngredient] = useState();
  const [recipeMeasure, setRecipeMeasure] = useState();
  const history = useHistory();
  const { location: { pathname } } = history;
  const [heart, setHeart] = useState(true);
  const id = useParams();

  useEffect(() => {
    const storeRecipe = async () => {
      setRecipe(await fetchRecipeDetails(id.id, pathname));
    };
    storeRecipe();
  }, []);

  const shareUrl = () => {
    const endpoint = `http://localhost:3000${pathname}`;
    console.log(endpoint);
    const url = navigator.clipboard.writeText(endpoint);
    setAppearLink(true);

    return url;
  };
  function filterIngredient() {
    const ingredients = arrayIngredientsMeasure.ingredients.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => (
      ingredient !== undefined && ingredient !== null && ingredient !== ''
    ));
    setRecipeIngredient(remove);
  }
  function filterMeasure() {
    const ingredients = arrayIngredientsMeasure.measure.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => (
      ingredient !== undefined && ingredient !== null && ingredient !== ''
    ));
    setRecipeMeasure(remove);
  }

  function filterIngredientDrinks() {
    const ingredients = arrayIngredientsMeasure.ingredients.map((ingredient) => (
      recipe[0][ingredient]
    ));
    const remove = ingredients.filter((ingredient) => (
      ingredient !== undefined && ingredient !== null && ingredient !== ''
    ));
    setRecipeIngredient(remove);
  }
  function filterMeasureDrinks() {
    const ingredients = arrayIngredientsMeasure.measure.map((ingredient) => (
      recipe[0][ingredient]
    ));
    const remove = ingredients.filter((ingredient) => (
      ingredient !== undefined && ingredient !== null && ingredient !== ''
    ));
    setRecipeMeasure(remove);
  }

  function compare() {
    if (pathname.includes('foods')) {
      filterIngredient();
      filterMeasure();
    }
    if (pathname.includes('drinks')) {
      filterIngredientDrinks();
      filterMeasureDrinks();
    }
  }

  const handleFav = () => {
    // buttonFav();
    // remove();
    setHeart(!heart);
  };
  useEffect(() => {
    if (recipe !== undefined) {
      compare();
    }
  }, [recipe]);
  // console.log('medidas', recipeMeasure);
  // console.log(recipe);
  // console.log('ingredientes', recipeIngredient);
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
                  ? (recipe.strMealThumb) : (recipe[0].strDrinkThumb) }
                alt={ pathname === `/foods/${id.id}/in-progress`
                  ? (recipe.strMeal) : (recipe[0].strDrink) }
              />
              <h2 data-testid="recipe-title">
                { pathname === `/foods/${id.id}/in-progress`
                  ? (recipe.strMeal) : (recipe[0].strDrink) }
              </h2>
              <p data-testid="recipe-category">
                { pathname === `/foods/${id.id}/in-progress`
                  ? (recipe.strCategory)
                  : (`${recipe[0].strCategory} -- ${recipe[0].strAlcoholic}`)}
              </p>
              <div>
                {
                  recipeIngredient.map((e, i) => (
                    <div
                      key={ `key${i}` }
                    >
                      <label
                        data-testid={ `${i}-ingredient-step` }
                        htmlFor={ `${e} - ${recipeMeasure[i]}` }
                        className="checked"
                      >
                        <input
                          type="checkbox"
                          value={ i }
                          name={ `${e} - ${recipeMeasure[i]}` }
                        />
                        { `${e} - ${recipeMeasure[i]}` }
                      </label>
                    </div>
                  ))
                }
              </div>
              <p data-testid="instructions">{ recipe.strInstructions }</p>
              <br />
              <input
                data-testid="share-btn"
                type="image"
                src={ shareIcon }
                alt={ shareIcon }
                onClick={ () => shareUrl() }
              />
              {appearLink && <p>Link copied!</p>}
              <button
                type="button"
                onClick={ handleFav }
              >
                <img
                  src={ heart ? whiteHeart : blackHeart }
                  alt={ whiteHeart }
                  data-testid="favorite-btn"
                />
              </button>
              <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
            </div>
          ) : (
            <p>...</p>
          )
      }
    </div>
  );
}
