require('rootpath')();
var express = require('express'); //for routing
var app = express(); //init the server
var config = require('config.json');
var path = require('path');
var port = process.env.PORT || 3000;

//initalization for using POST calls
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//read URL encoded
app.use(bodyParser.json()); //read json data

//static routes init
app.use('/app', express.static('app'));
app.use('/api/menu', require('./controllers/menu.controller'));
app.use('/api/courses', require('./controllers/course.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

//listen on port
var server = app.listen(port, function(){
   console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
