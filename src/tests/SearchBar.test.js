import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWithRouter';
import { RecipesProvider } from '../providers/RecipesProvider';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import App from '../App';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Recipes from '../pages/Recipes';

const card0 = '0-recipe-card';
const card1 = '1-recipe-card';
const card2 = '2-recipe-card';
const card3 = '3-recipe-card';
const card4 = '4-recipe-card';
const card5 = '5-recipe-card';
const card6 = '6-recipe-card';
const card7 = '7-recipe-card';
const card8 = '8-recipe-card';
const card9 = '9-recipe-card';
const card10 = '10-recipe-card';
const card11 = '11-recipe-card';

const testidbtnSearch = 'exec-search-btn';

describe('Testando componente SearchBar', () => {
  it('Verifica se ao pesquisar comidas pelo ingrendiente a busca é feita corretamente"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealsByIngredient),
    });
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <RecipeDetailsProvider>
            <Recipes />
          </RecipeDetailsProvider>
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    expect(radioIngredient).toBeInTheDocument();
    const btnSearch = screen.getByTestId(testidbtnSearch);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    userEvent.type(inputSearch, 'milk');
    userEvent.click(radioIngredient);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
    expect(await screen.findByTestId(card4)).toBeInTheDocument();
    expect(await screen.findByTestId(card5)).toBeInTheDocument();
    expect(await screen.findByTestId(card6)).toBeInTheDocument();
    expect(await screen.findByTestId(card7)).toBeInTheDocument();
    expect(await screen.findByTestId(card8)).toBeInTheDocument();
    expect(await screen.findByTestId(card9)).toBeInTheDocument();
    // expect(await screen.findByTestId(card10)).toBeInTheDocument();
    // expect(await screen.findByTestId(card11)).toBeInTheDocument();
  });

  it('Verifica se ao pesquisar comidas pelo nome a busca é feita corretamente"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (beefMeals),
    });
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
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'beef');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
    expect(await screen.findByTestId(card4)).toBeInTheDocument();
    expect(await screen.findByTestId(card5)).toBeInTheDocument();
    expect(await screen.findByTestId(card6)).toBeInTheDocument();
    expect(await screen.findByTestId(card7)).toBeInTheDocument();
    expect(await screen.findByTestId(card8)).toBeInTheDocument();
    expect(await screen.findByTestId(card9)).toBeInTheDocument();
    expect(await screen.findByTestId(card10)).toBeInTheDocument();
    expect(await screen.findByTestId(card11)).toBeInTheDocument();
  });

  it('Verifica se ao pesquisar bebidas pelo ingrendiente a busca é feita corretamente"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinksByIngredient),
    });
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
      history.push('/drinks');
    });
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    expect(radioIngredient).toBeInTheDocument();
    const btnSearch = screen.getByTestId(testidbtnSearch);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    userEvent.type(inputSearch, 'orange');
    userEvent.click(radioIngredient);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
  });

  it('Verifica se ao pesquisar bebidas pelo nome a busca é feita corretamente"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (cocoaDrinks),
    });
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
      history.push('/drinks');
    });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'lemon');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
  });

  it('Verifica se ao pesquisar pela comida, encontrando somente uma o usuário é redirecionado para a tela de detalhes da receita"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (oneMeal),
    });
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
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52771');
    });
  });

  it('Verifica se ao pesquisar pela bebida, encontrando somente uma o usuário é redirecionado para a tela de detalhes da receita"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (oneDrink),
    });
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
      history.push('/drinks');
    });

    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    });
  });

  it('Verifica se ao pesquisar pela comida digitando mais de uma letra, a pesquisa é feita somente pelo primeiro caracter', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (beefMeals),
    });
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
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'beef');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
    expect(await screen.findByTestId(card4)).toBeInTheDocument();
    expect(await screen.findByTestId(card5)).toBeInTheDocument();
    expect(await screen.findByTestId(card6)).toBeInTheDocument();
    expect(await screen.findByTestId(card7)).toBeInTheDocument();
    expect(await screen.findByTestId(card8)).toBeInTheDocument();
    expect(await screen.findByTestId(card9)).toBeInTheDocument();
    expect(await screen.findByTestId(card10)).toBeInTheDocument();
  });

  it('Verifica se ao pesquisar pela bebida digitando mais de uma letra, a pesquisa é feita somente pelo primeiro caracter', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (cocoaDrinks),
    });
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
      history.push('/drinks');
    });
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'beef');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
  });

  it('Verifica se ao pesquisar (na rota /meals)por apenas uma letra digitando mais de um caracter, se a busca é feita considerando somente a primeira letra"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (beefMeals),
    });
    global.alert = jest.fn();
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
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'beef');
    userEvent.click(radioFirstLetter);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
    expect(await screen.findByTestId(card4)).toBeInTheDocument();
    expect(await screen.findByTestId(card5)).toBeInTheDocument();
    expect(await screen.findByTestId(card6)).toBeInTheDocument();
    expect(await screen.findByTestId(card7)).toBeInTheDocument();
    expect(await screen.findByTestId(card8)).toBeInTheDocument();
    expect(await screen.findByTestId(card9)).toBeInTheDocument();
    expect(await screen.findByTestId(card10)).toBeInTheDocument();
    expect(await screen.findByTestId(card11)).toBeInTheDocument();
  });

  it('Verifica se (na rota /drinks) ao pesquisar por apenas uma letra digitando mais de um caracter, se a busca é feita considerando somente a primeira letra"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (cocoaDrinks),
    });
    global.alert = jest.fn();
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
      history.push('/drinks');
    });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = screen.getByRole('textbox');
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'lemon');
    userEvent.click(radioFirstLetter);
    userEvent.click(btnSearch);

    expect(await screen.findByTestId(card0)).toBeInTheDocument();
    expect(await screen.findByTestId(card1)).toBeInTheDocument();
    expect(await screen.findByTestId(card2)).toBeInTheDocument();
    expect(await screen.findByTestId(card3)).toBeInTheDocument();
  });
});
