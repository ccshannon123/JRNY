'use strict';

angular.module('jrnyApp').controller('verificationsCtrl', function ($scope, $http, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_head_title = "Verifications";
	$scope.m_verifications = {};

	$scope.get_verify = function() {
		$http.post('/api/user_account/get_verify', {uid: $scope.getCurrentUser()._id}).
	      success(function(data, status, headers, config) {
	        if(data.result == undefined) {
	        	$scope.m_verifications = data;
	        }

	        $scope.m_verifications.forEach(function(ver) {
	      		if(ver.type == 1)
	      			ver.type_str = "Email Address";
	      		else if(ver.type == 2)
	      			ver.type_str = "Phone Number";

	      	});

	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.check_verify = function(ver, cd) {
		if(ver.code == cd) {
			$http.post('/api/user_account/set_status', {id: ver._id, status: '1'}).
		      success(function(data, status, headers, config) {
		        $scope.get_verify();
		      }).
		      error(function(data, status, headers, config) {
		      });
		} else {
			alert("Code you have entered is not right.");
		}
	};

	$scope.verify_id = function(tp, nm) {
		$http.post('/api/user_account/verify', {type: tp, uid: $scope.getCurrentUser()._id}).
	      success(function(data, status, headers, config) {
	        $scope.get_verify();
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {

	    $scope.$watch(function(scope){return scope.getCurrentUser()._id}, function(){
	      if($scope.getCurrentUser()._id!=undefined){
	          $scope.get_verify();
	      }
	    })
    });
});
