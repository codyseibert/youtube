const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const { getDatabaseConnection } = require('./db');

const { router } = require('./router');

(async () => {
  const db = await getDatabaseConnection();
  router({ app, db });
  app.listen(5000);
})();
