const path = require('path');
const express = require('express');

const redirectToLogin = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    next();
  }
};

exports.router = ({ app }) => {
  app.get('/login', require('./routes/login').get);
  app.post('/login', require('./routes/login').post);
  app.get('/logout', require('./routes/logout').get);
  app.use(redirectToLogin);
  app.get('/', require('./routes/upload').get);
  app.get('/scenarios', require('./routes/scenarios').get);
  app.post('/upload', ...require('./routes/upload').post);
  app.get('/vote', require('./routes/vote').get);
  app.post(
    '/vote/:scenarioId',
    require('./routes/vote').post
  );
  app.use(
    '/uploads',
    express.static(path.join(__dirname, '../uploads'))
  );
};
