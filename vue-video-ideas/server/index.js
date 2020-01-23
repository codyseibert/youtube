const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getClient } = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/ideas', async (req, res) => {
  // TODO: refactor into handler / interactor / persistence
  const client = await getClient();
  const collection = client.collection('ideas');
  const result = await collection.insertOne(req.body);
  res.send(result.ops[0]);
});

app.listen(5000);
