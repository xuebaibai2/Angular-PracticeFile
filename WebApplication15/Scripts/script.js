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
                             controller: "inlineController as ic"
                         })
                         .when("/students/:id", {
                             templateUrl: "Templates/studentDetail.html",
                             controller: "studentDetailsController as sdc"
                         })
                         .when("/studentsSearch/:name?", {
                             templateUrl: "Templates/studentsSearch.html",
                             controller: "studentSearchController as ssc"
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
                 .controller("studentsController", function ($http, $route, $scope, $location) {

                     //AngularJS cancel route change
                     //When route navigation occurs in an Angular application, the following events are triggered
                     //$locationChangeStart
                     //$routeChangeStart
                     //$locationChangeSuccess
                     //$routeChangeSuccess
                     //$scope.$on("$locationChangeStart", function (event, next, current) {
                     //    if (!confirm("Are you sure you want to navigate away from this page to " + next)) {
                     //        event.preventDefault();
                     //    }
                     //});


                     var viewModel = this;

                     viewModel.searchStudent = function () {
                         if (viewModel.name) {
                             $location.url("/studentsSearch/" + viewModel.name);
                         } else {
                             $location.url("/studentsSearch");
                         }
                     }

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
                 })
                 .controller("studentSearchController", function ($http, $routeParams) {
                     var viewModel = this;
                     if ($routeParams.name) {
                         $http({
                             url: "StudentService.asmx/GetAllStudentsByName",
                             params: { name: $routeParams.name },
                             method: "get"
                         })
                         .then(function (res) {
                             viewModel.students = res.data;
                         });
                     } else {
                         $http.get("StudentService.asmx/GetAllStudents")
                              .then(function (res) {
                                  viewModel.students = res.data;
                              });
                     }
                 });