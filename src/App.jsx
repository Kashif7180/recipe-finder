import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Recipelist from "./components/Recipelist.jsx";
import RecipeModal from "./components/RecipeModal.jsx";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false); // ✅ Dark mode state

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setError("");
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
      if (!data.meals) setError("No recipes found 😢");
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  return (
  <div className={`app ${darkMode ? "dark" : ""}`}>
    <header className="header">
      <h1>🍲 Recipe Finder</h1>
      <button
        className="dark-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>

    {/* ✅ main content */}
    <main className="main-content">
      <SearchBar onSearch={fetchRecipes} />

      {loading && <div className="spinner"></div>}
      {!loading && error && <p className="no-results">{error}</p>}
      {!loading && !error && (
        <Recipelist recipes={recipes} onSelect={setSelectedRecipe} />
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </main>

    {/* ✅ footer stays bottom of page, not floating */}
    <footer className="footer">
      <p>Made with ❤️ by <strong>Syed Kashif Rizvi</strong></p>
    </footer>
  </div>
);
};

export default App;