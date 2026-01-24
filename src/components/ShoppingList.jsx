import React from 'react';

const ShoppingList = ({ items, onRemove, onClose, onClear }) => {
    return (
        <div className="shopping-list-overlay" onClick={onClose}>
            <div className="shopping-list-content" onClick={(e) => e.stopPropagation()}>
                <div className="shopping-header">
                    <h2>🛒 Shopping List</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {items.length === 0 ? (
                    <p className="empty-list">Your list is empty. Add ingredients from recipes!</p>
                ) : (
                    <>
                        <ul className="shopping-items">
                            {items.map((item, index) => (
                                <li key={index} className="shopping-item">
                                    <span>{item}</span>
                                    <button onClick={() => onRemove(index)} className="remove-btn">🗑️</button>
                                </li>
                            ))}
                        </ul>
                        <button className="clear-btn" onClick={onClear}>Clear All</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShoppingList;
