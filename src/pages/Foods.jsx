import React, { useContext } from 'react';
import recipesAppContext from '../hooks/RecipesAppContext';
import '../css/Recipes.css';

export default function Foods() {
  const { foods } = useContext(recipesAppContext);

  return (
    <section className="foodContainer">
      {
        foods && (
          foods.map((food, index) => (
            <div
              key={ food.idMeal }
              data-testid={ `${index}-recipe-card` }
              className="foodCard"
            >
              <h3 data-testid={ `${index}-card-name` }>{food.strMeal}</h3>
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
                data-testid={ `${index}-card-img` }
                className="foodImage"
              />
            </div>
          ))
        )
      }
    </section>
  );
}
