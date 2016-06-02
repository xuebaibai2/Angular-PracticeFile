/// <reference path="angular.js" />
var app = angular.module("app", [])
                    .controller("anchorController",function($scope,$location,$anchorScroll){
                        $scope.scrollTo = function (scrollLoaction) {
                            $location.hash(scrollLoaction);
                            $anchorScroll.yOffset = 20;
                            $anchorScroll();
                        }
                    });