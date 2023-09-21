import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import Login from '../pages/Login';

test('testa se os elementos estão em tela', () => {
  render(<Login />);

  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});