﻿/// <reference path="angular.js" />
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
                         .state("studentParent", {
                             url: "/students",
                             controller: "studentParentController",
                             controllerAs: "stdParentCtrl",
                             templateUrl: "Templates/studentParent.html",
                             resolve: {
                                 studentTotals: function ($http) {
                                     return $http.get("StudentService.asmx/GetStudentTotals")
                                             .then(function (response) {
                                                 return response.data;
                                             })
                                 }
                             },
                             abstract: true
                         })
                         .state("studentParent.students", {
                             url: "/",
                             views: {
                                 "studentData": {
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
                                 },
                                 "totalData": {
                                     templateUrl: "Templates/studentsTotal.html",
                                     controller: "studentTotalController as stc",
                                 }
                             },
                         })
                         .state("studentParent.studentDetails", {
                             url: "/:id",
                             views: {
                                 "studentData": {
                                     templateUrl: "Templates/studentDetail.html",
                                     controller: "studentDetailsController as sdc"
                                 }
                             },

                         })
                         .state("inline", {
                             url: "/inline",
                             template: "<h1>This is not a html page but a inline template</h1>",
                             controller: "inlineController as ic"
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
                 .controller("studentParentController", function (studentTotals) {
                     this.males = studentTotals.males;
                     this.females = studentTotals.females;
                     this.total = studentTotals.total;
                 })
                 .controller("studentsController", function (studentList, $state, $location, studentTotals) {

                     var viewModel = this;

                     viewModel.searchStudent = function () {
                         $state.go("studentSearch", { name: viewModel.name });
                     }

                     viewModel.reloadData = function () {
                         $state.reload();
                     }
                     viewModel.students = studentList;
                     viewModel.studentTotals = studentTotals;
                 })
                 .controller("studentTotalController", function (studentTotals) {
                     this.total = studentTotals.total;
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