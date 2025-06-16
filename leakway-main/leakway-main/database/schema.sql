DROP TABLE IF EXISTS reports;

CREATE TABLE reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    lien TEXT NOT NULL,
    lienOfficiel TEXT,
    nomCompte TEXT,
    plateforme TEXT NOT NULL,
    commentaire TEXT,
    traite BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);