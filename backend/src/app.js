// Application Express principale
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const reportRoutes = require('./routes/reportRoutes');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS – TEMPORAIREMENT ouvert à tous (à restreindre ensuite !)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Sert les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Middleware pour parser les données
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes API
app.use('/api/reports', reportRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
