'use strict';

angular.module('jrnyApp')
    .controller('itineraryviewCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_builder = {};

	$scope.dt_str_list = {};
	$scope.arr_dt;
	$scope.dep_dt;
	$scope.cur_dt;

	$scope.m_activity;
	$scope.jrny_days = 0;

	$scope.m_head_title = "";

	$scope.week_name = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	$scope.month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.getInteger = function(num) {
		return parseInt(num);
	};

	$scope.fgo_traveler_itinerary = function(a, b) {
		location.href = "/itinerary-view/" + a + "/" + b;
	};

	$scope.show_place =function(place){

		  var infowindow = new google.maps.InfoWindow();
		  map.setCenter(new google.maps.LatLng(place.geometry.location.A, place.geometry.location.F));

		  var marker = new google.maps.Marker({
              map: map,
              place: {
                placeId: place.place_id,
                location: {lat: place.geometry.location.A,lng: place.geometry.location.F}
              }
            });
	};
	
	$scope.get_activity = function() {//{ $query: {receiver: em, rdelete:'0'}, $orderby: { mdate: -1 }}

		if(map == undefined) {
			setTimeout($scope.get_activity, 2000);
			return;
		}
		$http.post('/api/activity/get_activity', {iid: $stateParams.id, adt: $stateParams.date}).
	      success(function(data, status, headers, config) { 

	      	if(data.result != undefined)
	      		return;

	      	$scope.m_activity = [];

	      	data.forEach(function(act) {
	      		act.ltime = act.time + act.duration;
	      		act.suggestion = act.suggestion.replace("\n", "<br />");
	      		if(act.adate != null && act.adate != undefined)
	      		{
	      			if( act.adate.substr(0, 10) == $stateParams.date ) {
	      				$scope.m_activity.push(act);
	      				if(act.place != undefined) {
	      					var marker = new google.maps.Marker({
						      map: map,
						      position: {lat: act.place.geometry.location.A,lng: act.place.geometry.location.F},
						      title: act.place.name
						    });

		      			}
	      			}
	      		}

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
       		tmp_dt.setFullYear($scope.arr_dt.getFullYear(), $scope.arr_dt.getMonth(), $scope.arr_dt.getDate());

       		$scope.dt_str_list[0] = new Date();
       		$scope.dt_str_list[0].setFullYear($scope.arr_dt.getFullYear(), $scope.arr_dt.getMonth(), $scope.arr_dt.getDate());

       		while(!(tmp_dt.getFullYear() == $scope.dep_dt.getFullYear() && tmp_dt.getMonth() == $scope.dep_dt.getMonth() && tmp_dt.getDate() == $scope.dep_dt.getDate()))
       		{
       			tmp_dt.setDate(tmp_dt.getDate() + 1);
       			$scope.dt_str_list[$scope.jrny_days] = new Date();
       			$scope.dt_str_list[$scope.jrny_days].setFullYear(tmp_dt.getFullYear(), tmp_dt.getMonth(), tmp_dt.getDate());

       			$scope.jrny_days++;

       		}
       		
       		$scope.cur_dt = new Date($stateParams.date);
       		
       		$scope.m_builder.str_period = $scope.week_name[$scope.cur_dt.getDay()] + ", " + $scope.month_name[$scope.cur_dt.getMonth()].substr(0, 3) + " " + $scope.cur_dt.getDate() + "," + $scope.cur_dt.getFullYear();

        	$http.get('/api/user_review/get_user_detail_by_id/' + $scope.m_builder.local).
		      success(function(data, status, headers, config) {
		      	$scope.m_head_title = "Your Itinerary for " + data.homeTown.formatted_address;

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