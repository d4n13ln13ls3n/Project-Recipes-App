import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import '../css/Login.css';
import iconEmail from '../images/loginEmailIcon.svg';
import iconPassword from '../images/loginPasswordIcon.svg';
import chefIcon from '../images/chefIcon.svg';

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
    <div className="loginContainer">
      <div className="loginContent">
        <img src={ chefIcon } alt="chef icon" className="loginIcon" />
        <h1>Login</h1>
        <form className="loginForm">
          <label htmlFor="email-input" className="loginInput">
            <img src={ iconEmail } alt="email icon" />
            <input
              id="email-input"
              placeholder="Your Email"
              type="email"
              data-testid="email-input"
              name="email"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password-input" className="loginInput">
            <img src={ iconPassword } alt="password icon" />
            <input
              id="password-input"
              placeholder="Your Password"
              type="password"
              data-testid="password-input"
              name="password"
              autoComplete="on"
              onChange={ handleChange }
            />
          </label>
          <Link to="/foods">
            <button
              type="button"
              data-testid="login-submit-btn"
              onClick={ handleSubmit }
              disabled={ !isActiveButton() }
              className="loginButton"
            >
              LOGIN
            </button>
          </Link>
        </form>
        <Link to="/" className="loginSignUp">
          create account (sign up) ➜
        </Link>
      </div>
    </div>
  );
}
