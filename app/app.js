/// <reference path="angular.js" />

var app = angular.module("myApp", ["ngRoute"]);

app.controller("LoginController", ["$scope", "$http", LoginController]);
app.controller("SelectTableController", ["$scope", "$http", SelectTableController]);
app.controller("RegisterController", ["$scope", "$http", RegisterController]);
app.controller("OrderController", ["$scope", "$http", OrderController]);
app.controller("MenuController", ["$scope", "$routeParams", "$http", MenuController]);
app.controller("CourseController", ["$scope", "$routeParams", "$http", CourseController]);
app.controller("CourseDetailsController", ["$scope", "$routeParams", "$http", CourseDetailsController]);
app.controller("HomeController", ["$scope", "$http", HomeController]);
app.controller("HomePageController", ["$scope", "$http", HomePageController]);
app.controller("ManagerController", ["$scope", "$http", ManagerController]);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'Login/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl: 'Register/register.html',
            controller: 'RegisterController'
        }).
        when('/selectTable', {
            templateUrl: 'SelectTable/selectTable.html',
            controller: 'SelectTableController'
        }).
        when('/order', {
            templateUrl: 'Order/order.html',
            controller: 'OrderController'
        }).
        when('/menu', {
            templateUrl: 'Menu/menu.html',
            controller: 'MenuController'
        }).
        when('/menu/:id', {
            templateUrl: 'Menu/menu.html',
            controller: 'MenuController'
        }).			
        when('/course/:courseTypeId', {
            templateUrl: 'Course/course.html',
            controller: 'CourseController'
        }).
        when('/courseDetails/:courseId', {
            templateUrl: 'CourseDetails/courseDetails.html',
            controller: 'CourseDetailsController'
        }).
        when('/manager', {
            templateUrl: 'MessagesManager/manager.html',
            controller: 'ManagerController'
        }).
        otherwise({
            templateUrl: 'HomePage/homePage.html',
			controller: 'HomePageController'
        });
}]);