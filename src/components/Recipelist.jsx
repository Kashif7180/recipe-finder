import React from "react";
import RecipeCard from "./RecipeCard.jsx";

const Recipelist = ({ recipes, onSelect, favorites, onToggleFavorite, viewCounts }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onSelect={onSelect}
          isFavorite={favorites.includes(recipe.idMeal)}
          onToggleFavorite={onToggleFavorite}
          viewCount={viewCounts[recipe.idMeal] || 0}
        />
      ))}
    </div>
  );
};

export default Recipelist;  