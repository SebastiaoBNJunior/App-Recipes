import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchMealsIngredient,
  fetchMealsNameSearch,
  fetchMealsFirstLetter,
  fetchDrinksIngredient,
  fetchDrinksNameSearch,
  fetchDrinksFirstLetter,
} from '../hooks/useFetch';
import { RecipesContext } from '../providers/RecipesProvider';

const MAX_RECIPES = 12;

function SearchBar() {
  const { setRecipes } = useContext(RecipesContext);

  const [searchInput, setSearchInput] = useState('');
  const [radioSearch, setRadioSearch] = useState(null);
  const history = useHistory();
  const { pathname } = history.location;

  const searchMeals = async () => {
    let data = [];
    let inputArray = [];

    switch (radioSearch) {
    case 'ingredient':
      data = await fetchMealsIngredient(searchInput);
      break;
    case 'name':
      data = await fetchMealsNameSearch(searchInput);
      break;
    case 'firstLetter':
      inputArray = searchInput.split('');
      data = await fetchMealsFirstLetter(inputArray[0]);
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      data = { meals: null };
    }

    if (data.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.meals.length === 1) {
      history.push(`/meals/${data.meals[0].idMeal}`);
    } else {
      setRecipes(data.meals.slice(0, MAX_RECIPES));
    }
  };

  const searchDrinks = async () => {
    let data = [];
    let inputArray = [];

    switch (radioSearch) {
    case 'ingredient':
      data = await fetchDrinksIngredient(searchInput);
      break;
    case 'name':
      data = await fetchDrinksNameSearch(searchInput);
      break;
    case 'firstLetter':
      inputArray = searchInput.split('');
      data = await fetchDrinksFirstLetter(inputArray[0]);
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      data = { drinks: null };
    }

    if (data.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    } else {
      setRecipes(data.drinks.slice(0, MAX_RECIPES));
    }
  };

  const handleClickSearch = () => {
    if (pathname === '/meals') {
      searchMeals();
    } else {
      searchDrinks();
    }
  };

  return (
    <form>
      <input
        name="searchInput"
        value={ searchInput }
        data-testid="search-input"
        placeholder="Search"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label>
        Ingredient
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setRadioSearch(target.value) }
        />
      </label>
      <label>
        Name
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target }) => setRadioSearch(target.value) }
        />
      </label>
      <label>
        First letter
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ ({ target }) => setRadioSearch(target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClickSearch }
      >
        Search
      </button>
    </form>
  );
}
export default SearchBar;
