import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import DoneRecipies from '../pages/DoneRecipes';
import FavoriteRecipies from '../pages/FavoriteRecipes';
import Login from '../pages/Login';

test('testes da pagina de Profile', async () => {
  renderWithRouterAndRedux(<Profile />);

  const h2 = screen.getByTestId('profile-email');
  const buttonDone = screen.getByTestId('profile-done-btn');
  const buttonFavorite = screen.getByTestId('profile-favorite-btn');
  const buttonLogout = screen.getByTestId('profile-logout-btn');

  expect(h2).toBeInTheDocument();
  expect(buttonDone).toBeInTheDocument();
  expect(buttonFavorite).toBeInTheDocument();
  expect(buttonLogout).toBeInTheDocument();

  await userEvent.click(buttonDone);
  renderWithRouterAndRedux(<DoneRecipies />);

  await userEvent.click(buttonFavorite);
  renderWithRouterAndRedux(<FavoriteRecipies />);

  await userEvent.click(buttonLogout);
  renderWithRouterAndRedux(<Login />);
});
