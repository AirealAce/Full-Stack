import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailView = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const API_KEY = import.meta.env.VITE_APP_API_KEY;
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setRecipeDetails(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {recipeDetails && (
        <div>
          <h1>{recipeDetails.title}</h1>
          <img src={recipeDetails.image} alt={recipeDetails.title} />
          <p>Preparation time: {recipeDetails.readyInMinutes} minutes</p>
          <p>Servings: {recipeDetails.servings}</p>
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
        </div>
      )}
    </div>
  );
};

export default DetailView;
