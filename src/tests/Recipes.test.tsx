import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import Recipes from '../pages/Recipes';

describe('Testes para a tela principal de receitas, quando a rota é /meals', () => {
  test('Deve renderizar o Header corretamente', () => {
    renderWithRouterAndRedux(<Recipes />, '/meals');

    const headingElement = screen.getByRole('heading', { name: /meals/i });
    const profileButton = screen.getByRole('img', { name: /perfil/i });
    const searchButton = screen.getByRole('img', { name: /pesquisar/i });

    expect(headingElement).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('Deve renderizar o Footer corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<Recipes />, '/meals');

    const buttonDrink = screen.getByRole('img', { name: /drink icon/i });
    const buttonMeal = screen.getByRole('img', { name: /meal icon/i });

    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeal).toBeInTheDocument();

    await user.click(buttonDrink);
    await user.click(buttonMeal);
  });
});

describe('Testes para a tela principal de receitas, quando a rota é /drinks', () => {
  test('Deve renderizar o Header corretamente', () => {
    renderWithRouterAndRedux(<Recipes />, '/drinks');

    const headingElement = screen.getByRole('heading', { name: /drinks/i });
    const profileButton = screen.getByRole('img', { name: /perfil/i });
    const searchButton = screen.getByRole('img', { name: /pesquisar/i });

    expect(headingElement).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('Deve renderizar o Footer corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<Recipes />, '/drinks');

    const buttonMeal = screen.getByRole('img', { name: /meal icon/i });
    const buttonDrink = screen.getByRole('img', { name: /drink icon/i });

    expect(buttonMeal).toBeInTheDocument();
    expect(buttonDrink).toBeInTheDocument();

    await user.click(buttonMeal);
    await user.click(buttonDrink);
  });
});
