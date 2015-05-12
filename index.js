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
	var responses = [];
	while (request.query.number.length) {
		var num = request.query.number.pop(),
			decomp = [];
		if (isNaN(num) || typeof(parseInt(num)) !== 'number') {
			responses.push(
				{
					"number" : num,
					"error" : "not a number"
				}
			);
			continue;		
		}
		if (parseInt(num) > 1000000) {
			response.push(
				{
					"number" : num,
					"error" : "too big number (>1e6)"
				}
			);
			continue;
		}
		for (var candidate = 2, cur = num; cur > 1; candidate++) {
			for (; cur % candidate == 0; cur /= candidate) {
				decomp.push(candidate);
			}
		}
		responses.push(
			{
				"number" : num,
				"decomposition" : decomp
			}
		);
	}
	response.end(JSON.stringify(responses));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
