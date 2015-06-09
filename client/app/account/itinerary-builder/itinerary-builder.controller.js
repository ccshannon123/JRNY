'use strict';

angular.module('jrnyApp')
    .controller('itinerarybuilderCtrl', function ($scope, $http, $stateParams, Auth, User) {

    /*var myVar;

	function myFunction() {
	    myVar = setTimeout(myFunction, 3000);
	    document.getElementById("abc").innerHTML = document.getElementById("abc").innerHTML + "d";
	}

	function alertFunc() {
	    document.getElementById("abc").innerHTML = document.getElementById("abc").innerHTML + "d";
	}

	$scope.stopTime = function() {
		clearTimeout(myVar);
	}

	myFunction();*/

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_builder = [];
	$scope.m_itinerary = [];
	$scope.arr_dt;
	$scope.dep_dt;

	$scope.m_head_title = "";
	$scope.jrny_days = 0;

	$scope.week_name = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	$scope.month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.get_builder = function() {
		

		$http.get('/api/traveler_survey/get_itinerary/' + $stateParams.id).
	      success(function(data, status, headers, config) { 

	      	if(data.Result == undefined)
	        	$scope.m_builder = data;
	        else
	        	return;

	        $scope.m_builder.m_invited_user = [];

	        $http.get('/api/user_review/get_user_detail_by_id/' + $scope.m_builder.traveler).
		      success(function(data, status, headers, config) { 
		        $scope.m_builder.m_invited_user.push(data);
		        $scope.m_head_title = data.firstName + " " + data.lastName.substr(0, 1) + "'s Jrny to " + $scope.getCurrentUser().homeTown.formatted_address;
		      }).
		      error(function(data, status, headers, config) {
		      });

	        $http.post('/api/traveler_survey/get_invited_user', {traveler: $scope.m_builder.traveler, local: $scope.m_builder.local}).
		      success(function(data, status, headers, config) { 

	      		var ids = data.result;
		      	ids = ids.replace("undefined", "");

		      	
		      	var id_array = ids.split(",");
		      	var i, j;
		      	for(i = 0; i < id_array.length - 1; i++) {
		      		$http.get('/api/user_review/get_user_detail_by_id/' + id_array[i]).
				      success(function(data, status, headers, config) { 
				        $scope.m_builder.m_invited_user.push(data);

				      }).
				      error(function(data, status, headers, config) {
				      });
		      	}

		      }).
		      error(function(data, status, headers, config) {
		      });

       		$scope.arr_dt = new Date($scope.m_builder.basic.arrival_date);
       		$scope.dep_dt = new Date($scope.m_builder.basic.departure_date);

       		var arr_tmp_dt = $scope.arr_dt;
       		var dep_tmp_dt = $scope.dep_dt;

       		arr_tmp_dt.setHours(0); arr_tmp_dt.setMinutes(0); arr_tmp_dt.setSeconds(0);
       		dep_tmp_dt.setHours(0); dep_tmp_dt.setMinutes(0); dep_tmp_dt.setSeconds(0);

       		$scope.jrny_days = (dep_tmp_dt - arr_tmp_dt) / (3600 * 24 * 1000) + 1;

       		for(var i = 0; i < $scope.jrny_days; i++) {
       			var tmp_dt = new Date();
       			tmp_dt.setDate(arr_tmp_dt.getDate() + i);

       			$http.post('/api/activity/get_activity', {iid: $stateParams.id, adt:tmp_dt.toISOString().substr(0, 10)}).
		      		success(function(data, status, headers, config) { 
		      			if(data.result == undefined) {
			      			$scope.m_itinerary.push(data);
			      		} else
			      			$scope.m_itinerary.push({});
		        
				      }).
				      error(function(data, status, headers, config) {
				      });
       		}

       		
       		$scope.m_builder.str_period = $scope.week_name[$scope.arr_dt.getDay()] + ", " + $scope.month_name[$scope.arr_dt.getMonth()].substr(0, 3) + " " + $scope.arr_dt.getDate() + " - " + 
       							$scope.week_name[$scope.dep_dt.getDay()] + ", " + $scope.month_name[$scope.dep_dt.getMonth()].substr(0, 3) + " " + $scope.dep_dt.getDate();

        	$http.get('/api/user_review/get_user_detail_by_id/' + $scope.m_builder.traveler).
		      success(function(data, status, headers, config) { 
		        $scope.m_builder.firstName = data.firstName;
		        $scope.m_builder.lastName = data.lastName;
		        $scope.m_builder.photoUrl = data.photoUrl;

		      }).
		      error(function(data, status, headers, config) {
		      });
	        
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {
        $scope.get_builder();
    });

	
});