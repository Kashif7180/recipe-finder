import React from "react";

const RecipeModal = ({ recipe, onClose }) => {
  // ✅ Collect ingredients + measures into an array
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h2>{recipe.strMeal}</h2>

        {/* ✅ Badges inside modal too */}
        <div className="badges">
          {recipe.strCategory && <span className="badge category">{recipe.strCategory}</span>}
          {recipe.strArea && <span className="badge area">{recipe.strArea}</span>}
        </div>

        {/* ✅ Ingredients Table */}
        <h3>Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Measure</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item, index) => (
              <tr key={index}>
                <td>{item.ingredient}</td>
                <td>{item.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ Instructions */}
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>

        {/* ✅ YouTube link */}
        {recipe.strYoutube && (
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            📺 Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
  
};


export default RecipeModal;
