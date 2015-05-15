'use strict';module.exports = {'/static/*': function(req, res){
    res.sendFile(req.params[0], {root: './static/'});
}};
