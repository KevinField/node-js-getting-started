'use strict';module.exports = {'/astroport': function(req, res){
	var gatesnships = [1,2,3].map(function(e){return '<span id=gate-'+e+'><span id=ship-'+e+'></span></span>';}).join('');
	res.send("<!DOCTYPE html5><head><title>Astroportage</title></head><body><h1 id=astroport-name>Yoyo</h1>"
		+"<input id=ship></input>"
		+"<button id=dock>DOCK</button>"
		+gatesnships
		+"<script src='/static/astroport-client.js'></script></body>");
}};
