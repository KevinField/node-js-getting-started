'use strict';
(function(){
	window._ = function(id) { return document.getElementById(id); }
	window.$ = function(selector) { return document.querySelector(selector); }
	window.$$ = function(selector) { return document.querySelectorAll(selector); }
	Element.prototype.$ = function(selector) { return this.querySelector(selector); }
	Element.prototype.$$ = function(selector) { return this.querySelectorAll(selector); }
	window.addEventListener('DOMContentLoaded',function(){
		_('dock').addEventListener('click',function(){
			_('ship-1').innerHTML = _('ship').value;
		});
	});
})();
