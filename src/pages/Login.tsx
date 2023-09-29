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
    localStorage.setItem('user', JSON.stringify(email));
    navigate('/meals');
  };

  return (
    <div className="div-root">
      <div className="div-logo">
        <img className="img" src={ logo } alt="logo" />
      </div>
      <img src={ tomate } className="tomate" alt="tomate" />
      <div className="login-page">
        <form onSubmit={ handleSubmit } className="form">
          <h2 className="h2">LOGIN</h2>
          <input
            type="email"
            name="email"
            value={ user.email }
            placeholder="E-Mail"
            data-testid="email-input"
            onChange={ handleChange }
            className="input-email"
          />
          <input
            type="password"
            name="password"
            value={ user.password }
            placeholder="Password"
            data-testid="password-input"
            onChange={ handleChange }
            className="input-password"
          />
          <button
            data-testid="login-submit-btn"
            disabled={ (!(isEmail(user.email)) || user.password.length <= 6) }
            className="button"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
