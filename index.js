var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('<h1>Hello Yose</h1><p><a href="https://github.com/KevinField/node-js-getting-started/#readme" id="repository-link">my repo</a></p>');
});

app.get('/ping', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({'alive':true}));
});


app.get('/primeFactors', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json'});
	var num = request.query.number,
		decomp = [];
	if (isNaN(num) || typeof(num) != 'number') {
		response.end(JSON.stringify(
			{
				"number" : num,
				"error" : "not a number"
			}
		));
		return;		
	}
	for (var cur=num; cur > 1; cur/=2) {
		decomp.push(2);
	}
    response.end(JSON.stringify(
		{
			"number" : num,
			"decomposition" : decomp
		}
	));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
