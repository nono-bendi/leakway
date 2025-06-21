const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Nécessaire sur Railway
});

async function enregistrerSignalement(data) {
  const { nom, email, lien, plateforme, commentaire, lienOfficiel, nomCompte } = data;
  const query = `
    INSERT INTO reports (nom, email, lien, plateforme, commentaire, lienOfficiel, nomCompte)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;
  const values = [nom, email, lien, plateforme, commentaire, lienOfficiel, nomCompte];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllReports() {
  const result = await pool.query('SELECT * FROM reports ORDER BY id DESC');
  return result.rows;
}

async function supprimerReport(id) {
  await pool.query('DELETE FROM reports WHERE id = $1', [id]);
}

module.exports = {
  enregistrerSignalement,
  getAllReports,
  supprimerReport
};
