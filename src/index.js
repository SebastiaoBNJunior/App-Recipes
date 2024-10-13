import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './providers/AppProvider';
import { RecipesProvider } from './providers/RecipesProvider';
import { RecipeDetailsProvider } from './providers/RecipeDetailsProvider';

import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <AppProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </AppProvider>
      </RecipesProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
