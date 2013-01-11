
exports.reacttogetreco = function(req, res, next) {
    console.log('reached get handler');
    var usermaster = require('../modules/usermaster.js');
    //var uuidinfo;
    usermaster.getconnecteduuids(req, res);
    /*, process.nextTick(function(error, publicinfo) {
        if (error) console.log('error'); 
        console.log('this is fetch for ' + res._id);
    }));*/

    //console.log('this is fetch for ' + res._id);
    //for (var i = 0; i <= 10; i++){
     //console.log(res.culuuid[i]);}

    //res = uuidinfo;
    //var publicinfo;
    //usermaster.getPublicInfo(uuidinfo, publicinfo);
    

};

exports.reacttogetreco_post_handler = function(req, res, next) {

};
