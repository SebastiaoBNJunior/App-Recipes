import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Testando tela de Login', () => {
  it('Verifica se existe um input email, um input para senha e um botão "Enter" desabilitado', () => {
    rendeWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnEnter).toBeInTheDocument();
  });
  it('Verifica se botão é habilitado ao preencher email e senha validos', () => {
    rendeWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'bode@behhh.com');
    userEvent.type(inputPassword, '1234567');
    expect(btnEnter).toBeEnabled();
  });
  it('Verifica se ao clicar no botão a tela é redirecionada para "/meals"', () => {
    const { history } = rendeWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'bode@behhh.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
