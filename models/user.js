var config = require('../config').config;
var Foursquare = require('node-foursquare')(config.foursquare_config);
var dbmodule = require('../db');
var db = dbmodule.db;
var mongoose = dbmodule.mongoose;
// var dbref = dbmodule.dbref;
var ObjectId = mongoose.Types.ObjectId;

// UserMaster schema was registered in db.js
var UserMaster = mongoose.model('UserMaster');


var User = function() {

  this.getUserById = function(userId, next){
  	UserMaster.findById(new ObjectId(userId), function (err, doc){
  		if(err) {
          next(err);
        } else {
        	next(null, doc);
        }
  	});
  }

  this.getSocialSelf = function(accessToken, serviceName, next){
  	// if serviceName == "foursquare"
  	Foursquare.Users.getUser('self', accessToken, function (err, data) {
  		if(err) {
          next(err);
        } else {
        	next(null, data);
        }
  	});
  }

  this.updateAccessToken = function(accessToken, next){
  	//Update document with current temp API access token
  }

  this.getFriends = function(userId, accessToken, next){
  	// For Foursquare
    userId = (userId == "me" ? "self" : userId)
  	Foursquare.Users.getFriends(userId, null, accessToken, function (err, data) {
  		if(err) {
          next(err);
        } else {
        	next(null, data);
        }
    });
  }

  this.getRecommendations = function(userId, next){
  	console.log("UserModel got it: %s (%s)", userId, (new ObjectId(userId)));

	getUserById(userId, function(err, doc){
		if(err){
			next(err);
			console.log(err);
			return;
		}

		if(doc && doc.culUUIDs.length > 0){
			// Resolve nested objectIds to full objects
			var doneSoFar = 0;
			var tmpObjectId = null;

			//Much easier with "async" module
			for(var i = 0; i < doc.culUUIDs.length; i++){

				try{
					tmpObjectId = new ObjectId(doc.culUUIDs[i].uuid);
				}catch(e){
					console.log(e);
					// Compensate for error
					doneSoFar++;
					continue;
				}

			    UserMaster.findById(tmpObjectId, function (err, subdoc){
					if(err){
						// Suppress
						console.log(err);
					} else {
						doc.culUUIDs[i] = subdoc;
					}

					doneSoFar++;
					console.log(doneSoFar)
					if(doneSoFar == doc.culUUIDs.length - 1){
						// All done
						// Construct doc object (modify properties, if necessary) and handover to controller
						next(null, doc);
	  					console.log("doc: " + doc);
					}
				});
			}
		} else {
			next(null, doc);
	  		console.log("doc: " + doc);
		}
  	});
  }
};

module.exports.User = new User();