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
	
	console.log("start viewOrder");
	
    if (req.session.user == null) {
		res.json(courses);
        return;
    }
	
	var courses = [];
    Order.findOne({userId: req.session.user._id, restaurantId: 1, date: date, status: 1}, function(err, order) {
        if (err)
            return handleError(res, err);

		if (order == null) {
			res.json(courses);
			return;
		}
	
        //console.log("start find OrderItems, orderId: " + order._id);
		
        OrderItem.find({orderId: order.id}, function(err, items) {
            if (err)
                return handleError(res, err);
			
			var index = 0;
            items.forEach(function(item) {
				console.log("order items: " + item);
				
				
				Course.findOne({courseId: item.courseId}, function(err, course) {
					//console.log("start Course findOne err:" + err);
					if (err)
						return handleError(res, err);
					
					//console.log("start Course findOne course: " + course);
					
					if (course != null) {
						courses.push({ courseId: course.courseId, label: course.label, price: course.price, amount: item.amount });
					}
					
					index++;
					
					if (index == items.length)
						res.json(courses);
				});
			});
		});
		
		
	});
}

function orderItem(req, res) {
    if (req.session.user == null) {
        res.json({ isOrdered: false, messages: "לא ניתן לבצע פעולה זו ללא כניסה למערכת/הרשמה" });
        return;
    }
    if (req.session.table == null) {
        res.json({ isSaved: false, messages: "לא ניתן לבצע פעולה זו ללא הזמנת שולחן" });
        return;
    }

    var restaurantId = 1;
	
    var date = new Date();
    date.setHours(0,0,0,0);
    var orderId;

	console.log("orderItem courseId: " + req.body.courseId);
	console.log("orderItem userId: " + req.session.user._id);
	
    Order.findOne({userId: req.session.user._id, restaurantId: restaurantId, date: date, status: 1}, function(err, res_order) {
        if (err)
            return handleError(res, err);

        if (res_order == null) {
			console.log("orderItem res_order is null");
			
           Order.count({}, function(err, count) {
                createOrder(req, res, err, count);
            });
        } else {
			console.log("orderItem res_order._id: " + res_order._id);
			
            orderId = res_order.id;
			createOrderItem(req, res, orderId);
        }
    });
}

function createOrderItem(req, res, orderId) {
	console.log("createOrderItem amount: " + req.body.amount);
	
    createNewOrderItem(orderId, req.body.courseId, req.body.amount, function(err, new_item) {
            if (err)
                return handleError(res, err);

            res.json({isOrdered: true, messages: "ההזמנה בוצעה בהצלחה"});
    });
}

function createOrder(req, res, err, count) {
    if (err)
        return handleError(res, err);

    createNewOrder(/*id*/(count + 1), req.session.user._id, /*restaurantId*/1, /*tableNo*/req.session.table.tableNo, function (err, newItem) {
        if (err)
            return handleError(res, err);
        console.dir(newItem);
        var orderId = newItem.id;
        createOrderItem(req, res, orderId);
    });
}

function createNewOrder(orderId, userId, restaurantId, tableNo, callback) {
    var date = new Date();
    date.setHours(0,0,0,0);

    var newOrder = new Order({
		id: orderId,
        userId: userId,
        restaurantId: restaurantId,
        tableNo: tableNo,
        date: date,
        createTime: new Date(),
        status: 1 /*open*/ 
	});
	
    newOrder.save(function(err, newItem) {
        if (err) {
            console.error(err);
            return callback(err);
        }

        console.dir(newItem);
        orderId = newItem.id;

        return callback(null, newOrder);
    });
}

function createNewOrderItem(orderId, courseId, amount, callback) {

    var orderCourse = new OrderItem({
        orderId: orderId,
        courseId: courseId,
        amount: amount,
        orderTime: new Date(),
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