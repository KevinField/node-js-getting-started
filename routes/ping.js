'use strict';module.exports = {'/ping': function(req, res){
	res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({'alive':true}));
}};
