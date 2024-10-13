import { Carousel, Row, Col } from 'react-bootstrap';
import './style/CarouselRecommendations.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function CarouselRecommendations() {
  const [items, setItems] = useState([]);

  const recommendationMeals = async () => {
    const baseURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    try {
      const results = await fetch(baseURL);
      const dataMeals = await results.json();
      console.log('carnes recomendações:', dataMeals);

      // criar item do carousel de carnes na tela de bebidas

      const limitAPI = 6;
      const itemsMeals = [];
      for (let i = 0; i < limitAPI; i += 2) {
        const meals = {
          img1: dataMeals.meals[i].strMealThumb,
          title1: dataMeals.meals[i].strMeal,
          img2: dataMeals.meals[i + 1].strMealThumb,
          title2: dataMeals.meals[i + 1].strMeal,
        };
        itemsMeals.push(meals);
      }
      console.log('eu sou o teste de items', itemsMeals);
      setItems(itemsMeals);
    } catch (error) {
      console.log(error);
    }
  };

  const recommendationDrinks = async () => {
    const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    try {
      const results = await fetch(baseURL);
      const dataDrinks = await results.json();
      console.log('bebidas recomendações:', dataDrinks);
      // criar item do carousel de bebidas na tela de carnes
      // 0, 1, 2, 3, 4, 5
      const limitAPI = 6;
      const itemsDrinks = [];
      for (let i = 0; i < limitAPI; i += 2) {
        const drink = {
          img1: dataDrinks.drinks[i].strDrinkThumb,
          title1: dataDrinks.drinks[i].strDrink,
          img2: dataDrinks.drinks[i + 1].strDrinkThumb,
          title2: dataDrinks.drinks[i + 1].strDrink,
        };
        itemsDrinks.push(drink);
      }
      console.log('eu sou o teste de items', itemsDrinks);
      setItems(itemsDrinks);
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  const actualPath = location.pathname;

  const chooseRecommendation = useCallback(() => {
    if (actualPath.includes('/meals')) {
      recommendationDrinks();
      console.log('chama drinks');
    }

    if (actualPath.includes('/drinks')) {
      recommendationMeals();
      console.log('chama carnes');
    }
  }, [actualPath]);

  useEffect(() => {
    chooseRecommendation();
  }, [chooseRecommendation]);

  return (
    <Carousel className="ifood-carousel">
      {items.length > 0 && items.map((item, index) => (
        <Carousel.Item key={ index }>
          <Row className="ifood-carousel-row">
            <Col className="ifood-carousel-col">
              <div
                className="ifood-carousel-img-container"
                data-testid={ `${index * 2}-recommendation-card` }
              >
                <img
                  className="ifood-carousel-img"
                  src={ item.img1 }
                  alt={ `Slide ${index}` }
                />
                <h5
                  data-testid={ `${index * 2}-recommendation-title` }
                >
                  {item.title1}

                </h5>
              </div>
            </Col>
            <Col className="ifood-carousel-col">
              <div
                className="ifood-carousel-img-container"
                data-testid={ `${index * 2 + 1}-recommendation-card` }
              >
                <img
                  className="ifood-carousel-img"
                  src={ item.img2 }
                  alt={ `Slide ${index}` }
                />
                <h5
                  data-testid={
                    `${index * 2 + 1}-recommendation-title`
                  }
                >
                  {item.title2}

                </h5>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselRecommendations;
