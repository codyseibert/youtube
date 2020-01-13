const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;

app.get('/users', (req, res) =>
  res.send({
    name: 'bob',
    userId: 123
  })
);

app.post('/users', (req, res) => {
  console.log(req.body);
  res.send('user added');
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
