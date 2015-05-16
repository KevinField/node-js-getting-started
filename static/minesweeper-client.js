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
				if (bombs) {
					et.textContent = bombs;
					et.className += ' keepwhite';
				} else {
					var gridHeight = document.grid.length,
						gridWidth = document.grid[0].length;
					for (var i=n-1; i<=n+1; i++) {
						if (i < 1 || i > gridHeight) continue;
						for (var j=p-1; j<=p+1; j++) {
							if (j < 1 || j > gridWidth) continue;
							if (p===j && n===i) continue;
							var cell = _('cell-' + i + 'x' + j);
							if (cell) {
								if (cell.className.indexOf('safe')===-1) {
									checkBombs({target:cell});
								}
							}
						}
					}
				}
			}
		};
		var grid = document.grid,
			docfrag = document.createDocumentFragment();
		if (!grid) return;
		for (var n=1; n<=grid.length; n++) {
			var row = grid[n-1];
			for (var p=1; p<=row.length; p++) {
				var cell = document.createElement('span');
				cell.id = "cell-" + n + "x" + p;
				cell.className = row[p-1];
				docfrag.appendChild(cell);
			}
			docfrag.appendChild(document.createElement('br'));
		}
		_('grid').innerHTML = "";
		_('grid').appendChild(docfrag);
		for (var n=1; n<=grid.length; n++) {
			var row = grid[n-1];
			for (var p=1; p<=row.length; p++) {
				var cell = _("cell-" + n + "x" + p);
				cell.addEventListener('click',checkBombs);
			}
		}
	};
	window.addEventListener('DOMContentLoaded',function(){
		document.grid = [];
		var rows = Math.round(Math.random()*12)+3,
			cols = Math.round(Math.random()*12)+3;
		for (var i=0; i<rows; i++) {
			var row = [];
			for (var j=0; j<cols; j++) {
				row[j] = Math.random() > 0.7 ? 'bomb' : 'empty';
			}
			document.grid.push(row);
		}
		load();
	});
}();
