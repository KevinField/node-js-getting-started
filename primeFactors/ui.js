var dummy = function(){
	window._ = function(id) { return document.getElementById(id); }
	window.$ = function(selector) { return document.querySelector(selector); }
	window.$$ = function(selector) { return document.querySelectorAll(selector); }
	Element.prototype.$ = function(selector) { return this.querySelector(selector); }
	Element.prototype.$$ = function(selector) { return this.querySelectorAll(selector); }
	window.addEventListener('DOMContentLoaded',function(){
		_('go').addEventListener('click',function() {
			var url = '/primeFactors/',
				parameters = 'number=' + _('number').value;
			var req = new XMLHttpRequest();
			req.onreadystatechange = function () {
				if (req.readyState == 4) {
					if (req.status == 200) {
						var resp = {};
						if (req.responseText.substring(0,1) !== '{') { // probably error
							resp = {
								error: 'An uncaught error occurred: not JSON',
								req_response_text: req.responseText
							};
						} else {
							resp = JSON.parse(req.responseText);
						}
						if (!resp.error && !resp.decomposition) { // probably error
							resp = {
								error: 'An uncaught error occurred: no decomposition',
								req_response_text: req.responseText
							};
						}
						if (resp.error) {
							_('result').innerHTML = '<h3>' + resp.error + '</h3>';
							return;
						}
						_('result').innerHTML = _('number').value + ' = ' + resp.decomposition.join(' x ');
						return;
					}
					_('result').innerHTML = '<h3>Error: Server status code ' + req.status + '</h3>';
				}
			};
			req.open('GET', url + '?' + parameters);
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.send();
			return;
		});
	},false);
}();
