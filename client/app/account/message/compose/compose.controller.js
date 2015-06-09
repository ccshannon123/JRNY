'use strict';

angular.module('jrnyApp')
    .controller('composeCtrl', function ($scope, $http, $stateParams, Auth, User) {
    	$scope.getCurrentUser = Auth.getCurrentUser;
    	$scope.users = {};

    	$scope.remail = "";
    	$scope.msg_content = "";
    	$scope.m_idx = 0;

    	$scope.m_state_id = "";
    	$scope.m_head_title = "Messages";

    	$scope.send = function() {
    		if($stateParams.id == "new")
    			$scope.remail = document.getElementById("sel_user").value;
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

		if($stateParams.id == "new")
			$scope.m_state_id = "";
		else
			$scope.m_state_id = $stateParams.id;

	    $scope.$watch(function(scope){return scope.getCurrentUser().email}, function(){
	      if($scope.getCurrentUser().email!=undefined){
	          $scope.get_user();
	      }
	    })
	    });

    });