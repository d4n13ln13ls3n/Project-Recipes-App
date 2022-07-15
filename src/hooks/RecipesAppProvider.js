import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import fetchFood from '../services/fetchFood';
import fetchDrink from '../services/fetchDrink';

export default function RecipesAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(async () => {
    setFoods(await fetchFood('chicken'));
    setDrinks(await fetchDrink('beer'));
  }, []);

  useEffect(() => {
    console.log(drinks);
  }, [drinks]);

  const context = {
    login,
    setLogin,
    foods,
    setFoods,
    drinks,
    setDrinks,
  };

  return (
    <RecipesAppContext.Provider value={ context }>
      { children }
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
