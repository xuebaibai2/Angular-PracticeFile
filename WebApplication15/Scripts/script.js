/// <reference path="angular.min.js" />

//var myApp = angular
//            .module("myModule", [])
//            .controller("myController", function ($scope) {
//                var employee = {
//                    firstName: "Cayden",
//                    lastName: "Li",
//                    gender: "Male"
//                }
//                $scope.message = "AngularJS Tutorial";
//                $scope.employee = employee;
//            });

var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope) {
                var pic = {
                    name: "TestPic",
                    img: "/img/testimg.jpg"
                };
                $scope.pic = pic;
            });