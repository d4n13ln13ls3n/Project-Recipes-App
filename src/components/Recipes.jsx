import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import '../css/Recipes.css';

export default function Recipes({ filteredRecipe, id, name, thumb }) {
  return (
    <main className="recipeContainer">
      {
        filteredRecipe.length ? (
          filteredRecipe.map((recipe, index) => (
            <div
              key={ recipe[id] }
              data-testid={ `${index}-recipe-card` }
              className="recipeCard"
            >
              <h3 data-testid={ `${index}-card-name` }>{recipe[name]}</h3>
              <img
                src={ recipe[thumb] }
                alt={ recipe[name] }
                data-testid={ `${index}-card-img` }
                className="recipeImage"
              />
            </div>
          ))
        ) : <Loading />
      }
    </main>
  );
}

Recipes.propTypes = {
  filteredRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};
