import React from 'react';
import PropTypes from 'prop-types';
// import Filters from './Filters';
import Loading from './Loading';
import '../css/Recipes.css';

export default function MapRecipes({ filteredRecipe, id, name, thumb }) {
  return (
    <div>
      {/* <Filters /> */}
      <section className="recipeContainer">
        <h1>Recipe Container</h1>
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
      </section>
    </div>
  );
}

MapRecipes.propTypes = {
  filteredRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};
