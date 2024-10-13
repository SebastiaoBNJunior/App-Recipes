import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './style/ShareAndFavoriteBtns.css';
import shareIcon from '../images/shareIcon.svg';
import { AppContext } from '../providers/AppProvider';
import LinkCopiedMessage from './LinkCopiedMessage';

/* Imagens importadas */
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function ShareAndFavoriteBtns({ recipe }) {
  const contextValue = useContext(AppContext);
  const { statusLinkCopied } = contextValue;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let favoriteExist = false;

    if (getFavorite && recipe[0]) {
      if (recipe[0].id) {
        favoriteExist = getFavorite
          .some((favorite) => favorite.id === recipe[0].id);
      } else {
        favoriteExist = false;
      }
    }

    if (favoriteExist) {
      setIsFavorite(true);
    }
  }, [recipe]);

  const handleClick = (event) => {
    event.preventDefault();

    const { name } = event.target;
    const { setStatusLinkCopied } = contextValue;

    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')); // array de objetos(receitas favoritadas)

    if (name === 'shareBtn') {
      // lógica do botão compartilhar
      const pageLink = window.location.href;
      copy(pageLink);
      setStatusLinkCopied(true);
    }

    if (name === 'favoriteBtn' && getFavoriteRecipes) {
      // lógica do botão favoritar
      const objectFound = getFavoriteRecipes.some((recipeFound) => recipeFound
        .id === recipe[0].id); // verifica se o objeto já existe na lista

      if (objectFound === false) {
        // caso o objeto ainda não exista no localStorage
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...getFavoriteRecipes, ...recipe]));
        setIsFavorite(true);
      } else {
        // remove o objeto caso já exista na lista
        localStorage.removeItem('favoriteRecipes');
        setIsFavorite(false);
      }
    } else if (name === 'favoriteBtn') {
      // caso o objeto já exista no localStorage
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <section className="ContainerBtns">
        <label className="ShareBtnLabel">
          <input
            data-testid="share-btn"
            className="ShareBtnInput"
            type="button"
            name="shareBtn"
            src={ shareIcon }
            onClick={ handleClick }
          />
          <img
            className="ShareBtnIcon"
            src={ shareIcon }
            alt="ícone de compartilhar"
          />
        </label>
        <span>
          {
            isFavorite ? (
              <label className="FavoriteBtnLabel">
                <input
                  type="button"
                  value=""
                  src={ blackHeart }
                  className="FavoriteBtnInput"
                  onClick={ handleClick }
                  name="favoriteBtn"
                  data-testid="favorite-btn"
                />
                <img
                  src={ blackHeart }
                  className="FavoriteBtnIcon"
                  alt="pequeno coração preto, indicando que a receita está favoritada"
                />
              </label>
            )
              : (
                <label className="FavoriteBtnLabel">
                  <input
                    type="button"
                    value=""
                    src={ whiteHeart }
                    className="FavoriteBtnInput"
                    onClick={ handleClick }
                    name="favoriteBtn"
                    data-testid="favorite-btn"
                  />
                  <img
                    src={ whiteHeart }
                    className="FavoriteBtnIcon"
                    alt="pequeno coração vazio,
                      indicando que a receita não está favoritada"
                  />
                </label>
              )
          }
        </span>
      </section>

      {/* Mensagem exibida no click do botão share */}
      {
        statusLinkCopied === true ? (
          <LinkCopiedMessage />
        )
          : null
      }
    </div>
  );
}

ShareAndFavoriteBtns.propTypes = {
  recipe: propTypes.shape({
    idFood: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    imageSource: propTypes.string.isRequired,
    categoryText: propTypes.string.isRequired,
    instructionsText: propTypes.string.isRequired,
    youtubeVideoID: propTypes.string.isRequired,
    alcoholic: propTypes.string.isRequired,
  }).isRequired || ({
    idFood: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    imageSource: propTypes.string.isRequired,
    categoryText: propTypes.string.isRequired,
    instructionsText: propTypes.string.isRequired,
    youtubeVideoID: propTypes.string.isRequired,
    nationality: propTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default ShareAndFavoriteBtns;
