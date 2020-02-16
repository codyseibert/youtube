require('dotenv').config();
const express = require('express');
const passport = require('passport');

const app = express();
app.use(require('serve-static')(__dirname + '/../public'));
app.use(
  require('body-parser').urlencoded({ extended: true })
);
// app.use(
//   require('express-session')({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true
//   })
// );
app.use(
  require('cookie-session')({
    maxAge: 24 * 60 * 60 * 10000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('cors')());

const GoogleStrategy = require('passport-google-oauth20')
  .Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, { id: profile.id });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/gg', (req, res) => {
  console.log(req.session);
  res.send('gg');
});

app.listen(5000);
