/// <reference path="angular.js" />
/// <reference path="angular-route.js" />

var app = angular
                 .module("app", ["ngRoute"])
                 .config(function ($routeProvider, $locationProvider) {
                     $routeProvider.caseInsensitiveMatch = true;
                     $routeProvider
                         .when("/home", {
                             templateUrl: "Templates/home.html",
                             controller: "homeController",
                             controllerAs: "hc"
                         })
                         .when("/courses", {
                             templateUrl: "Templates/courses.html",
                             controller: "coursesController",
                             controllerAs: "cc"
                         })
                         .when("/students", {
                             templateUrl: "Templates/students.html",
                             controller: "studentsController as sc"
                         })
                         .when("/inline", {
                             template: "<h1>This is not a html page but a inline template</h1>",
                             controller: "studentsController as sc"
                         })
                         .when("/students/:id", {
                             templateUrl: "Templates/studentDetail.html",
                             controller: "studentDetailsController as sdc"
                         })
                         //Default route
                         .otherwise({
                             redirectTo: "/home"
                         })

                     $locationProvider.html5Mode(true);
                 })
                 .controller("homeController", function () {
                     this.message = "Home Page";
                 })
                 .controller("coursesController", function () {
                     this.courses = ["C#", "VB", "JAVA", "Javascript", "Swift"];
                 })
                 .controller("studentsController", function ($http, $route) {
                     var viewModel = this;
                     viewModel.reloadData = function () {
                         $route.reload();
                     }

                     $http.get("StudentService.asmx/GetAllStudents")
                     .then(function (res) {
                         viewModel.students = res.data;
                     });
                 })
                 .controller("studentDetailsController", function ($http, $routeParams) {
                     var viewModel = this;
                     $http({
                         url: "StudentService.asmx/GetStudent",
                         params: { id: $routeParams.id },
                         method: "get"
                     })
                     .then(function (res) {
                         viewModel.student = res.data;
                     });
                 });