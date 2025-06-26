const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Nécessaire sur Railway
});

async function enregistrerSignalement(data) {
  const {
    nom,
    email,
    lien,
    plateforme,
    commentaire,
    lienOfficiel,
    nomCompte
  } = data;

  // On alimente name et nom avec la même valeur (nom),
  // et link et lien avec la même valeur (lien), pour satisfaire
  // les colonnes NOT NULL restantes.
  const query = `
    INSERT INTO reports
      (name, nom, email, link, lien,
       plateforme, commentaire,
       lienofficiel, nomcompte)
    VALUES
      ($1,    $1,  $2,   $3,   $3,
       $4,        $5,
       $6,          $7)
    RETURNING id
  `;
  const values = [
    nom,        // $1 → name et nom
    email,      // $2 → email
    lien,       // $3 → link et lien
    plateforme, // $4 → plateforme
    commentaire,// $5 → commentaire
    lienOfficiel,// $6 → lienofficiel
    nomCompte    // $7 → nomcompte
  ];

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
