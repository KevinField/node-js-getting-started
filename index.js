var express = require('express');
var routescan = require('express-routescan');
var app = express();
app.set('port', (process.env.PORT || 5000));
routescan(app);
var port = app.get('port');
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
