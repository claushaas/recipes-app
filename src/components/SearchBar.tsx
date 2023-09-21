// import { useLocation } from 'react-router-dom';

function SearchBar() {
  // const location = useLocation();
  // console.log(location.pathname);
  return (
    <form>
      <input type="text" name="term" id="term" data-testid="search-input" />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="ingredient"
          type="radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          id="name"
          name="name"
          type="radio"
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="firstLetter"
          type="radio"
        />
        First Letter
      </label>
      <button type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
