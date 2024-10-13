import React, { useContext } from 'react';
import { RecipesContext } from '../providers/RecipesProvider';
import Card from '../components/Card';
import styles from './Recipes.module.css';
import SearchButtons from '../components/SeachButtons';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Recipes() {
  const { recipes } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <SearchButtons />
      <div className={ styles.flex }>
        {recipes.length > 0 && recipes.map((recipe, index) => (
          <Card
            key={ recipe.idMeal ? recipe.idMeal : recipe.idDrink }
            index={ index }
            recipe={ recipe }
            data-testid={ `${index}-card-img` }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
