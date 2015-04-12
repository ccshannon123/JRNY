'use strict';

angular.module('jrnyApp').controller('DestinationSearchCtrl', function ($scope, $location, destinationSearch) {
    $scope.destination = destinationSearch.getDestination();
});