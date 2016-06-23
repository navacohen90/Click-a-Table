var express = require('express');
var router = express.Router();

var config = require('config.json');
var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server

// var messageSchema = require('../models/message.model');
// var Message = connection.model('Message', messageSchema);

var userCallSchema = require('../models/userCall.model');
var UserCall = connection.model('UserCall', userCallSchema);
var orderItemSchema = require('../models/orderItem.model');
var OrderItem = connection.model('OrderItem', orderItemSchema);
var courseSchema = require('../models/course.model');
var Course = connection.model('Course', courseSchema);
var orderSchema = require('../models/order.model');
var Order = connection.model('Order', orderSchema);
var tableSchema = require('../models/table.model');
var Table = connection.model('Table', tableSchema);

// routes
// router.post('/addMessage', addMessage);
router.post('/closeMessage', closeMessage);
router.post('/closeOrderItem', closeOrderItem);
router.get('/viewOpenUserCallMessages', getOpenUserCallMessages);
router.get('/viewOpenOrders', getOpenOrders);

// var async = require('async');
module.exports = router;
function getOpenUserCallMessages(req, res) {
    UserCall.find({status: 1}).sort({date: 1}).exec(function(err, messages) {
        if (err)
            return handleError(res, err);
        res.json(messages);
    });
}

function getOpenOrders(req, res) {
    getOpenOrdersList(function (err, courses) {
        if (err)
            return handleError(res, err);
        res.json(courses);
    });
}

function getOpenOrdersList(callback) {
    var courses = [];

    //find all order items
    OrderItem.find({status: 1}).sort({orderTime: 1}).exec(function(err, items) {
        if (err)
            return callback(err);

        var index = 0;
        if (items.length <= 0)
            return callback(null, courses);
        
        items.forEach(function(item) {
            console.log("order items: " + item);

            Order.findOne({id : item.orderId}, function(err, order) {
                if (err)
                    return callback(err);

                Course.findOne({courseId: item.courseId}, function (err, course) {
                    if (err)
                        return callback(err);

                    if (course != null) {
                        courses.push({
                            orderId: order.id,
                            tableNo: order.tableNo,
                            courseId: course.courseId,
                            label: course.label,
                            price: course.price,
                            amount: item.amount
                        });

                    }

                    index++;

                    if (index == items.length)
                        return callback(null, courses);
                });
            });
        });
    });

}

function closeMessage(req, res) {

    var tableNo = req.body.tableNo;
    var type = req.body.type;
    var restaurantId = 1;

    switch (type) {
        case "Waiter":
            closeCall(restaurantId, type, tableNo, function (err, numAffected) {
                if (err)
                    res.send(err);
                res.json({isDone: true, messages: "קריאה נסגרה"});
            });
            break;

        case "Bill":
            getOpenOrdersList(function(err, courses) {
                var userCourses = [];
               courses.forEach(function(item) {
                   var tableNo = req.body.tableNo;
                   if (item.tableNo == tableNo)
                       userCourses.push(item);
               });

                if (userCourses.length > 0) {
                    res.json({isDone: false, messages: "לא ניתן לקבל חשבונית, ישנן הזמנות פתוחות"});
                }
                else {
                    var tableNo = req.body.tableNo;
                    closeOrderByTableNo(tableNo, function (err, numAffected) {
                        if (err)
                            return handleError(res, err);
                        closeTable(tableNo, function (err, numTablesAffected) {
                            if (err)
                                return handleError(res, err);
                            closeCall(restaurantId, type, tableNo, function (err, numAffected) {
                                if (err)
                                    handleError(res, err);
                                res.json({isDone: true, messages: "הזמנה נסגרה, שולחן מספר " + tableNo + " נסגר, חשבונית נשלחה"});
                            });
                        });
                    });
                }

            });
            break;

        default:
            break;
    }
}

function closeCall(restaurantId, type, tableNo, callback) {

    UserCall.update({ /*userId: req.session.user._id,*/ restaurantId: restaurantId, tableNo: tableNo, callType: type, status: 1}, {status: 0},
        function(err, numAffected) {
            if (err)
                return callback(err);
            return callback(null, numAffected);//res.json({isDone: true, messages: "קריאה נסגרה"});
        }
    );
}

function closeOrderItem(req, res) {
    var courseId = req.body.courseId;
    var orderId = req.body.orderId;

    OrderItem.update({ orderId: orderId, courseId: courseId, status: 1}, {status: 0},
        function(err, numAffected) {
            if (err)
                res.send(err);
            res.json({isDone: true, messages: "הזמנה נסגרה"});
        }
    );
}

function closeOrder(req, res) {
    var tableNo = req.body.tableNo;
    // var orderId = req.body.orderId;

    closeOrderByTableNo(tableNo, function (err, numAffected) {
        if (err)
            return handleError(res, err);
        res.json({isDone: true, messages: "הזמנה נסגרה"});
    });
}


function closeOrderByTableNo(tableNo, callback) {
    var date = new Date();
    date.setHours(0,0,0,0);


    Order.update({ tableNo: tableNo, date: date, status: 1}, {status: 0},
        function(err, numAffected) {
            if (err)
                return callback(err);
            return callback(null, numAffected);
            // res.json({isDone: true, messages: "הזמנה נסגרה"});
        }
    );
}


function closeTable(tableNo, callback) {
    Table.update({ tableNo: tableNo, /*date: new Date(),*/ status: 1}, {status: 0, userId: null},
        function (err, numAffected) {
            if (err) {
                console.error(err);
                return callback(err);
            }
            return callback(null, numAffected);
        }
    );

}

function handleError(res, err) {
    console.log(err);
    return res.send(err);
}