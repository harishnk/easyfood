/*
 * Module dependencies
 */
/*var express = require('express');
  
var app = express();


//middleware...
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/view/public'));

var reactor = require('./routes/reactor');
app.get('/getreco', reactor.react);
app.post('/getreco', reactor.react_post_handler);

app.listen(process.env.PORT);*/
//
var restify = require('restify');
var app = restify.createServer();
var reactor = require('./routes/reactor');
app.get('/getreco/:uuid', reactor.reacttogetreco);
app.post('/getreco/:uuid', reactor.reacttogetreco_post_handler);
app.listen(process.env.PORT);

//var reactor = require('./routes/reactor');
//reactor.reacttogetreco();
