'use strict';

angular.module('jrnyApp').controller('HomeCtrl', function ($scope, $state, Auth,destinationSearch) {

	$scope.getCurrentUser = Auth.getCurrentUser;
	 $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.destinationSearch = function () {
        /*destinationSearch.setDestination($scope.destination['formatted_address']);
        $state.go('destination-search');*/
        //alert(AUTO)
        if($scope.isLoggedIn())
        	location.href = "/local-application/" + $scope.getCurrentUser()._id;
        else
        	location.href = "/local-launch";
    };
});