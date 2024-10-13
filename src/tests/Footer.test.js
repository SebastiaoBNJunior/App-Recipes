import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testando componente Footer', () => {
  it('Verifica se ao clicar no ícone de comida a tela é redirecionada para "/meals"', () => {
    const { history } = rendeWithRouter(<Profile />);
    const mealsIcon = screen.getByRole('img', { name: /mealIcon/i });
    expect(mealsIcon).toBeInTheDocument();
    userEvent.click(mealsIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });

  it('Verifica se ao clicar no ícone de bebida a tela é redirecionada para "/drinks"', () => {
    const { history } = rendeWithRouter(<Profile />);
    const drinkIcon = screen.getByRole('img', { name: /drinkIcon/i });
    expect(drinkIcon).toBeInTheDocument();
    userEvent.click(drinkIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
});
