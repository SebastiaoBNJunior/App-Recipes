import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockDrinks, mockMeals } from './mocks/mocksRecipeInProgress';

const MEALS = '/meals/52771/in-progress';
const DRINKS = '/drinks/178319/in-progress';

global.alert = jest.fn();
describe('Testetando tela de receita em progresso', () => {
  it('Verifica se um fetch foi realizado', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockMeals,
    }));
    rendeWithRouter(<App />, { initialEntries: [MEALS] });
    expect(global.fetch).toBeCalledTimes(1);
  });
  it('Verifica se as informações da receita da comida foi rendenrizada corretamente ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockMeals,
    }));
    const { history } = rendeWithRouter(<App />);
    act(() => {
      history.push(MEALS);
    });
    const mealsThumb = screen.getByTestId('recipe-photo');
    const mealsTitle = screen.getByTestId('recipe-title');
    const mealsTag = screen.getByTestId('recipe-category');
    const mealsInstructions = screen.getByTestId('instructions');
    const btns = screen.getAllByRole('button');
    await waitFor(() => {
      expect(mealsThumb.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
      expect(mealsTitle).toHaveTextContent('Spicy Arrabiata Penne');
      expect(mealsTag).toHaveTextContent('Pasta,Curry');
      expect(mealsInstructions.innerHTML).toBe('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    });
    expect(btns).toHaveLength(3);
  });
  it('Verifica se as informações da receita de bebidas foi rendenrizada corretamente ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockDrinks,
    }));
    const { history } = rendeWithRouter(<App />);
    act(() => {
      history.push(DRINKS);
    });
    const drinksThumb = screen.getByTestId('recipe-photo');
    await waitFor(() => {
      expect(drinksThumb).toBeInTheDocument();
      expect(drinksThumb.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    });
  });
  it.todo('Verifica se os ingredientes foram redenrizados e se marcar o checkbox o ingrediente e riscado');
});
