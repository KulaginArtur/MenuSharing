'use strict';
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 12;

/* Normally, password comes from html registration form (in post method). Make sure it uses HTTPS (S is importan$const myPlaintextPassword = 'secret ;)';
//app.post('/register',....
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  // Store hash in your password DB.
  console.log(hash);
});
*/

const db = require('./utils/database');
// tietokantayhteys
const connection = db.connect();

passport.use(new Strategy(
    (uname, psw, done) => {
      console.log(`login? ${uname}`);
      //Normally, select * from users where username=?',[uname],
      connection.query(
          'SELECT * FROM user WHERE userName = ? AND passwordHash = ?',
          [uname, psw],
          (err, results, fields) => {
            console.log(results);
            if (results.length === 0) {
              console.log('login failed');
              return done(null, false);
            }
            console.log('login ok');
            return done(null, {name: username});
          });
    },
));

passport.serializeUser((user, done) => {
  console.log('session serialize');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('session deserialize');

  done(null, user);
});

app.use(require('serve-static')(__dirname + '/public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')(
    {secret: process.env.SEC, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

console.log('Alive we ride');

const sslkey = fs.readFileSync(process.env.KEY);
const sslcert = fs.readFileSync(process.env.CERT);
const options = {
  key: sslkey,
  cert: sslcert,
};

app.get('/', (req, res) => {
  console.log(req);
  if (req.secure) res.send('https :) and hello' + req.user.name);
  else res.send('hello not secure?');
});

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/');
    });

app.post('/Register', bodyParser.urlencoded({extended: true}), (req, res) => {
  // lisää kuvan tiedot tietokantaan
  console.log(req.body.uname);
  const data = [
    req.body.uname,
    req.body.psw,
  ];

  connection.query('INSERT INTO user (userName,passwordHash) VALUES (?, ?);',
      data, function(error, results, field) {
        $console.log(results);
      });

});

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic
