import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import * as APIModule from '../services/searchAPI';

import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import mockData from './mock/mockData';

// beforeEach(() => {

// });

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Teste do componente SearchBar', () => {
  test('Se a pesquisa por ingrediente funciona para meals', async () => {
    vi.spyOn(APIModule, 'searchMealsAPI').mockResolvedValue(mockData);

    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    const heading = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(heading).toBeInTheDocument();

    const searchButton = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    expect(searchButton).toBeInTheDocument();
    await user.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    await user.type(searchInput, 'chicken');

    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    expect(ingredientRadio).toBeInTheDocument();
    await user.click(ingredientRadio);

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    expect(searchButton2).toBeInTheDocument();
    await user.click(searchButton2);

    const firstMealCard = screen.getByTestId('0-card-name');
    expect(firstMealCard).toBeInTheDocument();
  });

  test('Se a pesquisa por primeira letra falha com mais de uma letra', async () => {
    vi.spyOn(window, 'alert');

    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    const heading = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(heading).toBeInTheDocument();

    const searchButton = screen.getByRole('button', {
      name: /pesquisar/i,
    });
    expect(searchButton).toBeInTheDocument();
    await user.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    await user.type(searchInput, 'chicken');

    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    expect(firstLetterRadio).toBeInTheDocument();
    await user.click(firstLetterRadio);

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    expect(searchButton2).toBeInTheDocument();
    await user.click(searchButton2);

    expect(window.alert).toHaveBeenCalled();

    // screen.debug();
  });
});
