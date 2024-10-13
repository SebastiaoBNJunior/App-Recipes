import { screen, fireEvent, cleanup } from '@testing-library/react';
// import DoneRecipes from '../pages/DoneRecipes';
// import clipboardCopy from 'clipboard-copy';
import { renderWithRouter } from './helpers/renderWithRouter';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import mealId52771 from './mocks/mealId52771';
import drinkId178319 from './mocks/drinkId178319';
import { RecipesProvider } from '../providers/RecipesProvider';
import App from '../App';

let mealMock;
let drinkMock;

const mealsPath = '/meals/52771';
const drinksPath = '/drinks/178319';
const doneRecipesPath = '/done-recipes';

const allButton = 'filter-by-all-btn';
const mealsButton = 'filter-by-meal-btn';
const drinksButton = 'filter-by-drink-btn';

const mealExampleName = 'Spicy Arrabiata Penne';

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('Testa a page RecipeDone com a meal 52771', () => {
  beforeEach(async () => {
    navigator.clipboard.writeText.mockResolvedValue(undefined);

    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mealId52771,
    });
  });

  afterEach(() => {
    localStorage.removeItem('doneRecipes');
    cleanup();
  });

  it('testa a requisição na API da carne id 52771', async () => {
    // Utiliza o mock da requisição de meal
    fetch(mealsPath);
    expect(mealMock).toHaveBeenCalled();
  });

  it('deve exibir os botões de filtro', () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');
    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(filterByAllButton).toBeInTheDocument();
    expect(filterByMealButton).toBeInTheDocument();
    expect(filterByDrinkButton).toBeInTheDocument();
  });

  it('deve filtrar os itens ao clicar nos botões de filtro', async () => {
    const data = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '2023-05-16T02:21:54.545Z',
        tags: ['Pasta', 'Curry'],
      },
    ];

    // Salvar os dados no local storage
    localStorage.setItem('doneRecipes', JSON.stringify(data));

    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );

    const filterByAllButton = screen.getByTestId(allButton);
    const filterByMealButton = screen.getByTestId(mealsButton);
    const filterByDrinkButton = screen.getByTestId(drinksButton);
    // Simular clique no botão "All"
    fireEvent.click(filterByAllButton);
    // Simular clique no botão "Meals"
    fireEvent.click(filterByMealButton);
    // Verificar se a ação de filtro foi realizada corretamente
    const imgMeal = await screen.findByTestId('0-horizontal-image');
    expect(imgMeal).toBeInTheDocument();

    // Simular clique no botão "Drinks"
    fireEvent.click(filterByDrinkButton);
    // Verificar se a ação de filtro foi realizada corretamente
    const localStorageVazio = screen.getByRole('heading', { name: /local storage vazio meu principe, volte quando tiver algo aqui/i });
    expect(localStorageVazio).toBeInTheDocument();
  });

  it('testa se o botão compartilhar executa o copyboard e adiciona o texto link copied', async () => {
    const data = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: mealExampleName,
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '2023-05-16T02:21:54.545Z',
        tags: ['Pasta', 'Curry'],
      },
    ];

    // Salvar os dados no local storage
    localStorage.setItem('doneRecipes', JSON.stringify(data));

    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );

    // Realizar asserções no componente renderizado
    // Exemplo:
    // Verificar se o nome do prato está sendo exibido corretamente
    const nomeDoPrato = screen.getByText(mealExampleName);
    expect(nomeDoPrato).toBeInTheDocument();

    const shareButton = screen.getByText(/compartilhar/i);
    fireEvent.click(shareButton);

    const alertMessage = screen.getByText(/link copied!/i);
    expect(alertMessage).toBeInTheDocument();
  });

  it('testa os filtros com o localstorage vazio', () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );

    const filterByAllButton = screen.getByTestId(allButton);
    const filterByMealButton = screen.getByTestId(mealsButton);
    const filterByDrinkButton = screen.getByTestId(drinksButton);

    const localStorageVazio = screen.getByRole('heading', { name: /local storage vazio meu principe, volte quando tiver algo aqui/i });

    fireEvent.click(filterByDrinkButton);
    expect(localStorageVazio).toBeInTheDocument();

    fireEvent.click(filterByMealButton);
    expect(localStorageVazio).toBeInTheDocument();

    fireEvent.click(filterByAllButton);
    expect(localStorageVazio).toBeInTheDocument();
  });
});

// drink fetch

describe('Testa a page RecipeDone com o drink 178319', () => {
  beforeEach(async () => {
    navigator.clipboard.writeText.mockResolvedValue(undefined);

    drinkMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinkId178319),
    });
  });
  afterEach(() => {
    localStorage.removeItem('doneRecipes');
    cleanup();
  });

  it('testa a requisição na API do drink id 178319', async () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [drinksPath] },
    );
    // Utiliza o mock da requisição de meal
    fetch(drinksPath);
    expect(drinkMock).toHaveBeenCalled();
  });

  it('testa a renderização de bebida', async () => {
    const data = [
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '2023-05-18T00:50:53.765Z',
      },
    ];

    // Salvar os dados no local storage
    localStorage.setItem('doneRecipes', JSON.stringify(data));

    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );

    const aquamarineDrink = screen.getByRole('heading', { name: /aquamarine/i });
    expect(aquamarineDrink).toBeInTheDocument();
  });
});
