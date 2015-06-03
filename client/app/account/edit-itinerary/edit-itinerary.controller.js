'use strict';

angular.module('jrnyApp')
    .controller('edititineraryCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_builder = {};

	$scope.dt_str_list = {};
	$scope.arr_dt;
	$scope.dep_dt;
	$scope.cur_dt;

	$scope.m_activity;
	$scope.jrny_days = 0;

	$scope.week_name = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	$scope.month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.get_activity = function() {//{ $query: {receiver: em, rdelete:'0'}, $orderby: { mdate: -1 }}
		$http.post('/api/activity/get_activity', {iid: $stateParams.id, adt: $stateParams.date}).
	      success(function(data, status, headers, config) { 

	      	if(data.result != undefined)
	      		return;
	      	$scope.m_activity = data;

	      	$scope.m_activity.forEach(function(act) {
	      		act.ltime = act.time + act.duration;
	      	});

	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.get_builder = function() {

		$http.get('/api/traveler_survey/get_itinerary/' + $stateParams.id).
	      success(function(data, status, headers, config) { 

	      	if(data.Result == undefined)
	        	$scope.m_builder = data;
	        else
	        	return;	       	


       		$scope.arr_dt = new Date($scope.m_builder.basic.arrival_date);
       		$scope.dep_dt = new Date($scope.m_builder.basic.departure_date);

       		$scope.jrny_days = 1;

       		var tmp_dt = new Date();
       		tmp_dt = $scope.arr_dt;

       		while(!(tmp_dt.getFullYear() == $scope.dep_dt.getFullYear() && tmp_dt.getMonth() == $scope.dep_dt.getMonth() && tmp_dt.getDate() == $scope.dep_dt.getDate()))
       		{
       			$scope.dt_str_list[$scope.jrny_days - 1] = tmp_dt;
       			$scope.jrny_days++;
       			tmp_dt = new Date();
       			tmp_dt.setDate($scope.arr_dt.getDate() + $scope.jrny_days - 1);
       		}
       		$scope.dt_str_list[$scope.jrny_days] = tmp_dt;
       		$scope.cur_dt = new Date($stateParams.date);
       		
       		$scope.m_builder.str_period = $scope.week_name[$scope.cur_dt.getDay()] + ", " + $scope.month_name[$scope.cur_dt.getMonth()].substr(0, 3) + " " + $scope.cur_dt.getDate() + "," + $scope.cur_dt.getFullYear();

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
        $scope.get_activity();
    });

	
});