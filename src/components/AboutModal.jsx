import React from 'react';

const AboutModal = ({ onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content about-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="about-header-section">
                    <h2>🍲 Recipe Finder</h2>
                    <p className="app-version">v2.0 • Premium Edition</p>
                </div>

                <div className="about-body">
                    <section className="about-app">
                        <h3>🚀 About The Project</h3>
                        <p>
                            <strong>Recipe Finder</strong> is your ultimate smart cooking companion.
                            Designed to solve the "what should I cook?" dilemma, it provides instant access to thousands of recipes from around the world (with a special love for Indian cuisine!).
                        </p>
                        <div className="features-grid">
                            <div className="feature-item">🔎 <span>Smart Search</span></div>
                            <div className="feature-item">👨‍🍳 <span>Cook Mode</span></div>
                            <div className="feature-item">🗣️ <span>Voice Assist</span></div>
                            <div className="feature-item">⏱️ <span>Timer</span></div>
                        </div>
                    </section>

                    <section className="about-dev">
                        <h3>👨‍💻 The Developer</h3>
                        <div className="dev-card">
                            <div className="dev-info">
                                <h4>Syed Kashif Rizvi</h4>
                                <p>Full Stack Developer</p>
                            </div>
                        </div>
                        <p className="dev-desc">
                            Built with a passion for clean code and beautiful UI.
                            Powered by <strong>React.js</strong> and <strong>TheMealDB API</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
