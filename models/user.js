var config = require('../config').config;
var dbmodule = require('../db');
var db = dbmodule.db;
var mongoose = dbmodule.mongoose;
// var dbref = dbmodule.dbref;
var ObjectId = mongoose.Types.ObjectId;

// UserMaster schema was registered in db.js
var UserMaster = mongoose.model('UserMaster');


var User = function() {
  this.getRecommendations = function(user_id, next){
  	console.log("UserModel got it: %s (%s)", user_id, (new ObjectId(user_id)));

  	// Sample code to create a new user
	// var m = new UserMaster;
	// m.save()

	UserMaster.findById(new ObjectId(user_id), function (err, doc){
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

module.exports.User = User;