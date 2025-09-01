const express = require('express');
const helmet = require('helmet');

const app = express();

// Configure Helmet all in one place
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet({
    hidePoweredBy: true, // remove "X-Powered-By: Express"
    frameguard: { action: 'deny' }, // block <iframe> embedding
    noSniff: true, // prevent MIME type sniffing
    ieNoOpen: true, // protect IE users from executing downloads
    xssFilter: true, // legacy XSS filter
    hsts: { maxAge: ninetyDaysInSeconds, force: true }, // enforce HTTPS for 90 days
    dnsPrefetchControl: true, // disable DNS prefetching
    noCache: true, // disable client-side caching
    contentSecurityPolicy: { // configure CSP
      directives: {
        defaultSrc: ["'self'"], // allow only this domain by default
        scriptSrc: ["'self'", "trusted-cdn.com"], // allow scripts from self + trusted CDN
      },
    },
  })
);

// Serve static files (CSS, JS, images, etc.)
app.use(express.static('public'));

// Root route (homepage)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html'); 
});

// Required export for FCC tests
module.exports = app;

// API routes (FCC tests)
const api = require('./server.js');
app.use('/_api', api);

// Start server
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
