const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.join(__dirname, 'study_app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});


db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      google_id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT,
      gold INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Chimera table (stores all chimera for a user)
  db.run(`
    CREATE TABLE IF NOT EXISTS chimera (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      google_id TEXT NOT NULL,
      seed TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (google_id) REFERENCES users(google_id)
    )
  `);

  // Streaks table
  db.run(`
    CREATE TABLE IF NOT EXISTS streaks (
      google_id TEXT PRIMARY KEY,
      small INTEGER DEFAULT 0,
      medium INTEGER DEFAULT 0,
      large INTEGER DEFAULT 0,
      FOREIGN KEY (google_id) REFERENCES users(google_id)
    )
  `);
});

module.exports = db;