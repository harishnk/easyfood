var UserController = require('../controllers/user.js').User;
app = module.parent.exports.app;

app.get('/users/:user_id/recommendations/', function(req, res, next){
	user = new UserController();
	user.getRecommendations(req, res, next);
});