var dummy = function(){
	window._ = function(id) { return document.getElementById(id); }
	window.$ = function(selector) { return document.querySelector(selector); }
	window.$$ = function(selector) { return document.querySelectorAll(selector); }
	Element.prototype.$ = function(selector) { return this.querySelector(selector); }
	Element.prototype.$$ = function(selector) { return this.querySelectorAll(selector); }
	window.addEventListener('DOMContentLoaded',function(){
		var processResult = function (resp) {
			if (resp.error) {
				if (resp.error === 'not a number') {
					return resp.number + ' is not a number';
				}
				return resp.error;
			} else {
				if (resp.decomposition) {
					return resp.number + ' = ' + resp.decomposition.join(' x ');
				} else {
					return 'No error, but no decomp either.  (?)';
				}
			}
		};
		if (window.primeFactors && window.primeFactors.last) {
			_('last-decomposition').innerHTML = processResult(window.primeFactors.last);
		}
		_('go').addEventListener('click',function() {
			var url = '/primeFactors/',
				parameters = 'number=' + _('number').value;
			var req = new XMLHttpRequest();
			req.onreadystatechange = function () {
				if (req.readyState == 4) {
					if (req.status == 200) {
						var resp = {};
						try {
							resp = JSON.parse(req.responseText);
						} catch(e) {
							resp = {
								error: 'An uncaught error occurred: not JSON',
								req_response_text: req.responseText
							};
						}
						if (!resp.error && !resp.decomposition) {
							if (Array.isArray(resp)) {
								var docfrag = document.createDocumentFragment();
								resp.forEach(function(e){
								  var li = document.createElement("li");
								  li.innerHTML = processResult(e);
								  docfrag.appendChild(li);
								});
								_('results').appendChild(docfrag);
								return;
							} else {
								resp = {
									error: 'An uncaught error occurred: no decomposition',
									req_response_text: req.responseText
								};
							}
						}
						_('result').innerHTML = processResult(resp);
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
