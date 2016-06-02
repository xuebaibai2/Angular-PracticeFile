/// <reference path="angular.min.js" />


var myApp = angular
            .module("myModule", [])
            .controller("myController", function ($scope, $http,$location,$anchorScroll) {
                $http.get("CountryService.asmx/GetData")
                .then(function (res) {
                    $scope.countries = res.data;
                }, function (errer) {

                });

                $scope.scrollTo = function (countryName) {
                    $location.hash(countryName);
                    $anchorScroll();
                }
            });