'use strict';
var faces = require("cool-ascii-faces");
module.exports = {
    '/': function(req, res){
	  var result = ''
	  var times = process.env.TIMES || 5
	  for (var i=0; i < times; i++)
		result += faces() + '\n';
	  res.send('<h1>Hello Yose</h1>'
	  	+'<p><a href="https://github.com/KevinField/node-js-getting-started/#readme" id="repository-link">my repo</a></p>'
	  	+'<pre>Some faces:\n'+result+'</pre>'
	  	+"<p>Also, you can <a href='http://kevinjamesfield.blogspot.com/' id='contact-me-link'>contact me</a>.</p>"
	  	+"<p>Or go go go go <a href='/ping' id='ping-challenge-link'>go ping</a>.</p>"	
	  );
    }
};