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
import favoriteIconProfile from '../images/favoriteIconProfile.svg';
import shareIcon from '../images/shareIcon.svg';

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
  const id = useParams();

  const copyText = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
  };

  const favoriteRecipe = () => {
    const type = pathname === `/foods/${id.id}` ? 'food' : 'drink';
    const isAlcoholic = pathname === `/foods/${id.id}` ? '' : recipe.strAlcoholic;
    setFavorites((prevState) => ([...prevState, {
      id: id.id,
      type,
      natyonality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: isAlcoholic,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }]));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  };

  // useEffect(() => {
  //   function saveToLocal() {
  //     localStorage
  //       .setItem('favoriteRecipes', JSON.stringify(favorites));
  //   }
  //   saveToLocal();
  // }, [favorites]);

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
    if (recommendationDrinks.length || recommendationFood.length) {
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

  const startRecipe = () => {
    if (pathname === `/foods/${id.id}`) {
      setInProgress((prevState) => ({ ...prevState,
        meals: { ...prevState.meals, [id.id]: recipeIngredient } }));
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      return history.push(`/foods/${id.id}/in-progress`);
    }
    if (pathname === `/drinks/${id.id}`) {
      setInProgress((prevState) => ({ ...prevState,
        cocktails: { ...prevState.cocktails, [id.id]: recipeIngredient } }));
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      return history.push(`/drinks/${id.id}/in-progress`);
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
                  src={ pathname === `/foods/${id.id}`
                    ? (recipe.strMealThumb) : (recipe.strDrinkThumb) }
                  alt={ pathname === `/foods/${id.id}`
                    ? (recipe.strMeal) : (recipe.strDrink) }
                />
                <div className="detailsNameAndCategory">
                  <h2 data-testid="recipe-title">
                    { pathname === `/foods/${id.id}`
                      ? (recipe.strMeal) : (recipe.strDrink) }
                  </h2>
                  <p data-testid="recipe-category">
                    { pathname === `/foods/${id.id}`
                      ? (recipe.strCategory)
                      : (`${recipe.strCategory} -- ${recipe.strAlcoholic}`)}
                  </p>
                  <button
                    type="button"
                    data-testid="share-btn"
                    onClick={ copyText }
                  >
                    {isCopied
                      ? 'Link copied!' : <img src={ shareIcon } alt="share-recipe" />}
                  </button>
                  <button
                    type="button"
                    data-testid="favorite-btn"
                    onClick={ favoriteRecipe }
                  >
                    <img src={ favoriteIconProfile } alt="favorite-recipe" />
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
