import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { AppContext } from '../providers/AppProvider';

const copy = require('clipboard-copy');

export default function CardDoneRecipes({
  name,
  image,
  nationality,
  category,
  doneDate,
  index,
  tag,
  alcoholicOrNot,
  type,
  id,
}) {
  const contextValue = useContext(AppContext);
  const { setStatusLinkCopied } = contextValue;
  const copyURL = () => {
    if (type === 'meal') {
      const pageLink = `http://localhost:3000/meals/${id}`;
      copy(pageLink);
      setStatusLinkCopied(true);
    }
    if (type === 'drink') {
      const pageLink = `http://localhost:3000/drinks/${id}`;
      copy(pageLink);
      setStatusLinkCopied(true);
    }
  };

  return (
    <div>
      {
        type === 'meal' ? (
          <div key={ type + index }>
            <h1>ISSO AQUI É COMIDA</h1>
            <Link to={ `/meals/${id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h2>
              <img
                src={ image }
                alt="nada com nada"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { doneDate }
            </p>
            <h1>{index}</h1>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ copyURL }
            >
              <img src={ shareIcon } alt="Ícone de compartilhamento" />
              Compartilhar
            </button>
            {
              tag
              && tag.length > 0
              && tag.map((eachTag, secondIndex) => (
                <p
                  data-testid={ `${index}-${eachTag}-horizontal-tag` }
                  key={ eachTag + secondIndex }
                >
                  { eachTag }
                </p>))
            }
          </div>)
          : (
            <div key={ type + index }>
              <h1>ISSO AQUI É BEBIDA</h1>
              <Link to={ `/drinks/${id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { name }
                </h2>
                <img
                  src={ image }
                  alt="nada com nada"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { doneDate }
              </p>
              <h1>{index}</h1>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ copyURL }
              >
                <img src={ shareIcon } alt="Ícone de compartilhamento" />
                Compartilhar
              </button>
              {
                tag
            && tag.length > 0
            && tag.map((eachTag, secondIndex) => (
              <p
                data-testid={ `${index}-${eachTag}-horizontal-tag` }
                key={ eachTag + secondIndex }
              >
                { eachTag }
              </p>
            ))
              }
            </div>
          )
      }
    </div>
  );
}

CardDoneRecipes.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  nationality: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  doneDate: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  tag: propTypes.arrayOf(propTypes.string).isRequired,
  alcoholicOrNot: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};
