'use strict';

angular.module('jrnyApp')
    .controller('HelpNavCtrl', function ($scope, $location) {

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });