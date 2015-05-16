'use strict';module.exports = {'/minesweeper': function(req, res){
	res.send("<!DOCTYPE html5><head><title>Whoa sweepy</title>"
		+"<link rel='stylesheet' href='/static/minesweeper-client.css'></link>"
		+"</head><body><h1 id='title'>Minesweeper</h1>"
		+"<div id='grid'></div><script src='/static/minesweeper-client.js'></script></body>");
}};
