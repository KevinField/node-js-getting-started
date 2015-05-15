'use strict';
var dummy = function(){
	window._ = function(id) { return document.getElementById(id); }
	window.$ = function(selector) { return document.querySelector(selector); }
	window.$$ = function(selector) { return document.querySelectorAll(selector); }
	Element.prototype.$ = function(selector) { return this.querySelector(selector); }
	Element.prototype.$$ = function(selector) { return this.querySelectorAll(selector); }
	window.load = function(){
		var checkBomb = function (e) {
			if (e.target.className === 'bomb') {
				e.target.className += ' lost';
			}
		};
		var grid = document.grid;
		if (!grid) return;
		for (var n=1; n<=grid.length; n++) {
			var row = grid[n-1];
			for (var p=1; p<=row.length; p++) {
				var cell = _("cell-" + n + "x" + p);
				if (cell) {
					cell.className = row[p-1];
					cell.addEventListener('click',checkBomb);
				}
			}
		}
	};
}();
