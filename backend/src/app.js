// Application Express principale
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const reportRoutes = require('./routes/reportRoutes'); // Routes pour les signalements
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors({
  origin: 'https://shiny-kulfi-a0f3fb.netlify.app',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middleware pour parser le JSON et les formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilise les routes de report
app.use('/api/reports', reportRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



