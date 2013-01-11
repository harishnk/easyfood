exports.getconnecteduuids = function(req, res) { 
var mongo = require('mongodb');
var dbcon = require('./secrets').dbcon;
var mongohq_url = dbcon.mongohq_url;
//var dbName = connectionUri.pathname.replace(/^\//, '');

    var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
    
/*var server = new Server('mongodb://harishnk:hwbo21j81@linus.mongohq.com', 10071, {auto_reconnect: true});
var db = new Db('EasyFood', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to EasyFood database");
        db.collection('UserMaster', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The UserMaster collection doesn't exist");
                //close connection
            }
        });
    }
    else
    {console.log('error opening connection'); console.log(err);}
});

//exports.getconnecteduuids = function(req, res) {
    //var _uuid = req.params.uuid;
    var _uuid = '50ee37b9a101bafe04000005';
    console.log('Retrieving user data for: ' + _uuid);
    db.collection('UserMaster', function(err, collection) {
        collection.findOne({'_uuid':new BSON.ObjectID(_uuid)}, function(err, item) {
            if (!err || item) 
            { res.send(item);
            console.log(item);
            }
            else
            {
              console.log('error retrieving data');
            }
        });
    });
};*/

// exports.getconnecteduuids = function(req, res) {
    var _uuid = req.params.uuid;
    //var _uuid = '50ee37b9a101bafe04000005';
    console.log('Retrieving user data for: ' + _uuid); 
    //mongo.db.collection('UserMaster', function(err, collection) {
        //collection.findOne({'_uuid':new BSON.ObjectID(_uuid)}, function(err, item) {
          //  res.send(item);
       // });
  //  });  
  Db.connect(mongohq_url, function(error, client) {
  if (error) throw error;
   console.log('connection opened');
    client.collection('UserMaster', function(error, collection) {
    if (error) throw error;    
    console.log('connection step2 - collection');
    /*collection.findOne({'_id':new BSON.ObjectID(_uuid)}, function(error, item) {        
            if (!error) 
            console.log('connection opened3');
            res.send(item);
            });*/
      collection.find({'_id':new BSON.ObjectID(_uuid)}).toArray(function(error, items){
          if (!error || items.length > 0) console.log('displaying fetched item 0 - ' + items[0]._id); else throw error; 
          getCuluuidData(items, 0);
          res.send(items[0]);          
          }) ;  
            //client.close();            
        });
       
    });
};

//RECURSION...!!! Just did it for kicks to see if it is useful for throttling the number of async calls inside a loop
function getCuluuidData(items, i) {
    var throttle = 2;
    if (i < items[0].culUUIDs.length) { 
    getExternalData(items[0].culUUIDs[i], i);    
    //console.log('reached getCuluuidData call, displaying fetched item ' + i + ' ' + items[0].name.first + items[0].profile.foursqid);
    //console.log(items[0].culUUIDs[i].uuid);
    
    getCuluuidData(items, i+1);
    }
    }

function getExternalData(culuuiddata, i)
{
    console.log(culuuiddata.uuid);
    
var mongo = require('mongodb');
var dbcon = require('./secrets').dbcon;
var mongohq_url = dbcon.mongohq_url;
//var dbName = connectionUri.pathname.replace(/^\//, '');

    var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;    
    
  Db.connect(mongohq_url, function(error, client) {
  if (error) throw error;
   console.log('connection opened');
    client.collection('UserMaster', function(error, collection) {
    if (error) throw error;    
    console.log('connection step2.5 - collection');

      collection.find({'_id':new BSON.ObjectID(culuuiddata.uuid)}).toArray(function(error, items){
          if (!error || items.length > 0) console.log('displaying fetched item 0 - ' + items[0]._id + ' ' + items[0].name.first); 
          else throw error;     
          }) ;  
            //client.close();            
        });
       
    });    
    
}
    
