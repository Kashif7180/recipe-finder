# React + Vite
# 🍲 Recipe Finder

A **responsive React web application** that lets users search for meals and view detailed recipes using the **[TheMealDB API](https://www.themealdb.com/api.php)**. Built with React hooks, dynamic UI, and dark mode support.

---

## 🔥 Features

- **Search Recipes:** Search meals by name or ingredient.  
- **Recipe Cards:** Displays meal image, name, category, and area.  
- **Recipe Modal:** View full details including ingredients, measurements, instructions, and YouTube tutorial.  
- **API Integration:** Fetches recipes in real-time from TheMealDB.  
- **Loading & Error Handling:** Spinner and error messages when needed.  
- **Dark Mode Toggle:** Switch between light and dark themes.  
- **Responsive Design:** Works on desktop, tablet, and mobile screens.

---

## 🏗️ Project Structure

recipe-finder/
│
├─ src/
│  ├─ components/
│  │  ├─ SearchBar.jsx
│  │  ├─ Recipelist.jsx
│  │  ├─ RecipeCard.jsx
│  │  └─ RecipeModal.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ public/
├─ package.json
└─ README.md

---

## 💻 Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS  
- **API:** [TheMealDB API](https://www.themealdb.com/api.php)  
- **State Management:** React `useState` & `useEffect`  
- **Styling:** Responsive CSS with light/dark themes  

---

## ⚡ How to Run Locally

1. **Clone the repo**
```bash
git clone https://github.com/Kashif7180/recipe-finder.git
cd recipe-finder
