import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:recipeId" component={ RecipeDetails } />
      <Route exact path="/drinks/:recipeId" component={ RecipeDetails } />
      <Route
        exact
        path="/meals/:recipeId/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:recipeId/in-progress"
        component={ RecipeInProgress }
      />

    </Switch>
  );
}
