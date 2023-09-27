import { screen } from '@testing-library/react';
import App from '../App';

import renderWithRouterAndRedux from './helpers/renderWithReduxAndRouter';

describe('Teste do componente Header', () => {
  test('Se o Header Aparece na tela', async () => {
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

    const profileButton = screen.getByRole('button', {
      name: /perfil/i,
    });
    expect(profileButton).toBeInTheDocument();

    await user.click(profileButton);

    const profileHeading = screen.getByRole('img', {
      name: /perfil/i,
    });

    expect(profileHeading).toBeInTheDocument();
  });
});
