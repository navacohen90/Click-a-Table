var config = require('./../config.json');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server

// routes
router.post('/init', initData);
router.get('/', getAll);
router.get('/:courseTypeId', getByCourseItem);
router.get('/details/:courseId', getByCourseId);

module.exports = router;

var courseSchema = require('../models/course.model');
var Course = connection.model('Course', courseSchema);

function initData() {
    Course.update({courseId: 3}, {courseTypeId: 1, label: "עוף3", image: "food1.jpg",businessPrice:"30",price:"40"},
        {upsert: true}, //insert if not exists
        function(err, numAffected) {
            if (err)
                res.send(err);
        }
    );

    Course.update({courseId: 4}, {courseTypeId: 1, label: "עוף1", image: "food2.jpg",businessPrice:"40",price:"50"},
        {upsert: true}, //insert if not exists
        function(err, numAffected) {
            if (err)
                res.send(err);
        }
    );

    Course.update({courseId: 5}, {courseTypeId: 2, label: "סושי", image: "food2.jpg",businessPrice:"50",price:"60"},
        {upsert: true}, //insert if not exists
        function(err, numAffected) {
            if (err)
                res.send(err);
        }
    );
}

function getAll(req, res) {
    initData();
    Course.find(function(err, courses) {
        if (err)
            res.send(err);

        res.json(courses); // return all courses in JSON format
    });
}

function getByCourseItem(req, res) {
    if (req.params.courseTypeId == "0") //TODO for init - maybe should find another way
        getAll(req, res);
    else {
        Course.find({courseTypeId: req.params.courseTypeId}, function (err, courses) {
            if (err)
                res.send(err);

            res.json(courses); // return all courses in JSON format
        });
    }
}


function getByCourseId(req, res) {
    if (req.params.courseId != "0") //TODO for init - maybe should find another way
    {
        Course.findOne({courseId: req.params.courseId}, function (err, courses) {
            if (err)
                res.send(err);

            res.json(courses); // return all courses in JSON format
        });
    }
}
