'use strict';module.exports = {'/astroport': function(req, res){
	var gatesnships = [1,2,3].map(function(e){return '<span id=gate-'+e+'><span id=ship-'+e+'></span></span>';}).join('')});
	res.send('<h1 id=astroport-name>Yoyo</h1>'
	+gatesnships
);
}};
