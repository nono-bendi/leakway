const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Nécessaire sur Railway
});

async function enregistrerSignalement(data) {
  const {
    nom,
    nomCompte,
    email,
    lienPirate,
    lienOfficiel,
    plateforme,
    commentaire,
  } = data;

  const query = `
    INSERT INTO reports
      (nom, nom_compte, email, lien_pirate, lien_officiel, plateforme, commentaire)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;
  const values = [nom, nomCompte, email, lienPirate, lienOfficiel, plateforme, commentaire];
  const { rows } = await pool.query(query, values);
  return rows[0];         // -> { id: ... }
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
