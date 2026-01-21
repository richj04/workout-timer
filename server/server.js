const express = require('express');
const cors = require('cors');
const db = require('./database'); // Import database

const app = express();
const PORT = 8000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'https://workout-timer-seven-beta.vercel.app'
  ],
  credentials: true
}));


app.use(express.json());

// Test route (same as before)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Get or create user
app.post('/api/user/login', (req, res) => {
  const { google_id, email, name } = req.body;

  // Check if user exists
  db.get('SELECT * FROM users WHERE google_id = ?', [google_id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (user) {
      // User exists, return their data
      res.json({ message: 'User found', user });
    } else {
      // Create new user
      db.run(
        'INSERT INTO users (google_id, email, name, gold) VALUES (?, ?, ?, ?)',
        [google_id, email, name, 1000], // Start with 1000 gold
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create user' });
          }
          
          // Also create their streak entry
          db.run(
            'INSERT INTO streaks (google_id) VALUES (?)',
            [google_id],
            (err) => {
              if (err) console.error('Failed to create streaks:', err);
            }
          );

          res.json({ 
            message: 'New user created',
            user: { google_id, email, name, gold: 1000 }
          });
        }
      );
    }
  });
});

// Get user by Google ID
app.get('/api/user/:google_id', (req, res) => {
  const { google_id } = req.params;

  db.get('SELECT google_id, email, name, gold FROM users WHERE google_id = ?', [google_id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user });
  });
});

// Update gold for a user
app.patch('/api/user/gold', (req, res) => {
  const { google_id, gold } = req.body;

  if (!google_id || typeof gold !== 'number') {
    return res.status(400).json({ error: 'google_id and gold are required' });
  }

  db.run('UPDATE users SET gold = ? WHERE google_id = ?', [gold, google_id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update gold' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ gold });
  });
});

// Load streaks for a user
app.get('/api/streaks/:google_id', (req, res) => {
  const { google_id } = req.params;

  db.get('SELECT small, medium, large FROM streaks WHERE google_id = ?', [google_id], (err, streaks) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load streaks' });
    }

    if (!streaks) {
      return res.json({ streaks: { small: 0, medium: 0, large: 0 } });
    }

    return res.json({ streaks });
  });
});

// Update streaks for a user
app.put('/api/streaks/:google_id', (req, res) => {
  const { google_id } = req.params;
  const { small, medium, large } = req.body;

  if (small == null || medium == null || large == null) {
    return res.status(400).json({ error: 'small, medium, and large are required' });
  }

  db.run(
    'UPDATE streaks SET small = ?, medium = ?, large = ? WHERE google_id = ?',
    [small, medium, large, google_id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update streaks' });
      }

      if (this.changes === 0) {
        db.run(
          'INSERT INTO streaks (google_id, small, medium, large) VALUES (?, ?, ?, ?)',
          [google_id, small, medium, large],
          (insertErr) => {
            if (insertErr) {
              return res.status(500).json({ error: 'Failed to create streaks' });
            }

            return res.json({ streaks: { small, medium, large } });
          }
        );
        return;
      }

      return res.json({ streaks: { small, medium, large } });
    }
  );
});

// Load chimera for a user
app.get('/api/chimera/:google_id', (req, res) => {
  const { google_id } = req.params;

  db.all(
    'SELECT seed FROM chimera WHERE google_id = ? ORDER BY created_at ASC, id ASC',
    [google_id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to load chimera' });
      }

      return res.json({ chimera: rows.map((row) => row.seed) });
    }
  );
});

// Save chimera for a user
app.post('/api/chimera', (req, res) => {
  const { google_id, seed } = req.body;

  if (!google_id || !seed) {
    return res.status(400).json({ error: 'google_id and seed are required' });
  }

  db.run('INSERT INTO chimera (google_id, seed) VALUES (?, ?)', [google_id, seed], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to save chimera' });
    }

    return res.json({ id: this.lastID, seed });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
