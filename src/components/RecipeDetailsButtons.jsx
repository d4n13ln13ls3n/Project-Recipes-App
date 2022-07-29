import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import recipesAppContext from '../context/RecipesAppContext';

function RecipeDetailsButtons({ recipe }) {
  const [isCopied, setIsCopied] = useState(false);
  const { favorites, setFavorites } = useContext(recipesAppContext);
  // const [recipe, setRecipe] = useState();

  const history = useHistory();
  const { location: { pathname } } = history;
  const params = useParams();

  const copyText = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
  };

  const isFavorite = favorites.some((fr) => fr.id === params.id);
  console.log('isfavorite:', isFavorite);

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

  return (
    <div>
      <button type="button" data-testid="share-btn" onClick={ copyText }>
        {isCopied
          ? 'Link copied!' : <ShareIcon id="share-icon" />}
      </button>
      <button
        type="button"
        onClick={ isFavorite ? unfavoriteRecipe : includeFavoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          alt="favorite"
          src={ isFavorite
            ? blackHeartIcon
            : whiteHeartIcon }
        />
      </button>
      <button type="button" onClick={ () => setFavorites([]) }>
        Clear Favorites
      </button>
    </div>
  );
}

RecipeDetailsButtons.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.number,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailsButtons;
