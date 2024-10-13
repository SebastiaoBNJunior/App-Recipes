import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { arrlen20, arrlen15 } from '../util/arrAux';
import IngredientStep from '../components/IngredientStep';
import styles from './RecipeInProgress.module.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [typeRecipe, setTypeRecipe] = useState('');
  const [listIngredients, setListIngredients] = useState([]);
  const [isMeals, setIsMeals] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);
  const [statusRecipe, setStatusRecipe] = useState(false);
  const [statusCopy, setStatusCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipeId } = useParams();
  const location = useLocation();
  const history = useHistory();

  const haveProgress = (type, typeId, index) => {
    const id = typeId ? recipe.idMeal : recipe.idDrink;
    const noProgress = false;
    return localStorage.getItem('inProgressRecipes') ? () => {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const listProgress = progress[type][id].some((item) => item === index);
      return listProgress;
    } : noProgress;
  };

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      fetch(URL).then((response) => response.json()).then((data) => {
        setIsMeals(true);
        setRecipe(data.meals[0]);
        setListIngredients(arrlen20);
        setTypeRecipe('meals');
        setTotalProgress(arrlen20
          .map((item) => recipe[`strIngredient${item}`])
          .filter((item) => item).length);
      });
    }
    if (location.pathname.includes('drinks')) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setIsMeals(false);
          setRecipe(data.drinks[0]);
          setListIngredients(arrlen15);
          setTypeRecipe('drinks');
          setTotalProgress(arrlen15
            .map((item) => recipe[`strIngredient${item}`])
            .filter((item) => item).length);
        });
    }
  }, [setRecipe, recipeId, location.pathname, recipe]);

  useEffect(() => {
    if (statusCopy) {
      const timer = 2000;
      setTimeout(() => { setStatusCopy(false); }, timer);
    }
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setIsFavorite(favoriteRecipes.some((item) => item.id === recipeId));
    }
  }, [statusCopy, recipeId]);

  const theDoneRecipe = () => {
    const date = new Date();
    const doneDate = date.toISOString();
    return {
      id: recipeId,
      type: typeRecipe.replace('s', ''),
      nationality: isMeals ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: isMeals ? '' : recipe.strAlcoholic,
      name: isMeals ? recipe.strMeal : recipe.strDrink,
      image: isMeals ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
  };
  const saveDoneRecipes = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const firstRecipe = [theDoneRecipe()];
      localStorage.setItem('doneRecipes', JSON.stringify(firstRecipe));
    } else {
      const nextRecipe = [theDoneRecipe()];
      const recipesComplete = JSON.parse(localStorage.getItem('doneRecipes'));
      const newRecipe = [...recipesComplete, nextRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newRecipe));
    }
  };
  const finishRecipe = () => {
    saveDoneRecipes();
    history.push('/done-recipes');
  };

  const shareRecipe = () => {
    const recipeLink = window.location.href.replace('/in-progress', '');
    copy(`${recipeLink}`);
    setStatusCopy(true);
  };

  const favoriteRecipe = () => ({
    id: recipeId,
    type: typeRecipe.replace('s', ''),
    nationality: isMeals ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: isMeals ? '' : recipe.strAlcoholic,
    name: isMeals ? recipe.strMeal : recipe.strDrink,
    image: isMeals ? recipe.strMealThumb : recipe.strDrinkThumb,
  }
  );

  const handleFavorite = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe()]));
    } else if (isFavorite) {
      const listFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const desFavorite = listFavorites.filter((item) => item.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(desFavorite));
    } else {
      const listFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const saveFavorite = [...listFavorites, favoriteRecipe()];
      localStorage.setItem('favoriteRecipes', JSON.stringify(saveFavorite));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <img
        className={ styles.img }
        data-testid="recipe-photo"
        src={ isMeals ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isMeals ? recipe.strMeal : recipe.strDrink }
      />

      <h2 data-testid="recipe-title">{isMeals ? recipe.strMeal : recipe.strDrink}</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
      >
        <img src={ shareIcon } alt="share" />

      </button>
      {statusCopy && (<span>Link copied!</span>)}
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => handleFavorite() }
      >
        {isFavorite
          ? (<img src={ blackHeartIcon } alt="favorite" />)
          : (<img src={ whiteHeartIcon } alt="no-favorite" />)}

      </button>
      <p data-testid="recipe-category">
        {recipe.strTags}
      </p>
      <p data-testid="instructions">
        {`${recipe.strInstructions}`}
      </p>
      <div className={ styles.container__ingredients }>
        {listIngredients.map((item, index) => {
          const ingredient = `strIngredient${item}`;
          const measure = `strMeasure${item}`;
          return recipe[ingredient]
          && (
            <IngredientStep
              key={ index }
              type={ typeRecipe }
              id={ isMeals ? recipe.idMeal : recipe.idDrink }
              haveProgress={ haveProgress(typeRecipe, isMeals, index) }
              index={ index }
              totalProgress={ totalProgress }
              setStatusRecipe={ setStatusRecipe }
              ingredient={ recipe[ingredient] }
              measure={ recipe[measure] }
            />

          );
        })}
      </div>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !statusRecipe }
        onClick={ () => finishRecipe() }
      >
        Finish Recipe

      </button>

    </div>
  );
}
