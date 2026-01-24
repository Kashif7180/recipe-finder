import React from "react";

const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite, viewCount }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(recipe.idMeal);
  };

  return (
    <div className="recipe-card" onClick={() => onSelect(recipe)}>
      <div className="card-image-wrapper">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <button
          className={`favorite-icon ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        {viewCount > 0 && (
          <div className="view-count" title="Times viewed">
            👁️ {viewCount}
          </div>
        )}
      </div>
      <h3>{recipe.strMeal}</h3>

      { }
      <div className="badges">
        {recipe.strCategory && <span className="badge category">{recipe.strCategory}</span>}
        {recipe.strArea && <span className="badge area">{recipe.strArea}</span>}
      </div>
    </div>
  );
};

export default RecipeCard;

