/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .filter("gender", function () {
                return function (gender) {
                    switch (gender) {
                        case 1:
                            return "Male";
                        case 2:
                            return "Female";
                        case 3:
                            return "Not disclosed";
                    }
                }
            })
            .controller("myController", function ($scope) {
                var employees = [
                    { name: "Cayden", dateOfBirth: new Date("July 24, 1990"), gender: 1, salary: 90000.66, city: "Sydney" },
                    { name: "Lee", dateOfBirth: new Date("June 24, 1990"), gender: 1, salary: 9453.66, city: "safdblsb" },
                    { name: "Krystal", dateOfBirth: new Date("April 24, 1990"), gender: 3, salary: 4864.66, city: "sdjogh" },
                    { name: "Mike", dateOfBirth: new Date("December 24, 1990"), gender: 2, salary: 4000.66, city: "hwe4rt" },
                    { name: "Jane", dateOfBirth: new Date("January 24, 1990"), gender: 2, salary: 70000.66, city: "ikpoojvb" },
                ];

                $scope.employees = employees;




            });