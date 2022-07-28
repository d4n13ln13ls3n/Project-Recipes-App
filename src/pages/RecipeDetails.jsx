import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import fetchFood from '../services/fetchFood';
import fetchDrink from '../services/fetchDrink';
import arrayIngredientsMeasure from '../services/arrayIngredientsMeasure';
import '../css/recipeDetails.css';
import recipesAppContext from '../context/RecipesAppContext';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import { ReactComponent as WhiteHeartIcon } from '../images/whiteHeartIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recipeIngredient, setRecipeIngredient] = useState();
  const [recipeMeasure, setRecipeMeasure] = useState();
  const [recommendationFood, setRecommendationFood] = useState([]);
  const [recommendationDrinks, setRecommendationDrinks] = useState([]);
  const [filterRecommendation, setFilterRecommendation] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const { inProgress, setInProgress,
    favorites, setFavorites } = useContext(recipesAppContext);

  const history = useHistory();
  const { location: { pathname } } = history;
  const params = useParams();

  const copyText = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
  };

  const isFavorite = favorites.some((fr) => fr.id === params.id);

  const includeFavoriteRecipe = () => {
    const isFood = pathname === `/foods/${params.id}`;

    const favoriteRecipe = {
      id: params.id,
      category: recipe.strCategory,
      type: isFood ? 'food' : 'drink',
      alcoholicOrNot: isFood ? '' : 'Alcoholic',
      name: isFood ? recipe.strMeal : recipe.strDrink,
      image: isFood ? recipe.strMealThumb : recipe.strDrinkThumb,
      nationality: isFood ? recipe.strArea : '',
    };

    setFavorites((prevState) => ([...prevState, favoriteRecipe]));
  };

  const unfavoriteRecipe = () => {
    setFavorites((prevState) => prevState.filter((fr) => fr.id !== params.id));
  };

  useEffect(() => {
    const storeRecipe = async () => {
      if (pathname === `/foods/${params.id}`) {
        setRecommendationDrinks(await fetchDrink([]));
      } else {
        setRecommendationFood(await fetchFood([]));
      }
      setRecipe(await fetchRecipeDetails(params.id, pathname));
    };
    storeRecipe();
  }, []);

  useEffect(() => {
    if (recommendationDrinks.length || recommendationFood.length) {
      if (pathname === `/foods/${params.id}`) {
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
    const remove = ingredients.filter((ingredient) => (pathname === `/foods/${params.id}`
      ? (ingredient !== '') : (ingredient !== null && ingredient !== undefined)));
    setRecipeIngredient(remove);
    if (pathname === `/foods/${params.id}`) {
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

  const startRecipe = () => {
    if (pathname === `/foods/${params.id}`) {
      setInProgress((prevState) => ({ ...prevState,
        meals: { ...prevState.meals, [params.id]: recipeIngredient } }));
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      return history.push(`/foods/${params.id}/in-progress`);
    }
    if (pathname === `/drinks/${params.id}`) {
      setInProgress((prevState) => ({ ...prevState,
        cocktails: { ...prevState.cocktails, [params.id]: recipeIngredient } }));
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      return history.push(`/drinks/${params.id}/in-progress`);
    }
  };

  return (
    <div>
      {
        recipe !== undefined
        && recipeIngredient !== undefined
        && recipeMeasure !== undefined
          ? (
            <div>
              <div className="detailsImgAndName">
                <img
                  data-testid="recipe-photo"
                  className="recipeCard"
                  src={ pathname === `/foods/${params.id}`
                    ? (recipe.strMealThumb) : (recipe.strDrinkThumb) }
                  alt={ pathname === `/foods/${params.id}`
                    ? (recipe.strMeal) : (recipe.strDrink) }
                />
                <div className="detailsNameAndCategory">
                  <h2 data-testid="recipe-title">
                    { pathname === `/foods/${params.id}`
                      ? (recipe.strMeal) : (recipe.strDrink) }
                  </h2>
                  <p data-testid="recipe-category">
                    { pathname === `/foods/${params.id}`
                      ? (recipe.strCategory)
                      : (`${recipe.strCategory} -- ${recipe.strAlcoholic}`)}
                  </p>
                  <button type="button" data-testid="share-btn" onClick={ copyText }>
                    {isCopied
                      ? 'Link copied!' : <ShareIcon id="share-icon" />}
                  </button>
                  <button
                    type="button"
                    data-testid="favorite-btn"
                    onClick={ isFavorite ? unfavoriteRecipe : includeFavoriteRecipe }
                  >
                    {isFavorite
                      ? <BlackHeartIcon id="black-heart-icon" />
                      : <WhiteHeartIcon id="white-heart-icon" />}
                  </button>
                  <button type="button" onClick={ () => setFavorites([]) }>
                    Clear state
                  </button>
                </div>
              </div>
              <div className="detailsIngredientsContainer">
                {
                  recipeIngredient.map((e, i) => (
                    <p
                      key={ `key${i}` }
                      className="detailsIngredients"
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    >
                      { `${e} - ${recipeMeasure[i]}` }
                    </p>
                  ))
                }
              </div>
              <p
                data-testid="instructions"
                className="detailsInstructions"
              >
                { recipe.strInstructions }
              </p>
              { pathname === `/foods/${params.id}`
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
                      href={ pathname === `/foods/${params.id}`
                        ? (`/drinks/${e.idDrink}`) : (`/foods/${e.idMeal}`) }
                      key={ e.idDrink || e.idMeal }
                      data-testid={ `${index}-recomendation-card` }
                      className="recommendationCards"
                    >
                      <img
                        src={ pathname === `/foods/${params.id}`
                          ? (e.strDrinkThumb) : (e.strMealThumb) }
                        alt={ pathname === `/foods/${params.id}`
                          ? (e.strDrink) : (e.strMeal) }
                        data-testid={ `${index}-recomendation-image` }
                        className="recommendationImage"
                      />
                      <strong
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { pathname === `/foods/${params.id}`
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
                className="start-recipe-btn"
                onClick={ startRecipe }
              >
                { inProgress.length ? 'Start Recipe' : 'Continue Recipe' }
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
