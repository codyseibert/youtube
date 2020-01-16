const express = require('express');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
const { router } = require('./router');
const app = express();

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

router({ app });

app.listen(3000);
