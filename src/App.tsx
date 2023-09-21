import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import MealProgress from './pages/MealProgress';
import DrinkProgress from './pages/DrinkProgress';
import Profile from './pages/Profile';
import DoneRecipies from './pages/DoneRecipies';
import FavoriteRecipies from './pages/FavoriteRecipies';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/meals/:id-da-receita" element={ <MealDetails /> } />
      <Route path="/drinks/:id-da-receita" element={ <DrinkDetails /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <MealProgress /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <DrinkProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipies /> } />
      <Route path="favorite-recipes" element={ <FavoriteRecipies /> } />
    </Routes>
  );
}

export default App;
