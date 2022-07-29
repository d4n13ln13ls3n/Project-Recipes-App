import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import { ReactComponent as WhiteHeartIcon } from '../images/whiteHeartIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../images/blackHeartIcon.svg';

function RecipeDetailsButtons() {
  const [isCopied, setIsCopied] = useState(false);
  const { favorites, setFavorites } = useContext(recipesAppContext);

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

  return (
    <section>
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
        Clear Favorites
      </button>
    </section>
  );
}

export default RecipeDetailsButtons;
