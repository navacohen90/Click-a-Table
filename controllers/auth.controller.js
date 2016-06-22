var express = require('express');
var app = express();
var router = express.Router();

var config = require('config.json');

var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server

var userSchema = require('../models/user.model');
var User = connection.model('User', userSchema);

var tableSchema = require('../models/table.model');
var Table = connection.model('Table', tableSchema);

var request = require('request');

// routes
router.post('/register', function (req, res) {
    var user = new User(req.body);
    User.count({ userName: user.userName }, function (err, count) {
        if (count > 0) {
            res.json({ isAdded: false, message: "שם משתמש  כבר  קיים במערכת", user: user });
            flagAdded = false;
        }
        else {
            User.count({ email: user.email }, function (err, count) {
                if (count > 0) {
                    res.json({ isAdded: false, message: "כתובת המייל קיימת במערכת למשתמש אחר", user: user });
                    flagAdded = false;
                }
                else {
                    user.save();
                    req.session.user = user;
                    res.json({ isAdded: true, message: "משתמש נוסף בהצלחה", user: user });

                }

            });
        }

    });
});

router.post('/login', function (req, res) {
    var testUser = new User(req.body);

    User.findOne({ password: testUser.password, userName: testUser.userName }, function (err, user) {
        if (user) {

            req.session.user = user;
            Table.findOne({ userId: user._id }, function (err, table) {
                if (table != null)
                    req.session.table = table;
                res.json({ isLogged: true, message: "כניסה בוצעה בהצלחה", user: user });
            });
            
            

        }
        else {
            res.json({ isLogged: false, message: "הכניסה נכשלה. נתונים שגויים", user: user });

        }
    });
});


router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

    //req.session_state.reset();
    //res.redirect('/');


});
router.post('/getSessionDetails', function (req, res) {
    res.json({ session: req.session });
});

module.exports = router;