# 🍲 Recipe Finder - Advanced Recipe Search & Cooking Assistant

A **feature-rich, production-ready React web application** for discovering recipes with an interactive cooking experience. Built with modern web technologies and deployed on Vercel with optimized mobile performance.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://skr-recipe-finder.vercel.app)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🌟 Live Demo

**🚀 [Visit Recipe Finder](https://skr-recipe-finder.vercel.app)**

---

## ✨ Features

### 🔍 **Smart Recipe Discovery**
- **Advanced Search:** Search recipes by name or ingredient with real-time API integration
- **Category Filters:** Browse by cuisine categories (Italian, Indian, Chinese, Seafood, Vegetarian, etc.)
- **Random Recipe Generator:** Discover new meals with a single click
- **Content Filtering:** Automatic filtering for dietary preferences

### ❤️ **Personal Recipe Management**
- **Favorites System:** Save your favorite recipes with one-click, persisted in localStorage
- **Browsing History:** Track last 10 viewed recipes with thumbnails
- **View Counter:** See how many times you've viewed each recipe

### 👨‍🍳 **Interactive Cooking Experience**
- **Cook Mode:** Immersive step-by-step cooking interface with large text and minimal distractions
- **Voice Synthesis:** Hands-free cooking with text-to-speech for instructions (Web Speech API)
- **Progress Tracking:** Visual progress bar showing cooking completion
- **Step Navigation:** Easy Previous/Next buttons for seamless cooking flow

### 🛒 **Kitchen Management Tools**
- **Shopping List:** Add ingredients directly from recipes with one-click
- **Smart Checklist:** Interactive instruction checklist to mark completed steps
- **Integrated Timer:** Built-in kitchen timer for precise cooking control

### 🎨 **Premium UI/UX**
- **Glassmorphism Design:** Modern frosted-glass aesthetic with gradient backgrounds
- **Dark/Light Mode:** Seamless theme switching with persisted preferences
- **Smooth Animations:** Micro-interactions, hover effects, and gradient shifts
- **Fully Responsive:** Optimized for mobile, tablet, and desktop with adaptive layouts
- **Mobile Performance:** Disabled heavy backdrop-filters on mobile for smooth 60fps scrolling

### 🌐 **Additional Features**
- **YouTube Integration:** Direct links to video tutorials for each recipe
- **Share Function:** Native Web Share API support with clipboard fallback
- **Print-Friendly:** Recipe print functionality for offline use
- **About Modal:** App information and developer credits

---

## 🏗️ Tech Stack

- **Frontend Framework:** React 19.1.1 with Hooks (useState, useEffect)
- **Build Tool:** Vite 7.1.6 for lightning-fast development
- **Styling:** Modern CSS3 with glassmorphism, gradients, and animations
- **API Integration:** RESTful API consumption from [TheMealDB](https://www.themealdb.com/api.php)
- **Browser APIs:** Web Speech API, Web Share API, LocalStorage
- **Deployment:** Vercel with CI/CD pipeline
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
recipe-finder/
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search input with random recipe
│   │   ├── CategoryFilter.jsx     # Category filter buttons
│   │   ├── Recipelist.jsx         # Recipe grid container
│   │   ├── RecipeCard.jsx         # Individual recipe card
│   │   ├── RecipeModal.jsx        # Detailed recipe modal
│   │   ├── ShoppingList.jsx       # Shopping list modal
│   │   ├── HistoryList.jsx        # Recently viewed modal
│   │   ├── Timer.jsx              # Kitchen timer widget
│   │   └── AboutModal.jsx         # About section
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global styles
├── public/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kashif7180/recipe-finder.git
   cd recipe-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 Usage

1. **Search Recipes:** Type any meal name or ingredient in the search bar
2. **Browse Categories:** Click on category buttons to filter by cuisine type
3. **View Recipe Details:** Click any recipe card to see full details
4. **Save Favorites:** Click the heart icon to add/remove from favorites
5. **Start Cooking:** Use "Cook Mode" for step-by-step guided cooking with voice
6. **Manage Ingredients:** Add items to shopping list and use the timer
7. **Track History:** View your recently browsed recipes

---

## 🔑 Key Components

### **App.jsx**
- Central state management for recipes, favorites, history, and theme
- API fetch logic with error handling and loading states
- LocalStorage integration for data persistence

### **RecipeModal.jsx**
- Full recipe details with ingredients table
- Cook Mode with voice synthesis
- Shopping list integration
- Share and print functionality

### **Timer.jsx**
- Draggable kitchen timer widget
- Configurable minutes and seconds
- Audio notification on completion

---

## 🎨 Design Highlights

- **Color Palette:** Vibrant gradients (purple, pink, orange, teal)
- **Typography:** Inter & Outfit Google Fonts
- **Animations:** Gradient shifts, card floats, button hovers, modal transitions
- **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation
- **Performance:** Lazy loading, optimized re-renders, mobile-first CSS

---

## 🚀 Deployment

This project is deployed on **Vercel** with automatic deployments from the main branch.

**Live URL:** [https://skr-recipe-finder.vercel.app](https://skr-recipe-finder.vercel.app)

To deploy your own version:
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📸 Screenshots

### Light Mode
![Recipe Finder Light Mode](https://via.placeholder.com/800x400?text=Recipe+Finder+Light+Mode)

### Dark Mode
![Recipe Finder Dark Mode](https://via.placeholder.com/800x400?text=Recipe+Finder+Dark+Mode)

### Cook Mode
![Cook Mode](https://via.placeholder.com/800x400?text=Cook+Mode)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is licensed under the MIT License. Feel free to use it for learning or personal projects.

---

## 👨‍💻 Developer

**Syed Mohd Kashif Rizvi**

- Portfolio: [Coming Soon]
- GitHub: [@Kashif7180](https://github.com/Kashif7180)
- LinkedIn: [Syed Mohd Kashif Rizvi](https://linkedin.com/in/syed-mohd-kashif-rizvi-835492286)
- Email: kashif.cricfan@gmail.com

---

## 🙏 Acknowledgments

- **API:** [TheMealDB](https://www.themealdb.com/) for providing the free recipe API
- **Icons:** Emoji icons for clean, lightweight UI
- **Fonts:** Google Fonts (Inter, Outfit)
- **Deployment:** Vercel for seamless hosting

---

## 📝 Changelog

### v2.0 (Latest)
- ✅ Added Cook Mode with voice synthesis
- ✅ Integrated kitchen timer
- ✅ Shopping list functionality
- ✅ Browse history tracking
- ✅ Mobile performance optimization
- ✅ Enhanced glassmorphism UI

### v1.0
- ✅ Initial release with search and favorites
- ✅ Dark mode toggle
- ✅ Responsive design

---

**⭐ If you like this project, please give it a star on GitHub!**
