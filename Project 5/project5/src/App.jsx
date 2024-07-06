import React, { useState, useEffect } from 'react';
import './App.css';

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
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&addRecipeInformation=true`);
      if (!response.ok) {
        console.error('Network error:', response.statusText);
        return;
      }
      const data = await response.json();
      setRecipes(data.results);
    };

    fetchRecipes().catch(console.error);
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVegetarian = isVegetarian ? recipe.vegetarian : true;
    const matchesVegan = isVegan ? recipe.vegan : true;
    const matchesGlutenFree = isGlutenFree ? recipe.glutenFree : true;
    const matchesDairyFree = isDairyFree ? recipe.dairyFree : true;

    return matchesSearchQuery && matchesVegetarian && matchesVegan && matchesGlutenFree && matchesDairyFree;
  });


  const totalRecipes = filteredRecipes.length;
  const averagePrepTime = totalRecipes > 0 ? filteredRecipes.reduce((total, next) => total + (next.readyInMinutes || 0), 0) / totalRecipes : 0;
  const servings = filteredRecipes.length > 0 ? filteredRecipes.map(recipe => recipe.servings) : [0];
  const minServings = servings.length > 0 ? Math.min(...servings) : "N/A";
  const maxServings = servings.length > 0 ? Math.max(...servings) : "N/A";

  return (
    <div className="whole-page">
      <h1>Spoon-It-Up!</h1>
      <div className="summary-stats">
        <p>Total Recipes: {totalRecipes}</p>
        <p>Average Preparation Time: {averagePrepTime.toFixed(2)} minutes</p>
        <p>Servings Range: {minServings} - {maxServings}</p>
      </div>
      <div className="filters">
        <input
          className="search-input"
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={(e) => setIsVegetarian(e.target.checked)}
          /> Vegetarian
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isVegan}
            onChange={(e) => setIsVegan(e.target.checked)}
          /> Vegan
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isGlutenFree}
            onChange={(e) => setIsGlutenFree(e.target.checked)}
          /> Gluten Free
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={isDairyFree}
            onChange={(e) => setIsDairyFree(e.target.checked)}
          /> Dairy Free
        </label>
      </div>
      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
