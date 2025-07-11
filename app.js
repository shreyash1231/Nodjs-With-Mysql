const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// ✅ MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shreyash1@#',
  database: 'mydb'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// ✅ CREATE - Insert user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) throw err;
    res.send({ message: 'User created', id: results.insertId });
  });
});

// ✅ READ - Get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// ✅ READ - Get user by ID
app.get('/users/:id', (req, res) => {
  connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// ✅ UPDATE - Update user
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: 'User updated' });
  });
});

// ✅ DELETE - Delete user
app.delete('/users/:id', (req, res) => {
  connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: 'User deleted' });
  });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
