var express = require('express');
var faces = require("cool-ascii-faces");
var serveStatic = require('serve-static')
var app = express();


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var result = ''
  var times = process.env.TIMES || 5
  for (i=0; i < times; i++)
    result += faces() + '\n';
  response.send('<h1>Hello Yose</h1><p><a href="https://github.com/KevinField/node-js-getting-started/#readme" id="repository-link">my repo</a></p><pre>Some faces:\n'+result+'</pre>');
});

app.get('/ping', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({'alive':true}));
});


app.get('/primeFactors', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json'});
	var makeResponse = function(num) {
		var decomp = [];
		if (isNaN(num) || typeof(parseInt(num)) !== 'number') {
			return (
				{
					"number" : num,
					"error" : "not a number"
				}
			);
		}
		if (parseInt(num) > 1000000) {
			return (
				{
					"number" : num,
					"error" : "too big number (>1e6)"
				}
			);
		} else if (parseInt(num) <= 1) {
			return (
				{
					"number" : num,
					"error" : num + " is not an integer > 1"
				}
			);
		}
		for (var candidate = 2, cur = num; cur > 1; candidate++) {
			for (; cur % candidate == 0; cur /= candidate) {
				decomp.push(candidate);
			}
		}
		return (
			{
				"number" : num,
				"decomposition" : decomp
			}
		);
	};
	var responses = [],
		numbers = request.query.number;
	if (!Array.isArray(numbers)) {
		response.end(JSON.stringify(makeResponse(numbers)));
		return;
	}
	while (numbers.length) {
		responses.push(makeResponse(numbers.shift()));
	}
	response.end(JSON.stringify(responses));
});

app.get('/primeFactors/ui',function(req, resp){
	resp.send("<!DOCTYPE html5><head><title>AJAX!</title></head><body><h1 id='title'>THE FOR(U)M</h1>"
		+"<p id='invitation'>Please fill it out.</p>"
		+"<input id='number' type='number' name='number'/>"
		+"<button id='go'>Go</button><span id='result'/><script src='/primeFactors/ui.js'></script></body>");
});

app.use(serveStatic(__dirname));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
