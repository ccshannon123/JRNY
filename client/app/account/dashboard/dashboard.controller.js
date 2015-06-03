'use strict';

angular.module('jrnyApp')
    .controller('dashboardCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_builder = {};
	$scope.m_jrny = {};

	var week_name = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	var month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");


	$scope.get_builder = function() {

		$http.get('/api/traveler_survey/get_builder/' + $scope.getCurrentUser()._id).
	      success(function(data, status, headers, config) { 
	      	if(data.Result == undefined)
	        	$scope.m_builder = data;
	        else
	        	return;

	       	$scope.m_builder.forEach(function(builder) {

	       		var arr_dt = new Date(builder.basic.arrival_date);
	       		var dep_dt = new Date(builder.basic.departure_date);

	       		
	       		builder.str_period = week_name[arr_dt.getDay()] + ", " + month_name[arr_dt.getMonth()].substr(0, 3) + " " + arr_dt.getDate() + " - " + 
	       							week_name[dep_dt.getDay()] + ", " + month_name[dep_dt.getMonth()].substr(0, 3) + " " + dep_dt.getDate();

	        	$http.get('/api/user_review/get_user_detail_by_id/' + builder.traveler).
			      success(function(data, status, headers, config) { 
			        builder.firstName = data.firstName;
			        builder.lastName = data.lastName;
			        builder.photoUrl = data.photoUrl;

			      }).
			      error(function(data, status, headers, config) {
			      });
	        	
	        });
	        
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.get_jrny = function() {

		$http.get('/api/traveler_survey/get_jrny/' + $scope.getCurrentUser()._id).
	      success(function(data, status, headers, config) { 
	      	if(data.Result == undefined)
	        	$scope.m_jrny = data;
	        else
	        	return;

	        $scope.m_jrny.forEach(function(jrny) {

	       		var arr_dt = new Date(jrny.basic.arrival_date);
	       		var dep_dt = new Date(jrny.basic.departure_date);
	       		
	       		
	       		jrny.str_period = week_name[arr_dt.getDay()] + ", " + month_name[arr_dt.getMonth()].substr(0, 3) + " " + arr_dt.getDate() + " - " + 
	       							week_name[dep_dt.getDay()] + ", " + month_name[dep_dt.getMonth()].substr(0, 3) + " " + dep_dt.getDate();

	        	$http.get('/api/user_review/get_user_detail_by_id/' + jrny.local).
			      success(function(data, status, headers, config) { 
			      	jrny.homeTown = data.homeTown;
			        jrny.firstName = data.firstName;
			        jrny.lastName = data.lastName;
			        jrny.photoUrl = data.photoUrl;
			        jrny.uid = data._id;

			      }).
			      error(function(data, status, headers, config) {
			      });
	        	
	        });
	        
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.accept_itinerary = function(jid, idx) {
		$http.get('/api/traveler_survey/accept_itinerary/' + jid).
			success(function(data, status, headers, config) { 
				$scope.m_builder[idx].isaccept = "1";
			}).
			error(function(data, status, headers, config) {
	    });
	};

	angular.element(document).ready(function () {
    	if($scope.getCurrentUser().email == undefined) {
    		location.href = '/dashboard';
    	}
        $scope.get_builder();
		$scope.get_jrny();
    });

	
});