'use strict';

angular.module('jrnyApp').controller('travelersurvivalCtrl', function ($scope, $http, $stateParams, User) {
	$scope.tid = $stateParams.id;
	$scope.lid = $stateParams.lid;

	$scope.m_guide = [];
	$scope.m_show = 1;

	$scope.m_font_bold = new Array('bold', '', '', '', '', '', '', '');

	$scope.m_head_title = "Survival Guide";

	$scope.show = function(idx) {
		$scope.m_show = idx;

		for(var i = 0; i < 8; i++)
			$scope.m_font_bold[i] = '';
		$scope.m_font_bold[idx - 1] = 'bold';
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
