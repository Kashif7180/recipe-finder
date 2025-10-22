import React from "react";

const RecipeCard = ({ recipe, onSelect }) => {
  return (
    <div className="recipe-card" onClick={() => onSelect(recipe)}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      
      {/* ✅ Badges */}
      <div className="badges">
        {recipe.strCategory && <span className="badge category">{recipe.strCategory}</span>}
        {recipe.strArea && <span className="badge area">{recipe.strArea}</span>}
      </div>
    </div>
  );
};

export default RecipeCard;
