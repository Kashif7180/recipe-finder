import React, { useState, useEffect } from "react";

const RecipeModal = ({ recipe, onClose, isFavorite, onToggleFavorite, viewCount, onAddToShoppingList }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCookMode, setIsCookMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.strMeal,
          text: `Check out this recipe: ${recipe.strMeal}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(`${recipe.strMeal} - ${window.location.href}`);
      alert("Recipe link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakText(recipe.strInstructions);
    }
  };

  const instructionsList = recipe.strInstructions
    ? recipe.strInstructions.split(/\r\n|\n/).filter(line => line.trim() !== "")
    : [];

  // Cook Mode Logic
  const handleNextStep = () => {
    if (currentStep < instructionsList.length - 1) {
      setCurrentStep(curr => curr + 1);
      setIsSpeaking(false);
      window.speechSynthesis.cancel();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
      setIsSpeaking(false);
      window.speechSynthesis.cancel();
    }
  };

  const toggleStepRead = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakText(instructionsList[currentStep]);
    }
  };

  if (isCookMode) {
    return (
      <div className="cook-mode-overlay">
        <div className="cook-mode-header">
          <h2>👨‍🍳 Cook Mode: {recipe.strMeal}</h2>
          <button className="exit-cook-btn" onClick={() => setIsCookMode(false)}>Exit</button>
        </div>

        <div className="cook-step-content">
          <div className="step-indicator">Step {currentStep + 1} of {instructionsList.length}</div>
          <p className="step-text">{instructionsList[currentStep]}</p>
        </div>

        <div className="cook-controls">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="nav-step-btn"
          >
            ⬅️ Prev
          </button>

          <button
            onClick={toggleStepRead}
            className={`speak-step-btn ${isSpeaking ? "speaking" : ""}`}
          >
            {isSpeaking ? "🔇 Stop" : "🔊 Read Step"}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStep === instructionsList.length - 1}
            className="nav-step-btn"
          >
            Next ➡️
          </button>
        </div>

        <div className="cook-progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep + 1) / instructionsList.length) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-actions">
          <button
            className={`modal-favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={onToggleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "❤️ Saved" : "🤍 Save"}
          </button>
          <button className="modal-share-btn" onClick={handleShare} title="Share recipe">
            🔗 Share
          </button>
          <button className="modal-print-btn" onClick={handlePrint} title="Print recipe">
            🖨️ Print
          </button>
          <button
            className={`modal-speak-btn ${isSpeaking ? "speaking" : ""}`}
            onClick={handleSpeak}
            title="Read Instructions"
          >
            {isSpeaking ? "🔇 Stop" : "🔊 Listen"}
          </button>
          <button
            className="cook-mode-trigger-btn"
            onClick={() => setIsCookMode(true)}
            title="Enter Focused Cook Mode"
          >
            👨‍🍳 Cook Mode
          </button>
        </div>

        {viewCount > 0 && (
          <div className="modal-view-count">
            👁️ Viewed {viewCount} {viewCount === 1 ? "time" : "times"}
          </div>
        )}

        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h2>{recipe.strMeal}</h2>

        <div className="badges">
          {recipe.strCategory && <span className="badge category">{recipe.strCategory}</span>}
          {recipe.strArea && <span className="badge area">{recipe.strArea}</span>}
        </div>

        <h3>Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Measure</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item, index) => (
              <tr key={index}>
                <td>{item.ingredient}</td>
                <td>{item.measure}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="add-shop-btn"
                    onClick={() => onAddToShoppingList(`${item.measure} ${item.ingredient}`)}
                    title="Add to Shopping List"
                  >
                    🛒
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Instructions</h3>
        <div className="instructions-checklist">
          {instructionsList.map((step, idx) => (
            <label key={idx} className="instruction-step">
              <input type="checkbox" />
              <span>{step}</span>
            </label>
          ))}
        </div>

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
