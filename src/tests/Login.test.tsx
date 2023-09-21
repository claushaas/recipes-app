import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import Meals from '../pages/Meals';

test('testa se os elementos estão em tela', async () => {
  renderWithRouterAndRedux(<Login />);

  const inputEmail: HTMLInputElement = screen.getByTestId('email-input');
  const inputPassword: HTMLInputElement = screen.getByTestId('password-input');
  const button: HTMLButtonElement = screen.getByTestId('login-submit-btn');

  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  expect(button.disabled).toBe(true);

  await userEvent.type(inputEmail, 'nalther@gmail.com');
  expect(inputEmail.value).toBe('nalther@gmail.com');

  await userEvent.type(inputPassword, '1231234');
  expect(inputPassword.value).toBe('1231234');

  expect(button.disabled).toBe(false);

  await userEvent.click(button);
  renderWithRouterAndRedux(<Meals />);
});
