import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeChart from '../Components/RecipeChart';
import { Link } from 'react-router-dom';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isDairyFree, setIsDairyFree] = useState(false);
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const fetchRecipes = async () => {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&addRecipeInformation=true`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };

    fetchRecipes();
  }, [API_KEY]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (value, setter) => {
    setter(value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVegetarian = isVegetarian ? recipe.vegetarian : true;
    const matchesVegan = isVegan ? recipe.vegan : true;
    const matchesGlutenFree = isGlutenFree ? recipe.glutenFree : true;
    const matchesDairyFree = isDairyFree ? recipe.dairyFree : true;
    return matchesSearchQuery && matchesVegetarian && matchesVegan && matchesGlutenFree && matchesDairyFree;
  });

  const totalRecipes = filteredRecipes.length;
  const averagePrepTime = totalRecipes > 0
    ? filteredRecipes.reduce((acc, recipe) => acc + recipe.readyInMinutes, 0) / totalRecipes
    : 0;

  return (
    <div className="whole-page">
      <h1>Spoon-It-Up!</h1>
      <div className="summary-stats">
        <p>Total Recipes: {totalRecipes}</p>
        <p>Average Preparation Time: {averagePrepTime.toFixed(2)} minutes</p>
      </div>
      <div className="filters">
        <input
          className="search-input"
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={(e) => handleCheckboxChange(e.target.checked, setIsVegetarian)}
          /> Vegetarian
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isVegan}
            onChange={(e) => handleCheckboxChange(e.target.checked, setIsVegan)}
          /> Vegan
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isGlutenFree}
            onChange={(e) => handleCheckboxChange(e.target.checked, setIsGlutenFree)}
          /> Gluten Free
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isDairyFree}
            onChange={(e) => handleCheckboxChange(e.target.checked, setIsDairyFree)}
          /> Dairy Free
        </label>
      </div>
      {recipes.length > 0 ? (
        <RecipeChart recipes={filteredRecipes} />
      ) : (
        <p>Loading charts...</p>
      )}
      <div className="recipes-list">
        {filteredRecipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none' }}>
            <div className="recipe">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
