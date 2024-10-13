import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { localStorageUser } from './mocks/localStorageUser';

describe('Testa a tela de Perfil', () => {
  it('Verifica se o emial do usuário está salvo no local Storage', async () => {
    localStorage.setItem('user', JSON.stringify(localStorageUser));
    rendeWithRouter(<App />, { initialEntries: ['/profile'] });

    expect(screen.getByRole('heading', { name: /anita/i, level: 5 })).toBeInTheDocument();
  });

  it('Verifica se ao clicar no bortão Done Recipes a tela é redirecionada para a rota /done-recipes', () => {
    const { history } = rendeWithRouter(<App />, { initialEntries: ['/profile'] });

    const btnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(btnDoneRecipes).toBeInTheDocument();
    userEvent.click(btnDoneRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  it('Verifica se ao clicar no bortão Favorite Recipes a tela é redirecionada para a rota /done-recipes', () => {
    const { history } = rendeWithRouter(<App />, { initialEntries: ['/profile'] });

    const btnFavoriteRecipes = screen.getByRole('button', { name: /Favorite recipes/i });
    expect(btnFavoriteRecipes).toBeInTheDocument();
    userEvent.click(btnFavoriteRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('Verifica se ao clicar no bortão Logout a tela é redirecionada para a rota /', () => {
    localStorage.setItem('user', JSON.stringify(localStorageUser));
    const { history } = rendeWithRouter(<App />, { initialEntries: ['/profile'] });

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
