const config = {
  saml: {
    cert: './config/saml.pem',
    entryPoint: 'https://163enhuizhu.okta.com/app/163enhuizhu_reactsamlintegration_1/exk1zjkawVGlVT3Bd696/sso/saml',
    issuer: 'http://localhost:3001',
    options: {
      failureRedirect: '/login',
      failureFlash: true,
    }
  },
  session: {
    resave: false,
    secret: 'supersecuresecret',
    saveUninitialized: true, 
  }
};

module.exports = config;
