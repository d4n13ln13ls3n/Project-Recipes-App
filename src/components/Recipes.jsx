import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import '../css/Recipes.css';

export default function Recipes({ filteredRecipe, id, name, thumb }) {
  console.log('filtered recipe:', filteredRecipe);
  return (
    <main className="recipeContainer">
      {
        filteredRecipe.length ? (

          filteredRecipe.map((recipe, index) => (
            <Link
              to={ recipe.idMeal
                ? `/foods/${recipe.idMeal}`
                : `/drinks/${recipe.idDrink}` }
              key={ recipe[id] }
            >
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
            </Link>
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
