'use strict';

angular.module('jrnyApp')
    .controller('travelcompanionCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_user_list = [];
	$scope.m_name = "";
	$scope.m_current_user = [];
	$scope.m_invited_user = [];

	$scope.m_head_title = "Travel Companions";

	$scope.get_user_list = function() {
		$http.get('/api/user_review/get_user_list').
	      success(function(data, status, headers, config) { 
	      	$scope.m_user_list = [];
	      	var tmp_list = data;

	        tmp_list.forEach(function(user) {
	        	if(user._id != $scope.getCurrentUser()._id && user._id != $stateParams.em)
	        		$scope.m_user_list.push(user);

	        });
	        $scope.get_invited_user();
		  }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.sel_user = function() {
		$scope.m_name = document.getElementById("sel_name").value;
		$scope.m_current_user = $scope.m_user_list[document.getElementById("sel_name").selectedIndex];
	};

	$scope.get_invited_user = function () {
		$http.post('/api/traveler_survey/get_invited_user', {traveler: $scope.getCurrentUser()._id, local: $stateParams.em}).
	      success(function(data, status, headers, config) { 
	      	var ids = data.result;
	      	ids = ids.replace("undefined", "");

	      	$scope.m_invited_user = [];
	      	var id_array = ids.split(",");
	      	var i, j;
	      	for(i = 0; i < id_array.length - 1; i++) {
	      		for(j = 0; j < $scope.m_user_list.length; j++) {
	      			if($scope.m_user_list[j]._id == id_array[i])
	      			{
	      				$scope.m_invited_user.push($scope.m_user_list[j]);
	      			}
	      		}
	      	}
		  }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.invite_user = function() {
		if($scope.m_name == "") {
			alert("Please select user name to invite.");
			return;
		}

		for(var i = 0; i < $scope.m_invited_user.length; i++) 
			if($scope.m_invited_user[i]._id == $scope.m_current_user._id) {
				alert("This member is already invited.");
				return;
			}

		$http.post('/api/traveler_survey/invite_user', {traveler: $scope.getCurrentUser()._id, local: $stateParams.em, user: $scope.m_current_user._id}).
	      success(function(data, status, headers, config) { 
	      	$scope.get_invited_user();
		  }).
	      error(function(data, status, headers, config) {
	      });

	};

	$scope.remove_invited_user = function(idx) {
		$http.post('/api/traveler_survey/remove_invited_user', {traveler: $scope.getCurrentUser()._id, local: $stateParams.em, user: idx}).
	      success(function(data, status, headers, config) { 
	      	$scope.get_invited_user();
		  }).
	      error(function(data, status, headers, config) {
	      });

	};

	$scope.get_user_list();	
});