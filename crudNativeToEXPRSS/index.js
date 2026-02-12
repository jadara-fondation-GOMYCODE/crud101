const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// CORS so React app can call the API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// GET all users
app.get('/api/users', (req, res) => {
  res.json(db.getAll());
});

// GET one user by id
app.get('/api/users/:id', (req, res) => {
  const user = db.getById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'username and email are required' });
  }
  const user = db.create({ username, email });
  res.status(201).json(user);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'username and email are required' });
  }
  const user = db.update(req.params.id, { username, email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const deleted = db.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});

app.listen(5000,()=>{
    console.log('your app is runing on port 5000');
})