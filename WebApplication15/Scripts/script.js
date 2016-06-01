/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope) {
                var employees = [
                    { firstName: "Cayden", lastName: "Li", gender: "Male", salary: 55000 },
                    { firstName: "Sara", lastName: "Sun", gender: "Female", salary: 30000 },
                    { firstName: "Mike", lastName: "Qian", gender: "Male", salary: 35000 },
                    { firstName: "Jeff", lastName: "Zhao", gender: "Female", salary: 42000 },
                    { firstName: "Andrew", lastName: "Wang", gender: "Male", salary: 45000 }
                ];
                $scope.employees = employees;
            });