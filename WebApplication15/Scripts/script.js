/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope) {
                var countries = [
                    { name: "UK", cities: [{ name: "London" }, { name: "Manchester" }, { name: "Birmingham" }] },
                    { name: "USA", cities: [{ name: "LA" }, { name: "Chicago" }, { name: "New York" }] },
                    { name: "China", cities: [{ name: "Beijing" }, { name: "Jilin" }, { name: "Yanji" }] },
                ];

                $scope.countries = countries;
            });