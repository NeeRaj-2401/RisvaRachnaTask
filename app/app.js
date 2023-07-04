const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const lodash = require('lodash');

const app = express();
app.use(bodyParser.json());
app.use(cors());

class Fruit {
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

const users = [];

// API endpoint to sort and return the fruits
app.post('/fruits', (req, res) => {
  const fruitsData = req.body;

  if (!Array.isArray(fruitsData)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const fruits = fruitsData.map(fruit => new Fruit(fruit.id, fruit.name, fruit.color));
  console.log(fruits);
  
  const sortedFruits = lodash.sortBy(fruits, 'color');
  res.json(sortedFruits);
});

// API endpoint for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,12}$/.test(username)) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password should be at least 6 characters long' });
  }

  res.json({ message: `${username} logged in successfully.`, });
  users.push({ username, password });
  console.log(users);
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
