var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('<a href="https://github.com/KevinField/node-js-getting-started/#readme" id="repository-link">my repo</a>');
});

app.get('/ping', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({'alive':true}));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
