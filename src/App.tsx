import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import MealProgress from './pages/MealProgress';
import DrinkProgress from './pages/DrinkProgress';
import Profile from './pages/Profile';
import DoneRecipies from './pages/DoneRecipies';
import FavoriteRecipies from './pages/FavoriteRecipies';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id-da-receita" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id-da-receita" element={ <RecipeDetails /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <MealProgress /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <DrinkProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipies /> } />
      <Route path="favorite-recipes" element={ <FavoriteRecipies /> } />
    </Routes>
  );
}

export default App;
