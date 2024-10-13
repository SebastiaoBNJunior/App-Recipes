import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ShareAndFavoriteBtns from '../components/ShareAndFavoriteBtns';
import YoutubeEmbed from '../components/YoutubeEmbed';
import CarouselRecommendations from '../components/CarouselRecommendations';

import './style/fixedButton.css';
import { RecipeDetailsContext } from '../providers/RecipeDetailsProvider';

export default function RecipeDetails() {
  const [recipeDone, setRecipeDone] = useState(false);

  const {
    imageSource,
    title,
    categoryText,
    instructionsText,
    youtubeVideoID,
    ingredients,
    mensures,
    objectDetails,
    setMealObject,
    setDrinkObject,
    alcoholic,
    colectMealData,
    colectDrinkData,
    startButton,
    setStartButton,
    // idFood,
    // types,
    // tag,
    // nationality,
  } = useContext(RecipeDetailsContext);

  // definição da receita de acordo com a rota - IDs será parametro de colectMealData e ColectDrinkData;
  const location = useLocation();
  const history = useHistory();
  const actualPath = location.pathname;
  const IDs = actualPath.replace(/\D/g, '');
  console.log('id da comida:', IDs);

  const chooseAPI = useCallback(() => {
    if (actualPath.includes('/meals')) {
      colectMealData(IDs);
      setMealObject();
    }

    if (actualPath.includes('/drinks')) {
      colectDrinkData(IDs);
      setDrinkObject();
    }
  }, [actualPath,
    setMealObject,
    setDrinkObject,
    colectMealData,
    colectDrinkData,
    IDs,
  ]);

  const checkDoneLocalStorage = useCallback(() => {
    const getArrayStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getArrayStorage) {
      const Boolean = getArrayStorage.some((object) => (object.id === IDs));

      if (Boolean) {
        setRecipeDone(true);
      } else {
        setRecipeDone(false);
        console.log('cai no false', false);
      }
    }
  }, [IDs]);

  const checkInProgressLocalStorage = useCallback(() => {
    const getObjectInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (actualPath.includes('/meals') && getObjectInProgress
    && Object.keys(getObjectInProgress.meals).includes(IDs)) {
      console.log('ta aqui', getObjectInProgress.meals);
      setStartButton('Continue Recipe');
    }
    if (actualPath.includes('/drinks') && getObjectInProgress
    && Object.keys(getObjectInProgress.drinks).includes(IDs)) {
      console.log('ta aqui', getObjectInProgress.drinks);
      setStartButton('Continue Recipe');
    }
  }, [setStartButton, IDs, actualPath]);

  // Fetch na API Inicial
  useEffect(() => {
    chooseAPI();
  }, [chooseAPI]);

  // Verificação localStorage;
  useEffect(() => {
    checkDoneLocalStorage();
    checkInProgressLocalStorage();
  }, [checkInProgressLocalStorage, checkDoneLocalStorage]);

  // const mockDoneLocalStorage = () => {
  //   let tagsArray;
  //   let TwoTags;
  //   console.log(types);
  //   if (tag) {
  //     if (types === 'meal') {
  //       tagsArray = tag.split(',');
  //       TwoTags = tagsArray.slice(0, 2);
  //       console.log('cortei o array para carnes');
  //     }

  //     if (types === 'drink') {
  //       tagsArray = tag.split(',');
  //       console.log('não cortei pois é drinks');
  //     }
  //   }
  //   console.log(tagsArray || tag);

  //   const doneRecipesModel = {
  //     id: idFood,
  //     type: types,
  //     nationality,
  //     category: categoryText,
  //     alcoholicOrNot: alcoholic,
  //     name: title,
  //     image: imageSource,
  //     doneDate: new Date(),
  //     tags: TwoTags || tagsArray,
  //   };
  //     // Verifica se já existe um valor armazenado para a chave 'doneRecipes'
  //   const existingDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  //   // Adiciona a nova receita à lista existente de receitas concluídas
  //   const updatedDoneRecipes = [...existingDoneRecipes, doneRecipesModel];

  //   // Armazena a lista atualizada de receitas concluídas no localStorage
  //   localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
  // };

  // const mockInProgressLocalStorage = () => {
  //   const inProgressModel = {
  //     drinks: {
  //       // idFood: ingredients,
  //     },
  //     meals: {
  //       // idFood: ingredients,
  //     },
  //   };
  //   if (actualPath.includes('/meals')) { inProgressModel.meals[idFood] = ingredients; }
  //   if (actualPath.includes('/drinks')) { inProgressModel.drinks[idFood] = ingredients; }
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressModel));
  // };

  return (
    <div className="ContainerRecipeDetails">
      <h1>Tela de Detalhes Receitas</h1>
      <ShareAndFavoriteBtns
        recipe={ objectDetails }
      />

      <img data-testid="recipe-photo" src={ imageSource } alt="bebida img" />
      <h2 data-testid="recipe-title">
        { title }
      </h2>
      {
        alcoholic
          ? (
            <p data-testid="recipe-category">
              { alcoholic }
            </p>
          )
          : (
            <p data-testid="recipe-category">
              { categoryText }
            </p>
          )
      }
      {
        ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient + index }
          >
            {ingredient}
          </p>
        ))
      }
      {
        mensures.length > 0 && mensures.map((mensure, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ mensure + index }
          >
            { mensure }
          </p>
        ))
      }
      <p data-testid="instructions">
        { instructionsText }
      </p>
      {
        youtubeVideoID && (
          <YoutubeEmbed
            embedId={ youtubeVideoID }
          />
        )
      }
      <CarouselRecommendations />
      {
        !recipeDone && (
          <button
            data-testid="start-recipe-btn"
            className="fixedButton"
            onClick={ () => { history.push(`${actualPath}/in-progress`); } }
          >
            { startButton }
          </button>)
      }
      {/* <button onClick={ mockInProgressLocalStorage }>
        trigger localStorageInProgress test

      </button> */}
      {/* <button onClick={ mockDoneLocalStorage }>
        trigger mockDoneLocalStorage test

      </button> */}
    </div>
  );
}
