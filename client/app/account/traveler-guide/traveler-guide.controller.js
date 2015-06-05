'use strict';

angular.module('jrnyApp').controller('travelersurvivalCtrl', function ($scope, $http, $stateParams, User) {
	$scope.tid = $stateParams.id;
	$scope.lid = $stateParams.lid;

	$scope.m_guide = [];
	$scope.m_show = 1;

	$scope.show = function(idx) {
		$scope.m_show = idx;
	};

	$scope.get_traveler_guide = function() {
		$http.get('/api/user_review/get_user_detail_by_id/' + $scope.lid).
	      success(function(data, status, headers, config) { 
	      	$scope.m_guide = data.local.ApplicationSurvivalGuide;
		  }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.get_traveler_guide();
});
