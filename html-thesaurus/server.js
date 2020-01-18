const express = require('express');
const request = require('request-promise');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  const word = req.query.word;
  const results = await request(
    `http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=SB9HBjhOvpolrzew6OHB`
  );
  res.send(results);
});

app.listen(3000);
