# Project: "Bark Summit conference"

### Description:

**Bark Summit** is a fictional event website created as a personal learning project to gain first-hand experience with Bootstrap 5.

The main focus was exploring how to structure and build a responsive website using Bootstrap's layout system, components, and utilities.

This project is for educational/demo purposes only:

> 🐶 No dogs were harmed. No data was fetched. No forms were submitted.

**Live demo:**  
🔗 [Bark Summit](https://irynamatsiuk.github.io/projects/barksummit/index.html)

### ✨ Features

- Fully responsive layout using **Bootstrap 5**
- Dynamically loaded partials (`navbar`, `footer`, `hero`, `agenda`, etc.)
- Working carousel initialized after dynamic load
- Modal with accessibility considerations (focus/inert fix)

### How It Works

- Each section (hero, about, agenda, pricing...) is saved in a separate HTML file.
- `script.js` uses a custom `data-include` attribute to dynamically fetch and inject these files into `index.html`.
- Bootstrap JS (carousel, modal) is manually initialized after injection to ensure behavior works correctly.

## 📦 Technologies

- [Bootstrap 5](https://getbootstrap.com/)
- HTML5
- JavaScript (ES6+)
- GitHub Pages (for hosting)
