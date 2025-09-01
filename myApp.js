const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet.hidePoweredBy());

// Mitigate clickjacking
app.use(
  helmet.frameguard({
    action: 'deny',
  })
);

// Prevent MIME type sniffing
app.use(helmet.noSniff());

// Prevent IE from executing downloads in site's context
app.use(helmet.ieNoOpen());

app.use(helmet.xssFilter());

// 🔒 Force browsers to use HTTPS only (for the next 90 days)
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true,
  })
);

// Serve static files
app.use(express.static('public'));

// Root route
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
