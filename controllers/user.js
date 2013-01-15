var UserModel = require('../models/user').User;
var config = require('../config').config;
var Foursquare = require('node-foursquare')(config.foursquare_config);

var User = function() {

  this.fsqLogin  = function(req, res, next){
    res.writeHead(303, { 'location': Foursquare.getAuthClientRedirectUrl() });
    res.end();
  }

  this.fsqLoginComplete = function(req, res, next){
    Foursquare.getAccessToken({
        code: req.query.code
    }, function (error, accessToken) {
        if(error) {
          res.send("Error: " + error.message);
        } else {

          console.log("***** accessToken ******\n%s\n************", accessToken);

          // For debugging purposes only-!
          res.send("accessToken: " + accessToken);
          res.end();
        }
    });
  }

  this.getSocialSelf = function(req, res, next){
    UserModel.getSocialSelf(req.query.accessToken, "foursquare", function(err, data){
      if(err){
          next(err);
          return;
      }
      res.send(data);
    })
  }

  this.getFriends = function(req, res, next){
    UserModel.getFriends(req.params.user_id, req.query.accessToken, function(err, data){
      if(err){
          next(err);
          return;
      }
      res.send(data);
    })
  }

  this.getRecommendations = function(req, res, next){
  	
  	var userId = req.params.user_id;
  	console.log("Fetching data for %s", userId);

  	UserModel.getRecommendations(userId, function(err, data){
  		// Simple pass-through, for now
  		if(err){
  			next(err);
  			return;
  		}

  		// HTTP Response is written here
  		res.send(data);
  	});
  }
};

module.exports.User = new User();