var config = require('config.json');
var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection(config.connectionString);//connect to the db server

//model = collection
var menuSchema = require('../models/menu.model');
var Menu = connection.model('Menu', menuSchema);

var courseSchema = require('../models/course.model');
var Course = connection.model('Course', courseSchema);

var tableSchema = require('../models/table.model');
var Table = connection.model('Table', tableSchema);

var service = {};

service.initMenu = initMenu;
service.initCourses = initCourses;
service.initTables = initTables;

module.exports = service;

function initMenu() {
	console.log("start initMenu");
	
    var obj = new Menu({ id: 1, name: "תפריט", image: "Menu/Menu.png", parentId: 0, onClick: "", hasChildren: true });
    obj.save();

    obj = new Menu({ id: 2, name: "קינוחים", image: "Menu/Desert.png", parentId: 0, onClick: "", hasChildren: false });
    obj.save();

    obj = new Menu({ id: 3, name: "שתיה", image: "Menu/Drink.png", parentId: 0, onClick: "", hasChildren: false });
    obj.save();

    obj = new Menu({ id: 4, name: "מה הזמנתי", image: "Menu/ListFood.png", parentId: 0, onClick: "showOrder", hasChildren: false });
    obj.save();

    obj = new Menu({ id: 5, name: "קריאה למלצר", image: "Menu/CallWaiter.png", parentId: 0, onClick: "callWaiter", hasChildren: false });
    obj.save();

    obj = new Menu({ id: 6, name: "הזמן חשבון", image: "Menu/Payment.png", parentId: 0, onClick: "callBill", hasChildren: false });
    obj.save();

	//---------------------
	
    obj = new Menu({ id: 7, name: "עיקריות", image: "Menu/1.png", parentId: 1, onClick: "", hasChildren: false });
    obj.save();
	
    obj = new Menu({ id: 8, name: "עסקיות", image: "Menu/4.png", parentId: 1, onClick: "", hasChildren: false });
    obj.save();	
	
    obj = new Menu({ id: 9, name: "מנת היום", image: "Menu/3.png", parentId: 1, onClick: "", hasChildren: false });
    obj.save();	

    obj = new Menu({ id: 10, name: "סלטים", image: "Menu/2.png", parentId: 1, onClick: "", hasChildren: false });
    obj.save();	

	console.log("end initMenu");	
}

