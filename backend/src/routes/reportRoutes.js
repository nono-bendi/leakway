// src/routes/reportRoutes.js

const express       = require('express');
const router        = express.Router();
const db            = require('../db');
const jwt           = require('jsonwebtoken');
const verifyToken   = require('../middleware/authMiddleware');

// ─── PUBLIC ────────────────────────────────────────────────────────────────────
// POST /api/reports
// Crée un nouveau signalement depuis le front
router.post('/', async (req, res) => {
  const { nom, compte, email, lien_pirate, lien_officiel, plateforme, commentaire } = req.body;

  // Validation des champs obligatoires
  if (!nom || !compte || !email || !lien_pirate || !lien_officiel || !plateforme) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  try {
    const report = await db.enregistrerSignalement({
      nom,
      nomCompte:    compte,
      email,
      lien:         lien_pirate,
      lienOfficiel: lien_officiel,
      plateforme,
      commentaire,
    });

    return res.status(201).json({ success: true, id: report.id });
  } catch (err) {
    console.error('Erreur DB (enregistrerSignalement) :', err);
    return res.status(500).json({ error: err.message });
  }
});

// ─── AUTH ──────────────────────────────────────────────────────────────────────
// POST /api/reports/login
// Authentifie l’admin et renvoie un JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
});

// ─── PROTECTED ─────────────────────────────────────────────────────────────────
// Toutes les routes ci-dessous nécessitent un JWT valide

// GET /api/reports
// Récupère la liste de tous les signalements
router.get('/', verifyToken, async (req, res) => {
  try {
    const reports = await db.getAllReports();
    return res.json(reports);
  } catch (err) {
    console.error('Erreur DB (getAllReports) :', err);
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/reports/:id
// Supprime un signalement par son ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.supprimerReport(id);
    return res.status(204).end();
  } catch (err) {
    console.error('Erreur DB (supprimerReport) :', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;






