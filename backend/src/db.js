const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers le fichier leakway.db
const dbPath = path.resolve(__dirname, '../../database/leakway.db');
const db = new sqlite3.Database(dbPath);

function enregistrerSignalement(data) {
  return new Promise((resolve, reject) => {
    const { nom, email, lien, plateforme, commentaire, lienOfficiel, nomCompte } = data;
    const query = `
      INSERT INTO reports (nom, email, lien, plateforme, commentaire, lienOfficiel, nomCompte)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [nom, email, lien, plateforme, commentaire, lienOfficiel, nomCompte], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
}


function getAllReports() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM reports ORDER BY rowid DESC', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}


function supprimerReport(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM reports WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}


module.exports = {
  enregistrerSignalement,
  getAllReports,
  supprimerReport
};
