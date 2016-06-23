var express = require('express');
var router = express.Router();

var config = require('config.json');
var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server
var initService = require('services/initdb.service');

//model = collection
var menuSchema = require('../models/menu.model');
var Menu = connection.model('Menu', menuSchema);

var userCallSchema = require('../models/userCall.model');
var UserCall = connection.model('UserCall', userCallSchema);

// routes
router.get('/getMenu', getMenuInit);
router.get('/getMenu/:id', getMenuInit);
router.get('/saveCalls', saveCalls);
router.get('/saveCalls/:type', saveCalls);
router.get('/getById/:id', getById);

module.exports = router;


function getMenuInit(req, res) {
    //do init just in first time
    Menu.count({}, function(err, count){
	   console.log("menu count: " + count);	
	   
       if (count == 0)
           initService.initMenu();
	   
	   getMenu(req, res);
    });
}

function getMenu(req, res) {
	var parentId = req.params.id || 0;
	console.log("getMenu: " + parentId);	
	 
    //find all menu items in db
    Menu.find({ parentId: parentId }, function(err, menu) {
        var menuMap = {};//return object

        //fill up the object
        menu.forEach(function(item) {
            menuMap[item._id] = item;
        });
		
		//console.log("menuMap: " + JSON.stringify(menuMap, null, "\t"));	
		
        //return the menu object
        res.end(JSON.stringify(menuMap, null, "\t"));
    });
}

function getById(req, res) {
    var id = req.params.id;

    Menu.findOne({id: id}, function (err, record) {
        if (err)
            res.send(err);

        res.json(record); // return all courses in JSON format
    });
}

function saveCalls(req, res) {
    var type = req.params.type;
    var date = new Date();
    
    if (req.session.user == null) {
        res.json({ isSaved: false, messages: "לא ניתן לבצע פעולה זו ללא כניסה למערכת/הרשמה" });
        return;
    }
    if (req.session.table == null) {
        res.json({ isSaved: false, messages: "לא ניתן לבצע פעולה זו ללא הזמנת שולחן" });
        return;
    }

    UserCall.count({ userId: req.session.user._id,  tableNo: req.session.table.tableNo, callType: type, status: 1}, function (err, count) {
        if (count <= 0) {
            var newUserCall = new UserCall({
                userId: req.session.user._id,
                restaurantId: 1,
                tableNo: req.session.table.tableNo,
                date: date,
                callType: type,
                status: 1 /*open*/
            });

            newUserCall.save(function (err, newUserCall) {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            var message;
            switch (type) {
                case "Waiter":
                    message = "מלצר בדרך אליך";
                    break;

                case "Bill":
                    message = "חשבון בדרך אליך";
                    break;

                default:
                    message = "סוג קריאה לא ידוע. קריאה נשמרה במערכת";
                    break;
            }
            res.json({ isSaved: true, messages: message });
        }
    });


}
