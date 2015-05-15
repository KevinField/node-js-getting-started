'use strict';
module.exports = {'/primeFactors': function(req, res){
	res.writeHead(200, { 'Content-Type': 'application/json'});
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
		numbers = req.query.number;
	if (!Array.isArray(numbers)) {
		if (numbers.indexOf(', ')!==-1) {
			numbers = numbers.split(', ');
		} else {
			res.end(JSON.stringify(makeResponse(numbers)));
			return;
		}
	}
	while (numbers.length) {
		responses.push(makeResponse(numbers.shift()));
	}
	res.end(JSON.stringify(responses));
}};
