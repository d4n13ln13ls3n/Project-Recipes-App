import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import useFoodsAndDrinks from '../hooks/useFoodsAndDrinks';
import useFilter from '../hooks/useFilter';

export default function RecipesAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [filters, setFilters] = useState({ recipesLimit: 12 });
  const [renderItems, setRenderItems] = useState(false);

  // hooks costumizados, o useFoodsAndDrinks ele faz a requisição das comidas e bebidas
  // e o useFilter ele filtra as comidas e bebidas basiadas na seleção do usuário
  const [foods, drinks] = useFoodsAndDrinks();
  const [filteredFoods, filteredDrinks] = useFilter(foods, drinks, filters);

  const context = {
    login,
    setLogin,
    foods,
    filteredFoods,
    drinks,
    filteredDrinks,
    filters,
    setFilters,
    renderItems,
    setRenderItems,
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
