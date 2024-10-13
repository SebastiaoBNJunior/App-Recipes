import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWithRouter';
import { RecipesProvider } from '../providers/RecipesProvider';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import App from '../App';

describe('Testando componente Header', () => {
  it('Verifica se ao clicar no ícone de perfil a tela é redirecionada para "/profile"', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </AppProvider>
      </RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const profileIcon = screen.getByRole('img', { name: /perfil/i });
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  it('Verifica se ao clicar no ícone da lupa a abre o input de pesquisa e ao ciclar novamente ele sai da tela"', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </AppProvider>
      </RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
    const searchIcon = screen.getByRole('img', { name: /search/i });
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(inputSearch).not.toBeInTheDocument();
  });
});
