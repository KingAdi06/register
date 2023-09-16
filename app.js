const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000; // You can choose any available port

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL database connection (replace with your database credentials)
const dbConfig = {
  host: 'localhost',      // Replace with your MySQL host
  user: 'root',  // Replace with your MySQL username
  password: '',  // Replace with your MySQL password
  database: 'mydb', // Replace with your database name
};

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a MySQL connection
    const connection = await mysql.createConnection(dbConfig);

    // Insert registration data into MySQL
    await connection.execute('INSERT INTO registrations (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

    // Close the connection
    await connection.end();

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
