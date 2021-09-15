
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app = express()
const port = 3001

require('./config/passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  req.headers['origin']);
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', '*');
  
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/login', passport.authenticate('saml', config.saml.options, () => {
  console.log('--- saml login ---');
}), (req, res) => {
  return res.redirect('http://localhost:3000');
});

app.post('/login/callback' ,passport.authenticate('saml', config.saml.options),(req, res) => {
  return res.redirect('http://localhost:3000');
});

app.get('/whoami', (req, res) => {
  if (!req.isAuthenticated()) {
    console.info('user is not authenticated.');
    
    return res.status(401).json({
      message: 'unauthoried',
    });
  } else {
    console.info('user is authenticated!');
    console.info({
      user: req.user,
    });

    return res.status(200).json({
      user: req.user,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
