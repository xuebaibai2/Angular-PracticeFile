/// <reference path="angular.js" />
/// <reference path="angular-route.js" />

var app = angular
                 .module("app", ["ui.router"])
                 .config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
                     $urlMatcherFactoryProvider.caseInsensitive(true);
                     //Default route
                     $urlRouterProvider.otherwise("/home");
                     $stateProvider
                         .state("home", {
                             url: "/home",
                             templateUrl: "Templates/home.html",
                             controller: "homeController",
                             controllerAs: "hc",
                             data: {
                                 customData1: "Home State Custom Data 1",
                                 customData2: "Home State Custom Data 2"
                             }
                         })
                         .state("courses", {
                             url: "/courses",
                             templateUrl: "Templates/courses.html",
                             controller: "coursesController",
                             controllerAs: "cc",
                             data: {
                                 customData1: "Courses State Custom Data 1",
                                 customData2: "Courses State Custom Data 2"
                             }
                         })
                         .state("students", {
                             url: "/students",
                             templateUrl: "Templates/students.html",
                             controller: "studentsController as sc",
                             resolve: {
                                 studentList: function ($http) {
                                     return $http.get("StudentService.asmx/GetAllStudents")
                                                 .then(function (res) {
                                                     return res.data;
                                                 });
                                 }
                             }
                         })
                         .state("inline", {
                             url: "/inline",
                             template: "<h1>This is not a html page but a inline template</h1>",
                             controller: "inlineController as ic"
                         })
                         .state("studentDetails", {
                             url: "/students/:id",
                             templateUrl: "Templates/studentDetail.html",
                             controller: "studentDetailsController as sdc"
                         })
                         .state("studentSearch", {
                             url: "/studentsSearch/:name",
                             templateUrl: "Templates/studentsSearch.html",
                             controller: "studentSearchController as ssc"
                         })

                     $locationProvider.html5Mode(true);
                 })
                 .controller("homeController", function ($state) {
                     this.message = "Home Page";

                     this.homeCustomData1 = $state.current.data.customData1;
                     this.homeCustomData2 = $state.current.data.customData2;

                     this.coursesCustomData1 = $state.get("courses").data.customData1;
                     this.coursesCustomData2 = $state.get("courses").data.customData2;
                 })
                 .controller("coursesController", function () {
                     this.courses = ["C#", "VB", "JAVA", "Javascript", "Swift"];
                 })
                 .controller("studentsController", function (studentList, $state, $location) {

                     var viewModel = this;

                     viewModel.searchStudent = function () {
                         $state.go("studentSearch", { name: viewModel.name });
                     }

                     viewModel.reloadData = function () {
                         $state.reload();
                     }
                     viewModel.students = studentList;
                 })
                 .controller("studentDetailsController", function ($http, $stateParams) {
                     var viewModel = this;
                     $http({
                         url: "StudentService.asmx/GetStudent",
                         params: { id: $stateParams.id },
                         method: "get"
                     })
                     .then(function (res) {
                         viewModel.student = res.data;
                     });
                 })
                 .controller("studentSearchController", function ($http, $stateParams) {
                     var viewModel = this;
                     if ($stateParams.name) {
                         $http({
                             url: "StudentService.asmx/GetAllStudentsByName",
                             params: { name: $stateParams.name },
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
                 })
;