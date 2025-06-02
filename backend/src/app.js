const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const reportRoutes = require('./routes/reportRoutes'); // ✅ Nom corrigé ici
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers statiques (HTML/CSS/JS du frontend)
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'], // Ajout de DELETE pour l'admin
  allowedHeaders: ['Content-Type', 'Authorization'] // Autorise le token
}));

// Middleware JSON et URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilise les routes de report
app.use('/api/reports', reportRoutes); // ✅ Correction ici (plus "routes")

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



