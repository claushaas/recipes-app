import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

const INITIAL_LOGIN = {
  email: '',
  password: '',
};

function Login() {
  // const [disable, setDisable] = useState(true);
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
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        name="email"
        value={ user.email }
        placeholder="E-Mail"
        data-testid="email-input"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        value={ user.password }
        placeholder="Password"
        data-testid="password-input"
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ (!(isEmail(user.email)) || user.password.length <= 6) }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
