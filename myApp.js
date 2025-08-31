const express = require('express');
const helmet = require('helmet');
const app = express();

// Hide "X-Powered-By" header
app.use(helmet.hidePoweredBy());

// Mitigate clickjacking
app.use(
  helmet.frameguard({
    action: 'deny',
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
