var UserModel = require('../models/user');

var User = function() {
  this.getRecommendations = function(req, res, next){
  	
  	var userId = req.params.user_id;
  	console.log("Fetching data for %s", userId);

  	userModel = new UserModel.User();
  	userModel.getRecommendations(userId, function(err, data){
  		// Simple pass-through, for now
  		if(err){
  			next(err);
  			return;
  		}
  		next(null, data);

  		// HTTP Response is written here
  		res.send(data);
  	});
  }
};

module.exports.User = User;