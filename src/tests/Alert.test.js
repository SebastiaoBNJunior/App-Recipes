import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWithRouter';
import { RecipesProvider } from '../providers/RecipesProvider';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import App from '../App';

const testidbtnSearch = 'exec-search-btn';
const AlertSorry = 'Sorry, we haven\'t found any recipes for these filters.';

describe('Testando o Alert', () => {
  it('Verifica se ao pesquisar comidas pelo primeira letra, tendo digitado mais de uma, se um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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

    userEvent.type(inputSearch, 'lemon');
    userEvent.click(radioFirstLetter);
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Verifica se ao pesquisar bebidas pela primeira letra, tendo digitado mais de uma, se um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Verifica se não encontrar nenhuma bebida um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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
    const radioname = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'bebida');
    userEvent.click(radioname);
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  });

  it('Verifica se não encontrar uma comida, pesquisando pelo ingrediente, um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'jdsksahdfefj');
    userEvent.click(radioIngredient);
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  });

  it('Verifica se não encontrar uma comida, pesquisando pelo nome, um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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
    const radioname = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'jdsksahdfeffdsfsdfj');
    userEvent.click(radioname);
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  });
  // it('Verifica se não encontrar uma bebida, pesquisando pelo ingrediente, um alert é disparado', async () => {
  //   const alertSpy = jest.spyOn(global, 'alert');
  //   const { history } = renderWithRouter(
  //     <RecipesProvider>
  //       <AppProvider>
  //         <RecipeDetailsProvider>
  //           <App />
  //         </RecipeDetailsProvider>
  //       </AppProvider>
  //     </RecipesProvider>,
  //   );
  //   act(() => {
  //     history.push('/drinks');
  //   });
  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/drinks');
  //   const searchIcon = screen.getByRole('img', { name: /search/i });
  //   userEvent.click(searchIcon);

  //   const inputSearch = screen.getByRole('textbox');
  //   const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
  //   const btnSearch = screen.getByTestId(testidbtnSearch);

  //   userEvent.type(inputSearch, 'jdsksahddfefefefj');
  //   userEvent.click(radioIngredient);
  //   userEvent.click(btnSearch);

  //   await waitFor(() => {
  //     expect(alertSpy).toBeCalled();
  //   });

  //   expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  // });

  it('Verifica se não encontrar uma bebida, pesquisando pelo nome, um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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
    const radioname = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'jdsksahdfeffdsfsdfj');
    userEvent.click(radioname);
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  });

  it('Verifica se pesquisar por uma comida sem escolher um radio, um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'beef');
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  });

  it('Verifica se pesquisar por uma bebida sem escolher um radio, um alert é disparado', async () => {
    const alertSpy = jest.spyOn(global, 'alert');
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
    const btnSearch = screen.getByTestId(testidbtnSearch);

    userEvent.type(inputSearch, 'milk');
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });

    expect(alertSpy).toHaveBeenCalledWith(AlertSorry);
  });
});
