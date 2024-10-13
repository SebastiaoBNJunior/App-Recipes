import PropTypes from 'prop-types';
import React, { createContext, useCallback, useMemo, useState } from 'react';
// import mealId52771 from '../mocks/mealId52771';

export const RecipeDetailsContext = createContext();

export function RecipeDetailsProvider({ children }) {
  const [imageSource, setImageSource] = useState('');
  const [title, setTitle] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [youtubeVideoID, setYoutubeVideoID] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [mensures, setMensures] = useState([]);
  const [alcoholic, setAlcoholic] = useState('');
  const [idFood, setIdFood] = useState();
  const [nationality, setNationality] = useState('');
  const [objectDetails, setObjectDetails] = useState({});
  const [startButton, setStartButton] = useState('Start Recipe');
  const [types, setType] = useState('');
  const [tag, setTag] = useState();

  const colectDrinkData = useCallback(async (id) => {
    // const idCyPress = 178319;
    const DRINKSURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      // Bebidas
      const resultsDrinks = await fetch(DRINKSURL);
      const dataDrinks = await resultsDrinks.json();
      if (dataDrinks.drinks === null) {
        console.log('sem bebidas nesse id');
        return;
      }
      if (dataDrinks.drinks !== null) {
        console.log('bebida nesse id:', dataDrinks.drinks[0]);
        const {
          strDrinkThumb,
          strDrink,
          strAlcoholic,
          strInstructions,
          idDrink,
          strCategory,
          strTags,
        } = dataDrinks.drinks[0];
        setCategoryText(strCategory);
        setIdFood(idDrink);
        setImageSource(strDrinkThumb);
        setTitle(strDrink);
        setAlcoholic(strAlcoholic);
        setInstructionsText(strInstructions);
        setType('drink');
        setTag(strTags);

        // coletar ingredientes da api de carnes
        const limitAPI = 15;
        const arrayIngredients = [];
        const arrayMensures = [];
        for (let i = 1; i <= limitAPI; i += 1) {
          const keyIngredients = `strIngredient${i}`;
          const keyMensures = `strMeasure${i}`;
          if (dataDrinks.drinks[0][keyIngredients]) {
            arrayIngredients.push(dataDrinks.drinks[0][keyIngredients]);
            arrayMensures.push(dataDrinks.drinks[0][keyMensures]);
          }
        }
        setIngredients(arrayIngredients);
        setMensures(arrayMensures);
      }
    } catch (error) {
      console.log('sem bebidas nesse id', error);
    }
  }, []);

  const colectMealData = useCallback(async (id) => {
    // const idCyPress = 52771;
    const MEALURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      // Comidas
      const resultsFoods = await fetch(MEALURL);
      const dataFoods = await resultsFoods.json();
      if (dataFoods.meals === null) {
        console.log('sem comida nesse id');
        return;
      }
      if (dataFoods.meals !== null) {
        console.log('comida nesse id:', dataFoods.meals[0]);
        const { strMealThumb, strMeal, strCategory, strInstructions,
          strYoutube, idMeal, strArea, strTags } = dataFoods.meals[0];
        setIdFood(idMeal);
        setNationality(strArea);
        setImageSource(strMealThumb);
        setTitle(strMeal);
        setCategoryText(strCategory);
        setInstructionsText(strInstructions);
        setType('meal');
        setTag(strTags);

        // id dos videos do youtube
        const regex = /v=([^&]+)/;
        const match = strYoutube.match(regex);
        const videoId = match[1];
        setYoutubeVideoID(videoId);

        // coletar ingredientes da api de carnes
        const limitAPI = 20;
        const arrayIngredients = [];
        const arrayMensures = [];
        for (let i = 1; i <= limitAPI; i += 1) {
          const keyIngredients = `strIngredient${i}`;
          const keyMensures = `strMeasure${i}`;
          if (dataFoods.meals[0][keyIngredients]) {
            arrayIngredients.push(dataFoods.meals[0][keyIngredients]);
            arrayMensures.push(dataFoods.meals[0][keyMensures]);
          }
        }
        setIngredients(arrayIngredients);
        setMensures(arrayMensures);
      }
    } catch (error) {
      console.log('caiu no catch - erro:', error);
    }
  }, []);

  const setMealObject = useCallback(() => {
    const objectMeal = [{ // aqui deve ter um array de objeto
      alcoholicOrNot: '',
      category: categoryText,
      id: idFood,
      image: imageSource,
      name: title,
      nationality,
      type: 'meal',
    }];
    setObjectDetails(objectMeal);
  }, [idFood, title, imageSource, categoryText, nationality, setObjectDetails]);

  const setDrinkObject = useCallback(() => {
    const drinkObject = [{ // aqui deve ter um array de objeto
      alcoholicOrNot: alcoholic,
      category: categoryText,
      id: idFood,
      image: imageSource,
      name: title,
      nationality: '',
      type: 'drink',
    }];
    setObjectDetails(drinkObject);
  }, [idFood, title, imageSource, categoryText, alcoholic, setObjectDetails]);

  const values = useMemo(() => ({
    imageSource,
    setImageSource,
    title,
    setTitle,
    categoryText,
    setCategoryText,
    instructionsText,
    setInstructionsText,
    youtubeVideoID,
    setYoutubeVideoID,
    ingredients,
    setIngredients,
    mensures,
    setMensures,
    alcoholic,
    setAlcoholic,
    idFood,
    setIdFood,
    nationality,
    setNationality,
    objectDetails,
    setObjectDetails,
    setMealObject,
    setDrinkObject,
    colectDrinkData,
    colectMealData,
    startButton,
    setStartButton,
    types,
    tag,
  }), [
    imageSource, setImageSource,
    title, setTitle,
    categoryText, setCategoryText,
    instructionsText, setInstructionsText,
    youtubeVideoID, setYoutubeVideoID,
    ingredients, setIngredients,
    mensures, setMensures,
    alcoholic, setAlcoholic,
    idFood, setIdFood,
    nationality, setNationality,
    objectDetails, setObjectDetails,
    setMealObject, setDrinkObject,
    colectDrinkData, colectMealData,
    startButton, setStartButton,
    types, tag,
  ]);

  return (
    <RecipeDetailsContext.Provider value={ values }>
      <div>{children}</div>
    </RecipeDetailsContext.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
