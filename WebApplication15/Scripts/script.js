/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope) {
                $scope.message = "Hello, Angular"
            });