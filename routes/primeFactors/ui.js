'use strict';
module.exports = {'/primeFactors/ui': function(req, res){
	var storage = require('node-persist');
	storage.initSync();
	var injection = '';
	if (storage.getItem('last')) {
		injection = "<script>"
			+"window.primeFactors="
			+JSON.stringify({ last: storage.getItem('last') })
			+";"
			+"</script>";
	}
	res.send("<!DOCTYPE html5><head><title>AJAX!</title></head><body><h1 id='title'>THE FOR(U)M</h1>"
		+"<p id='invitation'>Please fill it out.</p>"
		+"<input id='number' type='text' name='number'/>"
		+"<button id='go'>Go</button><span id='result'></span><ol id='results'></ol>"
		+"<span id='last-decomposition'></span>"
		+injection
		+"<script src='/static/primeFactors-ui-client.js'></script></body>");
}};