function initCourses() {
	console.log("start initCourses");

    var obj = new Course({ courseId: 2, courseTypeId: 7, label: "חזה עוף ברוטב שום", image: "Primary/1.jpg",businessPrice:"30",price:"40" });
    obj.save();

    var obj = new Course({ courseId: 3, courseTypeId: 7, label: "סושי בליווי סויה וחומץ בלסמי", image: "Primary/2.jpg",businessPrice:"30",price:"40" });
    obj.save();

    var obj = new Course({ courseId: 4, courseTypeId: 7, label: "המבורגר 300 גרם", image: "Primary/3.jpg",businessPrice:"40",price:"50" });
    obj.save();

      var obj = new Course({ courseId: 4, courseTypeId: 7, label: "שיפודי עוף חמוץ מתוק", image: "Primary/4.jpg",businessPrice:"40",price:"50" });
    obj.save();

    var obj = new Course({ courseId: 5, courseTypeId: 7, label: "דג על גחלים", image: "Primary/6.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 6, courseTypeId: 7, label: "קוביות בשר עם עגבניות מתובלות", image: "Primary/7.jpg",businessPrice:"50",price:"60" });
    obj.save();


    var obj = new Course({ courseId: 8, courseTypeId: 10, label: "סלט יווני עם פטריות", image: "Salads/1.jpg",businessPrice:"30",price:"40" });
    obj.save();

    var obj = new Course({ courseId: 9, courseTypeId: 10, label: "סלט ירקות ברוטב הדרים", image: "Salads/2.jpg",businessPrice:"40",price:"50" });
    obj.save();

    var obj = new Course({ courseId: 10, courseTypeId: 10, label: "סלט מלפפונים בחומץ בלסמי", image: "Salads/3.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 11, courseTypeId: 10, label: "סלט הבית עם פטריות וחלומי", image: "Salads/4.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 12, courseTypeId: 8, label: "בלים פלפל שטה בלווי ציפס", image: "Business/1.jpg",businessPrice:"30",price:"40" });
    obj.save();

    var obj = new Course({ courseId: 13, courseTypeId: 8, label: "בלניצס בשר עם רוטב פטריות", image: "Business/2.jpg",businessPrice:"40",price:"50" });
    obj.save();

    var obj = new Course({ courseId: 14, courseTypeId: 8, label: "מקלות עוף עם אשפלו", image: "Business/3.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 15, courseTypeId: 8, label: "הר אורז עם  ירקות טריות", image: "Business/4.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 16, courseTypeId: 9, label: "קציציות הודו", image: "TodayFood/1.jpg",businessPrice:"30",price:"40" });
    obj.save();

    var obj = new Course({ courseId: 17, courseTypeId: 9, label: "מקלות דג עם ציפס", image: "TodayFood/2.jpg",businessPrice:"40",price:"50" });
    obj.save();

    var obj = new Course({ courseId: 18, courseTypeId: 9, label: "אגרול", image: "TodayFood/3.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 19, courseTypeId: 9, label: "בשר בקר עם פירה ברוטב פטריות", image: "TodayFood/4.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 20, courseTypeId: 9, label: "דג מושט עם אנטיפסטי", image: "TodayFood/5.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 21, courseTypeId: 3, label: "בירה", image: "Drink/1.jpg",businessPrice:"30",price:"40" });
    obj.save();

    var obj = new Course({ courseId: 22, courseTypeId: 3, label: "לימונדה עם נענע", image: "Drink/2.jpg",businessPrice:"40",price:"50" });
    obj.save();

    var obj = new Course({ courseId: 23, courseTypeId: 3, label: "מים עם נענע", image: "Drink/3.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 24, courseTypeId: 3, label: "תפוזים טריים", image: "Drink/4.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 25, courseTypeId: 3, label: "מים מינרליים", image: "Drink/5.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 26, courseTypeId: 3, label: "יין מבעבע", image: "Drink/6.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 27, courseTypeId: 2, label: "שוקולד חם", image: "Desserts/1.jpg",businessPrice:"40",price:"50" });
    obj.save();

    var obj = new Course({ courseId: 28, courseTypeId: 2, label: "מוס קטיפתי בטעם וניל", image: "Desserts/2.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 29, courseTypeId: 2, label: "יוגורט תותים ", image: "Desserts/3.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 30, courseTypeId: 2, label: "מילקשייק עם עוגת הבית ", image: "Desserts/4.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 31, courseTypeId: 2, label: "עוגת שוקולד עם זיגוגים ", image: "Desserts/5.jpg",businessPrice:"50",price:"60" });
    obj.save();

    var obj = new Course({ courseId: 32, courseTypeId: 2, label: "תאנים צלויים עם יין אדום משובח", image: "Desserts/6.jpg",businessPrice:"50",price:"60" });
    obj.save();

    console.log("end initCourses");	

	/*replaced because it's asyncronic
	
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
    );*/
}

function initTables() {
    console.log("start initTables");

    var obj = new Table({ restaurantId: 1, tableNo: 1, minSeats: 1, maxSeats: 4, userId: null,date: null,status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 2, minSeats: 1, maxSeats: 4, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 3, minSeats: 1, maxSeats: 4, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 4, minSeats: 1, maxSeats: 4, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 5, minSeats: 1, maxSeats: 4, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 6, minSeats: 3, maxSeats: 6, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 7, minSeats: 3, maxSeats: 6, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 8, minSeats: 3, maxSeats: 6, userId: null, date: null, status: 0 });
    obj.save();

    var obj = new Table({ restaurantId: 1, tableNo: 9, minSeats: 3, maxSeats: 6, userId: null, date: null, status: 0 });
    obj.save();
    console.log("end initTables");
}
