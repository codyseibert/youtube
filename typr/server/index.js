const express = require('express');
const app = express();

const port = 5000;
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to a basic express App');
});

app.get('/users', (req, res) => {
  res.json([
    { name: 'William', location: 'Abu Dhabi' },
    { name: 'Chris', location: 'Vegas' }
  ]);
});

app.post('/user', (req, res) => {
  const { name, location } = req.body;

  res.send({ status: 'User created', name, location });
});

app.listen(port, () => {
  console.log(
    `Server is booming on port 5000 Visit http://localhost:5000`
  );
});
