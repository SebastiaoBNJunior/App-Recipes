import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();
  const userLogin = () => {
    if (localStorage.getItem('user')) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      return localUser.email;
    } return '';
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h5 data-testid="profile-email">{userLogin()}</h5>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
