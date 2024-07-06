import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RecipeChart = ({ recipes }) => {
  const chartData = recipes.map(recipe => ({
    name: recipe.title.length > 10 ? `${recipe.title.substring(0, 10)}...` : recipe.title, // Truncate long titles
    servings: recipe.servings
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2>Number of Servings Per Recipe</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={60} tick={{ angle: -45, textAnchor: 'end' }} interval={0}/>
          <YAxis label={{ value: 'Servings', angle: -90, position: 'insideLeft' }} />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Bar dataKey="servings" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecipeChart;
