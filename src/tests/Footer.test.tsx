import { screen } from '@testing-library/react';
import App from '../App';

import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';

test('Testa se o footer aparece na tela', async () => {
  renderWithRouterAndRedux(<App />, '/profile');

  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();
});

test('Testa a presença do ícone de Drinks e do H1 na tela devida', async () => {
  const { user } = renderWithRouterAndRedux(<App />, '/profile');
  const drink = screen.getByTestId('drinks-bottom-btn');
  expect(drink).toBeInTheDocument();
  await user.click(drink);
  const drinksH1 = screen.getByRole('heading', {
    name: /drinks/i,
  });
  expect(drinksH1).toBeInTheDocument();
});
test('Testa a presença do ícone de Meals e do H1 na tela devida', async () => {
  const { user } = renderWithRouterAndRedux(<App />, '/profile');
  const meal = screen.getByTestId('meals-bottom-btn');
  expect(meal).toBeInTheDocument();
  await user.click(meal);
  const mealsH1 = screen.getByRole('heading', {
    name: /meals/i,
  });
  expect(mealsH1).toBeInTheDocument();
});
