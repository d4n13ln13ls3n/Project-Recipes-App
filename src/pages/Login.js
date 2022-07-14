import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email-input">
        <input type="email" data-testid="email-input" name="email-input" />
      </label>
      <label htmlFor="password-input">
        <input type="password" data-testid="password-input" name="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
