'use strict';

angular.module('jrnyApp').controller('locallaunchCtrl', function ($scope, $http, $location, Auth, Upload) {

	$scope.m_head_title = "Sign Up";

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_fn = "";
	$scope.m_ln = "";
	$scope.m_em = "";
	$scope.m_pw = "";
	$scope.m_msg = "";
	$scope.m_isagree;
	$scope.m_is_error = 0;
	$scope.m_place = null;

	$scope.fsignup = function() {
		if($scope.m_fn == "" || $scope.m_fn == undefined) {
			$scope.m_is_error = 1;
			$scope.m_msg = "Please input first name.";
			return;
		}
		if($scope.m_ln == "" || $scope.m_ln == undefined) {
			$scope.m_is_error = 1;
			$scope.m_msg = "Please input last name.";
			return;
		}
		if($scope.m_em == "" || $scope.m_em == undefined) {
			$scope.m_is_error = 1;
			$scope.m_msg = "Please input email address.";
			return;
		}
		if($scope.m_pw == "" || $scope.m_pw == undefined) {
			$scope.m_is_error = 1;
			$scope.m_msg = "Please input password.";
			return;
		}
		if($scope.m_place == null) {
			$scope.m_is_error = 1;
			$scope.m_msg = "Please select place.";
			return;
		}
		if($scope.m_isagree != true) {
			$scope.m_is_error = 1;
			$scope.m_msg = "Please agree to terms and conditions.";
			return;
		}

		$http.post('/api/user_review/create_user', {
			firstName: $scope.m_fn,
            lastName: $scope.m_ln,
            email: $scope.m_em,
            password: $scope.m_pw,
            homeTown: $scope.m_place,
            local: {
                active: 'false',
            }
		}).
          success(function(data, status, headers, config) {
          	$scope.m_is_error = 1;
			$scope.m_msg = "Local successfully created.";
			location.href = "/local-application/" + data._id;
          }).
          error(function(data, status, headers, config) {
          });
	};
});