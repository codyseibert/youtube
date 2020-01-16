const path = require('path');

exports.get = (req, res) => {
  if (!req.session.username) {
    req.session.username = req.body.name;
    res.render('layout', {
      locals: {
        title: 'Login',
        session: req.session
      },
      partials: {
        content: path.join(
          __dirname,
          '../../views/login.html'
        )
      }
    });
  } else {
    res.redirect('/');
  }
};

exports.post = (req, res) => {
  req.session.username = req.body.name;
  res.redirect('/');
};
