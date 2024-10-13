import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './IngredientStep.module.css';

export default function IngredienteStep(props) {
  const [check, setCheck] = useState(false);
  const { index,
    ingredient,
    measure, type,
    id,
    setStatusRecipe,
    totalProgress } = props;

  useEffect(() => {
    const { haveProgress } = props;
    setCheck(haveProgress);
  }, [props]);

  const saveProgress = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const firstRecipe = { meals: {}, drinks: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(firstRecipe));
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const attProgress = {
        ...progress,
        [type]: { [id]: [index] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(attProgress));
    } else {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const attProgress = {
        ...progress,
        [type]: { [id]: [...progress[type][id], index] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(attProgress));
      setStatusRecipe(attProgress[type][id].length === totalProgress);
    }
    setCheck(!check);
  };
  return (

    <label
      className={ check ? styles.complete : undefined }
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ `check-${index}` }
    >
      <input
        type="checkbox"
        id={ `check-${index}` }
        checked={ check }
        onChange={ () => saveProgress() }
      />

      {`${ingredient} ${measure}`}

    </label>

  );
}

IngredienteStep.propTypes = {
  index: PropTypes.string,
  ingredient: PropTypes.string,
  measure: PropTypes.string,
}.isRequired;
