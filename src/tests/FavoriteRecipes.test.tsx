import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import FavoriteRecipies from '../pages/FavoriteRecipes';

describe('Testes para a tela de receitas favoritas', () => {
  test('Deve renderizar o Header corretamente', () => {
    renderWithRouterAndRedux(<FavoriteRecipies />);

    const headingElement = screen.getByRole('heading', { name: /favorite recipes/i });
    const profileImage = screen.getByRole('img', { name: /perfil/i });

    expect(headingElement).toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });

  test('Testes para os botões de filtro', async () => {
    const { user } = renderWithRouterAndRedux(<FavoriteRecipies />);

    const filterButtonAll = screen.getByRole('button', { name: /all/i });
    const filterButtonMeals = screen.getByRole('button', { name: /meals/i });
    const filterButtonDrinks = screen.getByRole('button', { name: /drinks/i });

    expect(filterButtonAll).toBeInTheDocument();
    expect(filterButtonMeals).toBeInTheDocument();
    expect(filterButtonDrinks).toBeInTheDocument();

    await user.click(filterButtonAll);
    await user.click(filterButtonMeals);
    await user.click(filterButtonDrinks);
  });
});
