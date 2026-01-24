import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ onSearch, onRandom }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 1) {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
        const data = await res.json();
        setSuggestions(data.meals ? data.meals.slice(0, 5) : []); // Limit to 5
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.strMeal);
    onSearch(suggestion.strMeal);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          placeholder="Search for recipes..."
          onChange={handleInputChange}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
        />
        <button type="submit">Search</button>
        <button type="button" className="random-btn" onClick={onRandom} title="Surprise Me!">🎲</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((meal) => (
            <div
              key={meal.idMeal}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(meal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <span>{meal.strMeal}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
