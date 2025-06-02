const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers le fichier leakway.db
const dbPath = path.resolve(__dirname, '../../database/leakway.db');
const db = new sqlite3.Database(dbPath);

// Fonction pour enregistrer un signalement dans la base SQLite
function enregistrerSignalement(data) {
  return new Promise((resolve, reject) => {
    const { nom, email, lien, plateforme, commentaire } = data;
    const query = `
      INSERT INTO reports (nom, email, lien, plateforme, commentaire)
      VALUES (?, ?, ?, ?, ?)
    `;
    console.log("🔄 Tentative d'insertion dans SQLite...");
    console.log({ nom, email, lien, plateforme, commentaire }); // pour voir les valeurs exactes
    db.run(query, [nom, email, lien, plateforme, commentaire], function (err) {
      if (err) {
        console.error('❌ Erreur SQLite :', err.message);
        reject(err);
      } else {
        console.log("✅ Insertion réussie !");
        resolve({ id: this.lastID });
      }
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
