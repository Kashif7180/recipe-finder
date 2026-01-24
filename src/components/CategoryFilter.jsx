import React from "react";

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
    const categories = [
        "All",
        "Chicken",
        "Vegetarian",
        "Vegan",
        "Lamb",
        "Seafood",
        "Dessert",
        "Breakfast",
        "Pasta",
        "Starter",
        "Side"
    ];

    return (
        <div className="category-filter">
            <div className="category-scroll">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
