import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { setLogin } = useContext(RecipesAppContext);

  const handleChange = ({ target: { name, value } }) => {
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    setLogin(loginData);
    localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  };

  const isActiveButton = () => {
    const minLength = 7;
    // regex baseado na solução vista nesse vídeo: https://www.youtube.com/watch?v=QxjAOSUQjP0
    const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    return (
      loginData.password.length >= minLength && emailRegex.test(loginData.email)
    );
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
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleSubmit }
          disabled={ !isActiveButton() }
        >
          Enter
        </button>
      </Link>
    </form>
  );
}
