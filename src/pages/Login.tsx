import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

const INITIAL_LOGIN = {
  email: '',
  password: '',
};

function Login() {
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState(INITIAL_LOGIN);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const data = {
      ...user,
      [name]: value,
    };
    setUser(data);

    if (isEmail(user.email) && user.password.length >= 6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  return (
    <form>
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
      <button data-testid="login-submit-btn" disabled={ disable }>Enter</button>
    </form>
  );
}

export default Login;
