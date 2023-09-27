import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id" element={ <MealDetails /> } />
      <Route path="/drinks/:id" element={ <DrinkDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
