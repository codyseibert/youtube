const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getClient } = require('./db');
const app = express();
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(cors());

app.post('/ideas', async (req, res) => {
  // TODO: refactor into handler / interactor / persistence
  const client = await getClient();
  const collection = client.collection('ideas');
  const result = await collection.insertOne({
    ...req.body,
    votes: 0
  });
  res.send(result.ops[0]);
});

app.get('/ideas', async (req, res) => {
  // TODO: refactor into handler / interactor / persistence
  const client = await getClient();
  const collection = client.collection('ideas');
  const ideas = await collection.find({}).toArray();
  res.send(ideas);
});

app.post('/ideas/:ideaId/votes', async (req, res) => {
  // TODO: refactor into handler / interactor / persistence
  const { ideaId } = req.params;
  const client = await getClient();
  const collection = client.collection('ideas');
  const idea = await collection.findOne({
    _id: new ObjectId(ideaId)
  });
  idea.votes = (idea.votes || 0) + 1;
  await collection.updateOne(
    {
      _id: new ObjectId(ideaId)
    },
    { $set: idea }
  );
  res.send(idea);
});

app.delete('/ideas/:ideaId/votes', async (req, res) => {
  // TODO: refactor into handler / interactor / persistence
  const { ideaId } = req.params;
  const client = await getClient();
  const collection = client.collection('ideas');
  const idea = await collection.findOne({
    _id: new ObjectId(ideaId)
  });
  idea.votes = (idea.votes || 0) - 1;
  await collection.updateOne(
    {
      _id: new ObjectId(ideaId)
    },
    { $set: idea }
  );
  res.send(idea);
});

app.listen(5000);
