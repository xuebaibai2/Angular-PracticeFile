/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope) {
                var employee = {
                    firstName: "Cayden",
                    lastName: "Li",
                    gender: "Male"
                };
                $scope.employee = employee;
            });