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
			if (et.classList.contains('bomb')) {
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
							if (cell.classList.contains('bomb')) {
								bombs++;
							}
						}
					}
				}
				if (bombs) {
					et.textContent = bombs;
					et.className += ' keepwhite';
				} else {
					for (var i=n-1; i<=n+1; i++) {
						for (var j=p-1; j<=p+1; j++) {
							if (p===j && n===i) continue;
							var cell = _('cell-' + i + 'x' + j);
							if (cell) {
								if (!cell.classList.contains('safe')) {
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
				cell.addEventListener('click',checkBombs);
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
		return;
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
