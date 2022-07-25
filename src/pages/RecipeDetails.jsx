import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import fetchFood from '../services/fetchFood';
import fetchDrink from '../services/fetchDrink';
import arrayIngredientsMeasure from '../services/arrayIngredientsMeasure';
import '../css/recipeDetails.css';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recipeIngredient, setRecipeIngredient] = useState();
  const [recipeMeasure, setRecipeMeasure] = useState();
  const [recommendationFood, setRecommendationFood] = useState([]);
  const [recommendationDrinks, setRecommendationDrinks] = useState([]);
  const [filterRecommendation, setFilterRecommendation] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = useParams();

  useEffect(() => {
    const storeRecipe = async () => {
      if (pathname === `/foods/${id.id}`) {
        setRecommendationDrinks(await fetchDrink([]));
      } else {
        setRecommendationFood(await fetchFood([]));
      }
      setRecipe(await fetchRecipeDetails(id.id, pathname));
    };
    storeRecipe();
  }, []);

  useEffect(() => {
    if (recommendationDrinks !== [] || recommendationFood !== []) {
      if (pathname === `/foods/${id.id}`) {
        const max = 6;
        setFilterRecommendation(recommendationDrinks.filter((_, index) => index < max));
      } else {
        const max = 6;
        setFilterRecommendation(recommendationFood.filter((_, index) => index < max));
      }
    }
  }, []);

  function filterIngredient() {
    const ingredients = arrayIngredientsMeasure.ingredients.map((ingredient) => (
      recipe[ingredient]
    ));
    const remove = ingredients.filter((ingredient) => (pathname === `/foods/${id.id}`
      ? (ingredient !== '') : (ingredient !== null && ingredient !== undefined)));
    setRecipeIngredient(remove);
    if (pathname === `/foods/${id.id}`) {
      const max = 6;
      setFilterRecommendation(recommendationDrinks.filter((_, index) => index < max));
    } else {
      const max = 6;
      setFilterRecommendation(recommendationFood.filter((_, index) => index < max));
    }
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
                src={ pathname === `/foods/${id.id}`
                  ? (recipe.strMealThumb) : (recipe.strDrinkThumb) }
                alt={ pathname === `/foods/${id.id}`
                  ? (recipe.strMeal) : (recipe.strDrink) }
              />
              <h2 data-testid="recipe-title">
                { pathname === `/foods/${id.id}`
                  ? (recipe.strMeal) : (recipe.strDrink) }
              </h2>
              <p data-testid="recipe-category">
                { pathname === `/foods/${id.id}`
                  ? (recipe.strCategory)
                  : (`${recipe.strCategory} -- ${recipe.strAlcoholic}`)}
              </p>
              {
                recipeIngredient.map((e, i) => (
                  <p key={ `key${i}` } data-testid={ `${i}-ingredient-name-and-measure` }>
                    { `${e} - ${recipeMeasure[i]}` }
                  </p>
                ))
              }
              <p data-testid="instructions">{ recipe.strInstructions }</p>
              { pathname === `/foods/${id.id}`
                && (
                  <iframe
                    title="Video"
                    width="320"
                    height="215"
                    data-testid="video"
                    src={ recipe.strYoutube }
                  />)}
              <div className="recomendations">
                {
                  filterRecommendation.map((e, index) => (
                    <a
                      href={ pathname === `/foods/${id.id}`
                        ? (`/drinks/${e.idDrink}`) : (`/foods/${e.idMeal}`) }
                      key={ e.idDrink || e.idMeal }
                      data-testid={ `${index}-recomendation-card` }
                      className="recommendationCards"
                    >
                      <img
                        src={ pathname === `/foods/${id.id}`
                          ? (e.strDrinkThumb) : (e.strMealThumb) }
                        alt={ pathname === `/foods/${id.id}`
                          ? (e.strDrink) : (e.strMeal) }
                        data-testid={ `${index}-recomendation-image` }
                        className="recommendationImage"
                      />
                      <strong
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { pathname === `/foods/${id.id}`
                          ? (e.strDrink) : (e.strMeal) }
                      </strong>
                    </a>
                  ))
                }
              </div>
              <br />
              <br />
              <button
                type="button"
                data-testid="start-recipe-btn"
                id="start-recipe-btn"
              >
                Start Recipe
              </button>
            </div>
          ) : (
            <p>...</p>
          )
      }
    </div>
  );
}
export default RecipeDetails;
