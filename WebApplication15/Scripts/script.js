/// <reference path="angular.js" />
/// <reference path="angular-route.js" />

var app = angular
                 .module("app", ["ngRoute"])
                 .config(function ($routeProvider,$locationProvider) {
                     $routeProvider
                         .when("/home", {
                             templateUrl: "Templates/home.html",
                             controller: "homeController"
                         })
                         .when("/courses", {
                             templateUrl: "Templates/courses.html",
                             controller: "coursesController"
                         })
                         .when("/students", {
                             templateUrl: "Templates/students.html",
                             controller: "studentsController"
                         })
                         .when("/students/:id", {
                             templateUrl: "Templates/studentDetail.html",
                             controller: "studentDetailsController"
                         })
                         //Default route
                         .otherwise({
                             redirectTo: "/home"
                         })
                     $locationProvider.html5Mode(true);
                 })
                 .controller("homeController", function ($scope) {
                     $scope.message = "Home Page";
                 })
                 .controller("coursesController", function ($scope) {
                     $scope.courses = ["C#", "VB", "JAVA", "Javascript", "Swift"];
                 })
                 .controller("studentsController", function ($scope, $http) {
                     $http.get("StudentService.asmx/GetAllStudents")
                     .then(function (res) {
                         $scope.students = res.data;
                     });
                 })
                 .controller("studentDetailsController", function ($scope, $http, $routeParams) {
                     $http({
                         url: "StudentService.asmx/GetStudent",
                         params: { id: $routeParams.id },
                         method: "get"
                     })
                     .then(function (res) {
                         $scope.student = res.data;
                     });
                 });