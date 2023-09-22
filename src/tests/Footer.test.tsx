import { screen } from '@testing-library/react';
import App from '../App';

import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';

describe('Teste do componente Footer', () => {
  test('Se o Footer aparece na tela', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');

    const meal = screen.getByRole('img', {
      name: /meal icon/i,
    });

    expect(meal).toBeInTheDocument();

    const drink = screen.getByRole('img', {
      name: /drink icon/i,
    });

    expect(drink).toBeInTheDocument();

    await user.click(drink);

    const drinkText = screen.getByRole('heading', {
      name: /drinks/i,
    });
    expect(drinkText).toBeInTheDocument();

    await user.click(meal);

    const mealText = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(mealText).toBeInTheDocument();
  });
});
