'use strict';

angular.module('jrnyApp').controller('HomeCtrl', function ($scope, $state, destinationSearch) {
    $scope.destinationSearch = function () {
        destinationSearch.setDestination($scope.destination['formatted_address']);
        $state.go('destination-search');
    };
});