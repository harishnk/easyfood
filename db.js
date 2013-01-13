var config = require('./config').config,
	mongoose = require('mongoose');
	// dbref = require("mongoose-dbref")
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.mongohq_url);
// Access the mongoose-dbref module and install everything
// var utils = dbref.utils
// Install the types, plugins and monkey patches
// var loaded = dbref.install(mongoose);
// var DBRef = mongoose.SchemaTypes.DBRef;

var UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  profile: {
    snid: [
      {
        idtyp: String,
        id: String,
        creds: {
          consumerkey: String,
          consumersecret: String,
          token: String,
          tokensecret: String
        }
      }
    ],
    attrib1: String,
    attrib2: String,
    attrib3: String
  },
  culUUIDs: [
    {
      uuid: String, //DBRef,
      name: {
        first: String,
        last: String
      }
    }
  ]
}, { collection: 'UserMaster' });

mongoose.model('UserMaster', UserSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Connected");
});

module.exports.mongoose = mongoose;
// module.exports.dbref = dbref;
module.exports.db = db;