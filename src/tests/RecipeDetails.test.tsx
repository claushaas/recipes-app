import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';
import { mockForRecipeInProgress, mockForDrinkInProgress } from './mock/mockData';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testes da página RecipeInProgress', () => {
  test('Se a página contém os elementos corretos renderizando uma Meal', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockForRecipeInProgress,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    renderWithRouterAndRedux(<App />, '/meals/52771');
    const loading = screen.getByText('Loading...');

    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      const recipePhoto = screen.getByTestId('recipe-photo');
      expect(recipePhoto).toBeInTheDocument();
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toBeInTheDocument();
      const shareButton = screen.getByTestId('share-btn');
      expect(shareButton).toBeInTheDocument();
      const favoriteButton = screen.getByTestId('favorite-btn');
      expect(favoriteButton).toBeInTheDocument();
      const recipeCategory = screen.getByTestId('recipe-category');
      expect(recipeCategory).toBeInTheDocument();
      const instructions = screen.getByTestId('instructions');
      expect(instructions).toBeInTheDocument();
    });

    screen.debug();
  });

  test('Se a página contém os elementos corretos renderizando uma Drink', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockForDrinkInProgress,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    renderWithRouterAndRedux(<App />, '/drinks/17222');
    const loading = screen.getByText('Loading...');

    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      const recipePhoto = screen.getByTestId('recipe-photo');
      expect(recipePhoto).toBeInTheDocument();
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toBeInTheDocument();
      const shareButton = screen.getByTestId('share-btn');
      expect(shareButton).toBeInTheDocument();
      const favoriteButton = screen.getByTestId('favorite-btn');
      expect(favoriteButton).toBeInTheDocument();
      const recipeCategory = screen.getByTestId('recipe-category');
      expect(recipeCategory).toBeInTheDocument();
      const instructions = screen.getByTestId('instructions');
      expect(instructions).toBeInTheDocument();
    });

    screen.debug();
  });
});
