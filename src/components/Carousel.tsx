import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { fetchDrinks, fetchMeals } from '../redux/actions';
import { ReduxState } from '../types';
import CarouselCard from './CarouselCard';

function Carousel() {
  const dispatch = useDispatch();
  const isMeal = window.location.pathname.startsWith('/meals');

  const recommendationsData = useSelector((state: ReduxState) => {
    if (isMeal) {
      return state.drinks;
    }
    return state.meals;
  });

  useEffect(() => {
    if (isMeal) {
      dispatch(fetchDrinks('', 'name') as unknown as AnyAction);
    } else {
      dispatch(fetchMeals('', 'name') as unknown as AnyAction);
    }
  }, [dispatch, isMeal]);

  return (
    <div>
      {recommendationsData && recommendationsData[isMeal ? 'drinks' : 'meals'] ? (
        <div>
          {recommendationsData[isMeal ? 'drinks' : 'meals']
            .slice(0, 6).map((item, index) => (
              <CarouselCard key={ index } recipe={ item } index={ index } />
            ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Carousel;
