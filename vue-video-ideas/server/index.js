const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { router } = require('./router');

app.use(bodyParser.json());
app.use(cors());

router(app);

app.listen(5000);
