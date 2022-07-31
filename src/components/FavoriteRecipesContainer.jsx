/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import recipesAppContext from '../context/RecipesAppContext';

export default function FavoriteRecipeContainer({ recipe, index }) {
  const {
    id,
    image,
    name,
    type,
    nationality,
    alcoholicOrNot,
    category,
  } = recipe;

  const { favorites, setFavorites } = useContext(recipesAppContext);

  const [isCopied, setIsCopied] = useState(false);

  const handleShare = (location) => {
    navigator.clipboard.writeText(`http://localhost:3000${location}`);
    setIsCopied(true);
  };

  const handleFavorite = ({ target }) => {
    const newLocalStorageValue = (
      favorites.filter((recipes) => recipes.id !== target.id)
    );
    setFavorites(newLocalStorageValue);
  };

  return (
    <div>
      <Link to={ type === 'food' ? `/foods/${id}` : `/drinks/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="cardImage"
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'food' ? nationality : alcoholicOrNot}
        {' '}
        -
        {' '}
        {category}
      </p>
      <button
        type="button"
        onClick={ () => handleShare(type === 'food' ? `/foods/${id}` : `/drinks/${id}`) }
      >
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share"
        />
      </button>
      <button type="button" onClick={ handleFavorite }>
        <img
          src={ favoriteIcon }
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="favorite"
          id={ id }
        />
      </button>
      {
        isCopied && <p>Link copied!</p>
      }
    </div>
  );
}

FavoriteRecipeContainer.propTypes = {
  recipe: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
