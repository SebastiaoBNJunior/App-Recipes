import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import { RecipesProvider } from '../providers/RecipesProvider';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import { AppProvider } from '../providers/AppProvider';

describe('Iniciando teste Recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
  });
  it('Verifica se o fetch foi chamado na rota meals', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it('Testa se os cards são carregados na rota meals', async () => {
    await waitFor(() => {
      const firstCardMeals = screen.getByRole('button', { name: /foto corba/i });
      expect(firstCardMeals).toBeInTheDocument();
    });
  });
});

describe('Iniciando teste Recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
  });
  it('Verifica se o fetch foi chamado na rota drink', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it('Testa se os cards são carregados na rota drink', async () => {
    await waitFor(() => {
      const firstCardDrink = screen.getByRole('button', { name: /foto gg/i });
      expect(firstCardDrink).toBeInTheDocument();
    });
  });
});
