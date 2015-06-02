'use strict';

angular.module('jrnyApp')
    .controller('composeCtrl', function ($scope, $http, $stateParams, Auth, User) {
    	$scope.getCurrentUser = Auth.getCurrentUser;
    	$scope.users = {};

    	$scope.remail = "";
    	$scope.msg_content = "";
    	$scope.m_idx = 0;

    	$scope.send = function() {
    		var dt = new Date();
			if($scope.remail == "") {
				alert("Please select user.");
				return;
			}
    		$http.post('/api/message/send', {semail:$scope.getCurrentUser().email, remail:$scope.remail, ct:$scope.msg_content, dt:dt}).
		      success(function(data, status, headers, config) { 
		        location.href = "/message_sent";
		      }).
		      error(function(data, status, headers, config) {
		      });
    	}

    	$scope.get_user = function() {
			$http.get('/api/user_review/get_user/' + $scope.getCurrentUser().email).
		      success(function(data, status, headers, config) { 
		        $scope.users = data;
		        for(var i = 0; i < data.length; i++) {
		        	if(data[i]._id == $stateParams.id) {
		        		$scope.remail = data[i].email;
		        		$scope.m_idx = i;    		
		        	}
		        }
		      }).
		      error(function(data, status, headers, config) {
		      });
		};

		angular.element(document).ready(function () {
	    	if($scope.getCurrentUser().email == undefined) {
	    		location.href = '/message_write';
	    	}
	        $scope.get_user();
	    });

    });