export const fetchMealsIngredient = async (ingredient) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await data.json();
  return result;
};

export const fetchMealsNameSearch = async (name) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await data.json();
  return result;
};

export const fetchMealsFirstLetter = async (firstLetter) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const result = await data.json();
  return result;
};

export const fetchDrinksIngredient = async (ingredient) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await data.json();
  return result;
};

export const fetchDrinksNameSearch = async (name) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await data.json();
  return result;
};

export const fetchDrinksFirstLetter = async (firstLetter) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const result = await data.json();
  return result;
};

export const fetchMealsById = async (id) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await data.json();
  return result;
};

export const fetchDrinksById = async (id) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await data.json();
  return result;
};
