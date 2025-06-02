const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  }
});

// GET ALL REPORTS (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const reports = await db.getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST report (publique)
router.post('/', async (req, res) => {
  const { nom, email, lien, plateforme, commentaire } = req.body;

  if (!nom || !email || !lien || !plateforme) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  try {
    const result = await db.enregistrerSignalement({ nom, email, lien, plateforme, commentaire });
    res.status(201).json({ success: true, id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE report (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
   await db.supprimerReport(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;






