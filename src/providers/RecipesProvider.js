import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const location = useLocation();
  const rotaAtual = location.pathname;
  const MAX_CATEGORIES = 5;
  const MAX_RECIPES = 12;

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      let response;
      let data;

      switch (rotaAtual) {
      case '/meals':
        response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();
        setCategories(data.meals.slice(0, MAX_CATEGORIES));
        break;
      case '/drinks':
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();
        setCategories(data.drinks.slice(0, MAX_CATEGORIES));
        break;
      default:
        break;
      }
    };
    fetchCategories();
  }, [rotaAtual]);

  const fetchRecipesByCategory = async (param) => {
    let response;
    let data;

    switch (param) {
    case '/meals':
      response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      data = await response.json();
      setRecipes(data.meals.slice(0, MAX_RECIPES));
      break;
    case '/drinks':
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      data = await response.json();
      setRecipes(data.drinks.slice(0, MAX_RECIPES));
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    fetchRecipesByCategory(rotaAtual);
  }, [rotaAtual]);

  const values = useMemo(() => ({
    recipes,
    setRecipes,
    categories,
    setCategories,
    categoryFilter,
    setCategoryFilter,
    fetchRecipesByCategory,
    id,
    setId,
  }), [
    recipes,
    setRecipes,
    categories,
    setCategories,
    categoryFilter,
    setCategoryFilter,
    id,
    setId,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      <div>{children}</div>
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
