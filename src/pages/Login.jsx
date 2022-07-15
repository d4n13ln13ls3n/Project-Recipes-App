import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesAppContext from '../hooks/RecipesAppContext';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { setLogin } = useContext(RecipesAppContext);

  const handleChange = ({ target: { name, value } }) => {
    setLoginData((oldState) => ({ ...oldState, [name]: value }));
  };

  const history = useHistory();

  const handleSubmit = () => {
    setLogin(loginData);
    localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));

    history.push('/foods');
  };

  const isActiveButton = () => {
    const minLength = 7;
    const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/; // regex baseado na solução vista nesse vídeo: https://www.youtube.com/watch?v=QxjAOSUQjP0
    return loginData
      .password.length >= minLength && emailRegex.test(loginData.email);
  };

  return (
    <form>
      <label htmlFor="email-input">
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !isActiveButton() }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
