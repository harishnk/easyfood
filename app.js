var config = require('./config').config,
	restify = require('restify');

// if(process.env.NODE_ENV != 'development') {
// 	process.addListener('uncaughtException', function (err) {
// 		console.log(JSON.stringify(err));
// 	});
// }

// Create server
var app = restify.createServer();
app.use(restify.queryParser());
app.use(restify.bodyParser());

app.listen(config.server_port, function() {
	console.log('%s listening at %s', app.name, config.server_port);
});

// Wire up routes
module.exports.app = app;
routes = require('./routes/routes');