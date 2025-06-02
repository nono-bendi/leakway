-- Création initiale de la table
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    lien TEXT NOT NULL,
    plateforme TEXT NOT NULL,
    commentaire TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ajout de nouvelles colonnes (si ce n’est pas déjà fait)
ALTER TABLE reports ADD COLUMN traite BOOLEAN DEFAULT 0;
ALTER TABLE reports ADD COLUMN date_submission TEXT DEFAULT (datetime('now'));
