/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope,$http) {
                $http.get('EmployeeService.asmx/GetAllEmployees')
                .then(function (res) {
                    $scope.employees = res.data;
                });
            });