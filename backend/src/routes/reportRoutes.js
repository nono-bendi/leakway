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
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leakForm');
  const msg  = document.getElementById('message');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // validation HTML5 (required)
    if (!form.checkValidity()) {
      msg.textContent = "Merci de remplir tous les champs requis.";
      return;
    }

    // on conserve tout le reste de ta logique fetch…
    const data = Object.fromEntries(new FormData(form).entries());
    // …
  });
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







