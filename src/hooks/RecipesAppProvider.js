import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });

  const context = {
    login,
    setLogin,
  };

  return (
    <RecipesAppContext.Provider value={ context }>
      { children }
    </RecipesAppContext.Provider>
  );
}

export default RecipesAppProvider;

RecipesAppProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};
