import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import '../styles/login.css';
import logo from '../images/logo-Recipes-App.png';
import tomate from '../images/tomate.png';

const INITIAL_LOGIN = {
  email: '',
  password: '',
};

function Login() {
  const [user, setUser] = useState(INITIAL_LOGIN);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const data = {
      ...user,
      [name]: value,
    };
    setUser(data);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const { email } = user;
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  return (
    <div id="div-root">
      <div id="div-logo">
        <img id="img" src={ logo } alt="logo" />
      </div>
      <img src={ tomate } id="tomate" alt="tomate" />
      <div id="login-page">
        <form onSubmit={ handleSubmit } id="form">
          <h2 id="h2">LOGIN</h2>
          <input
            type="email"
            name="email"
            value={ user.email }
            placeholder="E-Mail"
            data-testid="email-input"
            onChange={ handleChange }
            id="input-email"
          />
          <input
            type="password"
            name="password"
            value={ user.password }
            placeholder="Password"
            data-testid="password-input"
            onChange={ handleChange }
            id="input-password"
          />
          <button
            data-testid="login-submit-btn"
            disabled={ (!(isEmail(user.email)) || user.password.length <= 6) }
            id="button"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
