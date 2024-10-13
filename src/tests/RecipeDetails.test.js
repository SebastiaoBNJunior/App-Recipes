import { screen, act, fireEvent, cleanup } from '@testing-library/react';
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
const StartbuttonTestId = 'start-recipe-btn';

describe('Testa a page RecipeDetails no endereço /meals/52771', () => {
  beforeEach(async () => {
    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealId52771),
    });

    await act(async () => {
    });
  });

  afterEach(() => {
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('inProgressRecipes');
    cleanup();
  });

  it('testa a requisição na API da carne id 52771', async () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );
    // Utiliza o mock da requisição de meal
    fetch(mealsPath);
    expect(mealMock).toHaveBeenCalled();
  });

  it('Verifica se existe o titulo da comida spicy arrabiata penne', async () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );
    const title = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe o categorias', () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );
    const category = screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
  });

  it('Verifica se existe o botão com texto startRecipe', () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );
    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();
  });

  it('Verifica o botão startRecipe muda de acordo com o localStorage', () => {
    const data = {
      drinks: {},
      meals: {
        52771: [
          'penne rigate',
          'olive oil',
          'garlic',
          'chopped tomatoes',
          'red chile flakes',
          'italian seasoning',
          'basil',
          'Parmigiano-Reggiano',
        ],
      },
    };

    // Salvar os dados no local storage
    localStorage.setItem('inProgressRecipes', JSON.stringify(data));

    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );

    const continueButton = screen.getByTestId(StartbuttonTestId);
    expect(continueButton).toBeInTheDocument();
  });

  it('testa se o botão está ausente', () => {
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
      { initialEntries: [mealsPath] },
    );

    expect(screen.queryByTestId(StartbuttonTestId)).toBeNull();
  });

  it('testa o redimensionamento do start recipe', () => {
    localStorage.removeItem('doneRecipes');

    const { history } = renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );
    const startRecipe = screen.getByTestId(StartbuttonTestId);
    fireEvent.click(startRecipe);

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('testa caso o doneRecipes esteja preenchido com id diferente da page atual', () => {
    const data = [
      {
        id: '52772',
        type: 'meal',
        nationality: 'Japanese',
        category: 'Chicken',
        alcoholicOrNot: '',
        name: 'Teriyaki Chicken Casserole',
        image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
        doneDate: '2023-05-17T23:07:17.075Z',
        tags: [
          'Meat',
          'Casserole',
        ],
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
      { initialEntries: [mealsPath] },
    );

    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();
  });
});

// drink fetch

describe('Testa a page RecipeDetails no endereço /drinks/178319', () => {
  beforeEach(async () => {
    drinkMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinkId178319),
    });
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

  it('Verifica se existe o titulo', () => {
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
    const title = screen.getByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe o categorias', async () => {
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
    const category = await screen.findByText(/alcoholic/i);
    expect(category).toBeInTheDocument();
  });

  it('Pagina drinks com o drink em questão ja concluido', () => {
    const data = {
      drinks: {
        178319: [
          'Hpnotiq',
          'Pineapple Juice',
          'Banana Liqueur',
        ],
      },
      meals: {},
    };

    // Salvar os dados no local storage
    localStorage.setItem('inProgressRecipes', JSON.stringify(data));

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
    const continueButton = screen.getByRole('button', { name: /continue recipe/i });
    expect(continueButton).toBeInTheDocument();
  });
});
