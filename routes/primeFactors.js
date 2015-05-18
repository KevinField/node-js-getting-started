'use strict';
module.exports = {'/primeFactors': function(req, res){
	var storage = require('node-persist');
	storage.initSync();
	res.writeHead(200, { 'Content-Type': 'application/json'});
	var rt = require('../static/roman-translator.js');
	var makeResponse = function(num) {
		var decomp = [],
			isRoman = false;
		if (isNaN(num) || typeof(parseInt(num, 10)) !== 'number') {
			try {
				num = rt.toArabic(num);
			} catch (e) {
				return (
					{
						"number" : num,
						"error" : "not a number"
					}
				);
			}
			isRoman = true;
		}
		if (parseInt(num, 10) > 1000000) {
			return (
				{
					"number" : num,
					"error" : "too big number (>1e6)"
				}
			);
		} else if (parseInt(num, 10) <= 1) {
			return (
				{
					"number" : num,
					"error" : num + " is not an integer > 1"
				}
			);
		}
		for (var candidate = 2, cur = num; cur > 1; candidate++) {
			for (; cur % candidate == 0; cur /= candidate) {
				decomp.push(isRoman?rt.toRoman(candidate):candidate);
			}
		}
		num = isRoman?rt.toRoman(num):num;
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
			var resp = makeResponse(numbers);
			if (resp.decomposition) {
				storage.setItem('last',resp);
			}
			res.end(JSON.stringify(resp));
			return;
		}
	}
	while (numbers.length) {
		responses.push(makeResponse(numbers.shift()));
	}
	res.end(JSON.stringify(responses));
}};
