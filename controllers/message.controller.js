var express = require('express');
var router = express.Router();

var config = require('config.json');
var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server

// var messageSchema = require('../models/message.model');
// var Message = connection.model('Message', messageSchema);

var userCallSchema = require('../models/userCall.model');
var UserCall = connection.model('UserCall', userCallSchema);

// routes
// router.post('/addMessage', addMessage);
router.post('/closeMessage', closeMessage);
router.get('/viewOpenMessages', getOpenMessages);

// var async = require('async');
module.exports = router;
function getOpenMessages(req, res) {
    UserCall.find({status: 1}, function(err, messages) {
        if (err)
            return handleError(res, err);
        res.json(messages);
    });
}
/*
function addMessage(req, res) {
    var tableNo = req.body.tableNo;
    var type = req.body.type;
    Message.count({ userId: req.session.user, tableNo: tableNo, type: type, status: 1}, function (err, count) {
        if (count <= 0) {
            var obj = new Message({ userId: req.session.user, tableNo: tableNo, type: type, status: 1, createTime: 0 });
            obj.save(function (err, newItem) {
                if (err)
                    return handleError(res, err);
                res.json({isDone: true, messages: "מלצר בדרך"});
            });
        }
    });
}*/

function closeMessage(req, res) {
    var tableNo = req.body.tableNo;
    var type = req.body.type;
    var type = req.body.restaurantId;


    UserCall.update({ /*userId: req.session.user._id,*/ restaurantId: 1, tableNo: tableNo, callType: type, status: 1}, {status: 0},
        function(err, numAffected) {
            if (err)
                res.send(err);
            res.json({isDone: true, messages: "קריאה נסגרה"});
        }
    );
}

function handleError(res, err) {
    console.log(err);
    return res.send(err);
}