import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Recipelist from "./components/Recipelist.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ShoppingList from "./components/ShoppingList.jsx";
import HistoryList from "./components/HistoryList.jsx";
import Timer from "./components/Timer.jsx";
import AboutModal from "./components/AboutModal.jsx";


const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewCounts, setViewCounts] = useState(() => {
    const saved = localStorage.getItem("viewCounts");
    return saved ? JSON.parse(saved) : {};
  });

  // Filter helper to remove Beef and Pork
  const filterRestrictedItems = (meals) => {
    if (!meals) return [];
    return meals.filter(meal => {
      const name = meal.strMeal.toLowerCase();
      const cat = meal.strCategory ? meal.strCategory.toLowerCase() : "";

      return !name.includes("beef") &&
        !name.includes("pork") &&
        !cat.includes("beef") &&
        !cat.includes("pork");
    });
  };



  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setError("");
      setShowFavoritesOnly(false);
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      const res = await fetch(url);
      const data = await res.json();

      const filtered = filterRestrictedItems(data.meals);
      setRecipes(filtered);

      if (filtered.length === 0) setError("No recipes found (or restricted). 😢");
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (category) => {
    if (category === "All") {
      fetchRecipes("");
      return;
    }
    if (category === "Beef" || category === "Pork") {
      setError("This category is not available.");
      setRecipes([]);
      return;
    }



    try {
      setLoading(true);
      setError("");
      setShowFavoritesOnly(false);
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const res = await fetch(url);
      const data = await res.json();

      const filtered = filterRestrictedItems(data.meals);
      setRecipes(filtered);

      if (filtered.length === 0) setError("No recipes found. 😢");
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomRecipe = async () => {
    try {
      setLoading(true);
      setError("");
      setShowFavoritesOnly(false);

      let validRecipe = null;
      let attempts = 0;

      while (!validRecipe && attempts < 5) {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();

        if (data.meals && data.meals.length > 0) {
          const potentialRecipe = data.meals[0];
          const filtered = filterRestrictedItems([potentialRecipe]);
          if (filtered.length > 0) {
            validRecipe = filtered[0];
          }
        }
        attempts++;
      }

      if (validRecipe) {
        setRecipes([validRecipe]);
        handleRecipeSelect(validRecipe);
      } else {
        setError("Could not find a recipe. Please try again!");
      }

    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const addToShoppingList = (item) => {
    if (!shoppingList.includes(item)) {
      setShoppingList((prev) => {
        const newList = [...prev, item];
        localStorage.setItem("shoppingList", JSON.stringify(newList));
        return newList;
      });
      alert(`Added ${item} to shopping list! 🛒`);
    } else {
      alert(`${item} is already in your list!`);
    }
  };

  const removeFromShoppingList = (index) => {
    setShoppingList((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      localStorage.setItem("shoppingList", JSON.stringify(newList));
      return newList;
    });
  };

  const clearShoppingList = () => {
    if (window.confirm("Clear your entire shopping list?")) {
      setShoppingList([]);
      localStorage.removeItem("shoppingList");
    }
  };

  const clearHistory = () => {
    if (window.confirm("Clear your viewing history?")) {
      setHistory([]);
      localStorage.removeItem("history");
    }
  };

  const handleRecipeSelect = async (recipe) => {
    let fullRecipe = recipe;
    if (!recipe.strInstructions) {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          fullRecipe = data.meals[0];
        }
      } catch (err) {
        console.error("Error fetching full recipe details:", err);
      }
    }

    setSelectedRecipe(fullRecipe);

    // History Logic
    setHistory(prev => {
      const filtered = prev.filter(h => h.idMeal !== fullRecipe.idMeal);
      const newHist = [fullRecipe, ...filtered].slice(0, 10);
      localStorage.setItem("history", JSON.stringify(newHist));
      return newHist;
    });

    setViewCounts((prev) => {
      const newCounts = { ...prev, [fullRecipe.idMeal]: (prev[fullRecipe.idMeal] || 0) + 1 };
      localStorage.setItem("viewCounts", JSON.stringify(newCounts));
      return newCounts;
    });
  };

  const showFavorites = () => {
    setShowFavoritesOnly(true);
    setError("");
  };

  useEffect(() => {
    fetchRecipes("paneer");
  }, []);

  const displayedRecipes = showFavoritesOnly
    ? recipes.filter((recipe) => favorites.includes(recipe.idMeal))
    : recipes;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <h1>🍲 Recipe Finder</h1>
        <div className="header-controls">
          <button
            className={`favorites-btn ${showFavoritesOnly ? "active" : ""}`}
            onClick={showFavorites}
            title="View Favorites"
          >
            ❤️ {favorites.length}
          </button>
          <button
            className="favorites-btn"
            onClick={() => setShowShoppingList(true)}
            title="Shopping List"
          >
            🛒 {shoppingList.length}
          </button>
          <button
            className="favorites-btn"
            onClick={() => setShowHistory(true)}
            title="History"
          >
            📜
          </button>
          <button
            className="favorites-btn"
            onClick={() => setShowAbout(true)}
            title="About App"
            style={{ fontWeight: 900 }}
          >
            ℹ️
          </button>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="main-content">
        <SearchBar onSearch={fetchRecipes} onRandom={fetchRandomRecipe} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            if (cat === "Beef" || cat === "Pork") return;
            setSelectedCategory(cat);
            fetchByCategory(cat);
          }}
        />

        {loading && <div className="spinner"></div>}
        {!loading && error && <p className="no-results">{error}</p>}
        {!loading && !error && displayedRecipes.length === 0 && showFavoritesOnly && (
          <p className="no-results">No favorites yet! ❤️ Add some recipes to your favorites.</p>
        )}
        {!loading && !error && displayedRecipes.length > 0 && (
          <Recipelist
            recipes={displayedRecipes}
            onSelect={handleRecipeSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            viewCounts={viewCounts}
          />
        )}

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            isFavorite={favorites.includes(selectedRecipe.idMeal)}
            onToggleFavorite={() => toggleFavorite(selectedRecipe.idMeal)}
            viewCount={viewCounts[selectedRecipe.idMeal] || 0}
            onAddToShoppingList={addToShoppingList}
          />
        )}

        {showShoppingList && (
          <ShoppingList
            items={shoppingList}
            onRemove={removeFromShoppingList}
            onClose={() => setShowShoppingList(false)}
            onClear={clearShoppingList}
          />
        )}

        {showHistory && (
          <HistoryList
            history={history}
            onSelect={(recipe) => {
              handleRecipeSelect(recipe);
              setShowHistory(false);
            }}
            onClose={() => setShowHistory(false)}
            onClear={clearHistory}
          />
        )}

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

        <Timer />
      </main>

      <footer className="footer">
        <p>Made with ❤️ by <strong>Syed Kashif Rizvi</strong></p>
      </footer>
    </div>
  );
};

export default App;