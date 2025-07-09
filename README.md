# 🎨 Portfolio - Nono Bendi

Bienvenue sur mon portfolio personnel !  
Ce site met en valeur mes compétences, mes projets, et ma passion pour le développement web.

🌐 [Voir le site en ligne](https://nono-bendi.github.io/portefolio/index.html)

---

## 📁 Contenu du site

- **Accueil** : Introduction rapide.
- **À propos** : Mon parcours, mes motivations.
- **Projets** : Présentation de projets personnels (avec captures et descriptions).
- **Passions** : Trois pages dédiées à mes centres d'intérêt.
- **CV** : Mon CV interactif et téléchargeable au format PDF.

---

## 🛠️ Technologies utilisées

- HTML5  
- CSS3  
- Bootstrap 5  
- JavaScript (Vanilla)

---

## 📱 Responsive

Le site est **responsive** : il s’adapte à tous les écrans (mobile, tablette, desktop).

---

## 🧑‍🎓 Objectif du projet

Ce portfolio a été réalisé dans le cadre d’un projet personnel à rendre pour le **11 juillet 2025**, combinant design, développement front-end, et hébergement web.

---

## 🚀 Hébergement

Le site est hébergé gratuitement via **GitHub Pages**.

---

## 🧾 Licence

Projet personnel — librement consultable, non librement réutilisable sans autorisation.



## Project Structure

```
leakway
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── reportController.js
│   │   ├── models
│   │   │   └── request.js
│   │   ├── routes
│   │   │   └── reportRoutes.js
│   │   └── db
│   │       └── index.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── README.md
├── database
│   └── schema.sql
└── README.md
```

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install the necessary dependencies:
   ```
   npm install
   ```
3. Set up the PostgreSQL database using the provided `schema.sql` file.
4. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Open `public/index.html` in a web browser to access the application.

## API Endpoints

- `POST /api/reports`: Submit a new report.
- `GET /api/reports/:id`: Get the status of a specific report.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
