import React from 'react';

const HistoryList = ({ history, onSelect, onClose, onClear }) => {
    return (
        <div className="shopping-list-overlay" onClick={onClose}>
            <div className="shopping-list-content history-content" onClick={(e) => e.stopPropagation()}>
                <div className="shopping-header">
                    <h2>📜 Recently Viewed</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {history.length === 0 ? (
                    <p className="empty-list">No history yet. Start exploring!</p>
                ) : (
                    <>
                        <ul className="shopping-items">
                            {history.map((recipe, index) => (
                                <li key={index} className="shopping-item history-item" onClick={() => onSelect(recipe)}>
                                    <div className="history-info">
                                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="history-thumb" />
                                        <span>{recipe.strMeal}</span>
                                    </div>
                                    <span className="arrow">➔</span>
                                </li>
                            ))}
                        </ul>
                        <button className="clear-btn" onClick={onClear}>Clear History</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default HistoryList;
