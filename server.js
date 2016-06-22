require('rootpath')();
var express = require('express'); //for routing
var app = express(); //init the server
var config = require('config.json');
var path = require('path');
var port = process.env.PORT || 3000;
//initalization for using POST calls
var bodyParser = require('body-parser');


app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});


app.use(bodyParser.urlencoded({ extended: false }));//read URL encoded
app.use(bodyParser.json()); //read json data

var session = require('express-session');
app.use(session({
    secret: "hashsecret", resave: true,
    saveUninitialized: true
}));

//static routes init
app.use('/app', express.static('app'));

app.use('/auth', require('./controllers/auth.controller'));
app.use('/menu', require('./controllers/menu.controller'));
app.use('/courses', require('./controllers/course.controller'));
app.use('/message', require('./controllers/message.controller'));
app.use('/order', require('./controllers/order.controller'));
app.use('/table', require('./controllers/table.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});


//listen on port
var server = app.listen(port, function(){
   console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
