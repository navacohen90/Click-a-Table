var express = require('express');
var router = express.Router();

var config = require('config.json');
var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server

var orderSchema = require('../models/order.model');
var Order = connection.model('Order', orderSchema);
var orderItemSchema = require('../models/orderItem.model');
var OrderItem = connection.model('OrderItem', orderItemSchema);
var courseSchema = require('../models/course.model');
var Course = connection.model('Course', courseSchema);

// var orderService = require('../services/order.service');
// var orderItemService = require('../services/orderItem.service');
// routes
router.post('/addOrderItem', orderItem);
router.get('/viewOrder', viewOrder);

// var async = require('async');
module.exports = router;

function viewOrder(req, res) {
    var date = new Date();
    date.setHours(0,0,0,0);
    Order.findOne({userId: 1, restaurantId: 1, date: date, status: 1}, function(err, order) {
        if (err)
            return handleError(res, err);

        var itemsIds = [];
        OrderItem.find({orderId: order._id}, function(err, items) {
            if (err)
                return handleError(res, err);
            items.forEach(function(item) {
                itemsIds.push(item.courseId);
            });
            //FIXME
            Course.find({id: itemsIds[0].id /*{ $in : itemsIds }*/}, function(err, courses) {
                if (err)
                    return handleError(res, err);
                res.json(courses);
            });
        });

    });

   /* OrderItem.find(/!*{userId: 1, restaurantId: 1, date: date, status: 1}*!/).populate('orders').populate('courses').exec(function(err, orders) {
        if (err) throw err;

        /!*var orderedCourses = [];
        orders.forEach(function(order) {
            order.courses.forEach(function(course) {
                orderedCourses.push(course);
            });
        });*!/

        res.send(); // adTimes should contain all addTimes from his friends
    });*/
 /*   Course.find().populate('orderitems').populate('order', null, {userId: 1, restaurantId: 1, date: date, status: 1}).exec(function(err, docs) {
        if (err)
            return res.send(err);

        res.json(docs);
    });*/

   /* Course
        .find({})
        .populate({
            path: 'orderitems'
        })
        .populate({
            path: 'order',
            match: {userId: 1, restaurantId: 1, date: date}
        })
        .exec(function(err, docs) {
            if (err) throw err;

            res.json(docs);
        })*/
   /* Order.find({userId: 1, restaurantId: 1, date: date})
        .populate('orderitems')
        .populate('course')
        .exec(function(err, docs) {
            if (err)
                return res.send(err);

            res.json(docs.courses);
        });*/
}

function orderItem(req, res) {

    var date = new Date();
    date.setHours(0,0,0,0);
    var orderId;

    Order.findOne({userId: 1, restaurantId: 1, date: date, status: 1}, function(err, res_order) {
        if (err)
            return handleError(res, err);

        if (res_order == null) {
           Order.count({}, function(err, count) {
                createOrder(req, res, err, count);
            });
        } else {
            orderId = res_order._id;
            Course.findOne({
                courseId: req.body.courseId
            }, function(err, res_course) {
                createOrderItem(req, res, orderId, err, res_course);
            });
        }
    });

}

function createOrderItem(req, res, orderId,  err, res_course) {
    if (err)
        return handleError(res, err);

    createNewOrderItem(orderId, res_course._id, req.body.amount, function(err, new_item) {
            if (err)
                return handleError(res, err);

            res.json({isOrdered: true, messages: "ההזמנה בוצעה בהצלחה"});
    });
}

function createOrder(req, res, err, count) {
    if (err)
        return handleError(res, err);

    createNewOrder(/*id*/(count + 1), /*userId*/1, /*restaurantId*/1, /*tableNo*/1, function (err, newItem) {
        if (err)
            return handleError(res, err);
        console.dir(newItem);
        var orderId = newItem._id;
        Course.findOne({ courseId: req.body.courseId}, function(err, res_course) {
            createOrderItem(req, res, orderId, err, res_course);
        });
    });
}

function createNewOrder(courseId, userId, restaurantId, tableNo, callback) {
    var orderId = -1;
    var date = new Date();
    date.setHours(0,0,0,0);

    var newOrder = new Order({orderId: courseId,
        userId: userId,
        restaurantId: restaurantId,
        tableNo: tableNo,
        date: date,
        createTime: 0,
        status: 1 /*open*/ });
    newOrder.save(function(err, newItem) {
        if (err) {
            console.error(err);
            return callback(err);
        }

        console.dir(newItem);
        orderId = newItem._id;

        return callback(null, newOrder);
    });
}

function createNewOrderItem(orderId, courseId, amount, callback) {

    var orderCourse = new OrderItem({
        orderId: orderId,
        courseId: courseId,
        amount: amount,
        orderTime: 0,
        status: 1 /*open*/
    });
    orderCourse.save(function (err, newItem) {
        if (err) {
            console.error(err);
            return callback(err);
        }

        console.dir(newItem);
        orderId = newItem._id;

        return callback(null, orderCourse);
    });

}


function handleError(res, err) {
    console.log(err);
    return res.send(err);
}