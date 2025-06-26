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

// POST report (public)
router.post('/', async (req, res) => {
  const {
    nom,
    nomCompte,
    email,
    lienPirate,
    lienOfficiel,
    plateforme,
    commentaire,
  } = req.body;

  // validation rapide
  if (![nom, nomCompte, email, lienPirate, lienOfficiel, plateforme].every(Boolean)) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  try {
    const { id } = await db.enregistrerSignalement({
      nom,
      nomCompte,
      email,
      lienPirate,
      lienOfficiel,
      plateforme,
      commentaire,
    });
    res.status(201).json({ success: true, id });
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







