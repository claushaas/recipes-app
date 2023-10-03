import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import setLocalStorage from './helpers/setLocalStorage';
import { mockForFavoriteRecipes } from './mock/mockData';
import DoneRecipies from '../pages/DoneRecipes';

beforeEach(() => {
  window.localStorage.clear();
});

describe('Testes para a tela de receitas feitas', () => {
  test('funcionamento dos botões de filtros', async () => {
    const { user } = renderWithRouterAndRedux(<DoneRecipies />);
    const filterButtonAll = screen.getByTestId('filter-by-all-btn');
    const filterButtonMeals = screen.getByTestId('filter-by-meal-btn');
    const filterButtonDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(filterButtonAll).toBeInTheDocument();
    expect(filterButtonMeals).toBeInTheDocument();
    expect(filterButtonDrinks).toBeInTheDocument();

    await user.click(filterButtonAll);
    await user.click(filterButtonMeals);
    await user.click(filterButtonDrinks);
  });

  test('funcionamento do botão de copiar link', async () => {
    setLocalStorage('doneRecipes', mockForFavoriteRecipes);

    const { user } = renderWithRouterAndRedux(<DoneRecipies />);

    const copyButton = screen.getByTestId('0-horizontal-share-btn');

    expect(copyButton).toBeInTheDocument();

    await user.click(copyButton);
  });

  test('funcionamento do botão de copiar link', async () => {
    setLocalStorage('doneRecipes', mockForFavoriteRecipes);

    const { user } = renderWithRouterAndRedux(<DoneRecipies />);

    const copyButton = screen.getByTestId('1-horizontal-share-btn');

    expect(copyButton).toBeInTheDocument();

    await user.click(copyButton);
  });
});
