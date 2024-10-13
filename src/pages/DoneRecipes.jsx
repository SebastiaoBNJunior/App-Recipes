import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Footer from '../components/Footer';
import LinkCopiedMessage from '../components/LinkCopiedMessage';
import { AppContext } from '../providers/AppProvider';

export default function DoneRecipes() {
  const [LocalStorage, setLocalStorage] = useState([]);
  const { statusLinkCopied } = useContext(AppContext);

  const FilterAllButton = (clickedButton) => {
    if (clickedButton === 'All') {
      const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      console.log('botão All clickado, resetando filtros...', getLocalStorage);
      setLocalStorage(getLocalStorage);
    }

    if (clickedButton === 'meals') {
      const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      const mealStorage = getLocalStorage.filter((each) => each.type === 'meal');
      console.log('botão Meals clickado');
      console.log('mealsStorage ->', mealStorage);
      setLocalStorage(mealStorage);
    }

    if (clickedButton === 'drinks') {
      const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      const drinkStorage = getLocalStorage.filter((each) => each.type === 'drink');
      console.log('botão Drinks clickado');
      console.log('Drinks Storage ->', drinkStorage);
      setLocalStorage(drinkStorage);
    }
  };

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    console.log('teu local storage inicialmente:', getLocalStorage);
    setLocalStorage(getLocalStorage);
  }, []);

  return (
    <div className="ContainerRecipeDetails">
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => FilterAllButton('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => FilterAllButton('meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => FilterAllButton('drinks') }
      >
        Drinks
      </button>
      {
        statusLinkCopied === true ? (
          <LinkCopiedMessage />
        )
          : null
      }
      <div>
        {
          LocalStorage.length > 0 ? (LocalStorage.map((each, index) => (
            each.type === 'meal' ? (
              <CardDoneRecipes
                key={ each + index }
                name={ each.name }
                image={ each.image }
                nationality={ each.nationality }
                category={ each.category }
                doneDate={ each.doneDate }
                index={ index }
                tag={ each.tags }
                type={ each.type }
                id={ each.id }
              />
            ) : (
              <CardDoneRecipes
                key={ each + index }
                name={ each.name }
                image={ each.image }
                nationality={ each.nationality }
                category={ each.category }
                doneDate={ each.doneDate }
                index={ index }
                tag={ each.tags }
                alcoholicOrNot={ each.alcoholicOrNot }
                type={ each.type }
                id={ each.id }
              />
            )
          ))
          ) : (
            <h1> LOCAL STORAGE VAZIO MEU PRINCIPE, VOLTE QUANDO TIVER ALGO AQUI </h1>
          )
        }
      </div>
      <Footer />
    </div>
  );
}
