'use strict';
var dummy = function(){
	window._ = function(id) { return document.getElementById(id); }
	window.$ = function(selector) { return document.querySelector(selector); }
	window.$$ = function(selector) { return document.querySelectorAll(selector); }
	Element.prototype.$ = function(selector) { return this.querySelector(selector); }
	Element.prototype.$$ = function(selector) { return this.querySelectorAll(selector); }
	window.load = function(){
		var checkBombs = function (e) {
			var et = e.target;
			if (et.className.indexOf('bomb')!==-1) {
				et.className += ' lost';
			} else {
				et.className += ' safe';
				var ident = et.id.match(/cell-([0-9]+)x([0-9]+)/);
				var n = parseInt(ident[1], 10),
					p = parseInt(ident[2], 10),
					bombs = 0;
				for (var i=n-1; i<=n+1; i++) {
					for (var j=p-1; j<=p+1; j++) {
						var cell = _('cell-' + i + 'x' + j);
						if (cell) {
							if (cell.className.indexOf('bomb')!==-1) {
								bombs++;
							}
						}
					}
				}
				et.textContent = bombs;
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
					cell.addEventListener('click',checkBombs);
				}
			}
		}
	};
	window.addEventListener('DOMContentLoaded',function(){
		document.grid =    [
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'bomb' , 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'bomb' , 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			];
			load();
	});
}();
