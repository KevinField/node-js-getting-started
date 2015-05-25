'use strict';module.exports = {'/astroport': function(req, res){
	var gatesnships = ['gate','ship'].map(function(f){return [1,2,3].map(function(e){return '<span id='+f+'-'+e+'></span>';}).join('')}).join('');
	res.send('<h1 id=astroport-name>Yoyo</h1>'
	+gatesnships
);
}};
