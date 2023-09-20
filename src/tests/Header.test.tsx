import { screen } from '@testing-library/react';
import App from '../App';

import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';

describe('Teste do componente Header', () => {
  test('Se o Header Aparece na tela', () => {
    renderWithRouterAndRedux(<App />, '/meals');

    const heading = screen.getByRole('heading', {
      name: /meals/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
