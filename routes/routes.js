var UserController = require('../controllers/user.js').User;

app = module.parent.exports.app;

//Wire-up everything

// http://localhost:3000/users/me?accessToken=SIZ2MVM0G4LOGUPE2PQWBDKEXDMQ4M3PBF4OTDSMX2MCSQGS
app.get('/users/me', function(req, res, next){
	UserController.getSocialSelf(req, res, next);
});

//http://localhost:3000/users/me/friends?accessToken=SIZ2MVM0G4LOGUPE2PQWBDKEXDMQ4M3PBF4OTDSMX2MCSQGS
app.get('/users/:user_id/friends', function(req, res, next){
	UserController.getFriends(req, res, next);
});

app.get('/users/:user_id/recommendations', function(req, res, next){
	UserController.getRecommendations(req, res, next);
});

// Login page for the app (go here first)
app.get('/external/foursquare/login', function(req, res, next) {
	UserController.fsqLogin(req, res, next);
});

app.get('/external/foursquare/callback', function(req, res, next){
	UserController.fsqLoginComplete(req, res, next);
});