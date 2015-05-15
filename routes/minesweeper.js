'use strict';module.exports = {'/minesweeper': function(req, res){
	var grid = '';
	for (var n=1; n<=8; n++) {
		for (var p=1; p<=8; p++) {
			grid += "<span id='cell-" + n + "x" + p + "'></span>";
		}
		grid += "<br>";
	}
	res.send("<!DOCTYPE html5><head><title>Whoa sweepy</title>"
		+"<style>span {border: 1px solid black;width:30px;height:30px;display: -moz-grid;}</style>"
		+"</head><body><h1 id='title'>Minesweeper</h1>"
		+grid+"</body>");
}};
