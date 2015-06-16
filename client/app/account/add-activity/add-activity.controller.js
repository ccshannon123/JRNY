'use strict';

angular.module('jrnyApp')
    .controller('addactivityCtrl', function ($scope, $http, $stateParams, Auth, User, Upload) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_builder = {};

	$scope.m_is_error = 0;
	$scope.m_err_msg = "";

	$scope.dt_str_list = {};
	$scope.arr_dt;
	$scope.dep_dt;
	$scope.cur_dt;

	$scope.m_activity_name = "";
	$scope.m_time;
	$scope.m_duration;
	$scope.m_suggestion = "";

	$scope.timeList = [{'txt': '1:00am', 'val': 1}, {'txt': '2:00am', 'val': 2}, {'txt': '3:00am', 'val': 3}, {'txt': '4:00am', 'val': 4}, {'txt': '5:00am', 'val': 5}, 
						{'txt': '6:00am', 'val': 6}, {'txt': '7:00am', 'val': 7}, {'txt': '8:00am', 'val': 8}, {'txt': '9:00am', 'val': 9}, {'txt': '10:00am', 'val': 10},
						{'txt': '11:00am', 'val': 11}, {'txt': '12:00pm', 'val': 12}, {'txt': '1:00pm', 'val': 13}, {'txt': '2:00pm', 'val': 14}, {'txt': '3:00pm', 'val': 15},
						{'txt': '4:00pm', 'val': 16}, {'txt': '5:00pm', 'val': 17}, {'txt': '6:00pm', 'val': 18}, {'txt': '7:00pm', 'val': 19}, {'txt': '8:00pm', 'val': 20},
						{'txt': '9:00pm', 'val': 21}, {'txt': '10:00pm', 'val': 22}, {'txt': '11:00pm', 'val': 23}, {'txt': '12:00am', 'val': 0}];
	$scope.durationList = [{'txt': '30 minutes', 'val': '30'}, {'txt': '1 hour', 'val': '1'}, {'txt': '2 hours', 'val': '2'}, {'txt': '3 hours', 'val': '3'}, {'txt': '4 hours', 'val': '4'}, {'txt': '5 hours', 'val': '5'}, {'txt': '6 hours', 'val': '6'}, {'txt': '7 hours', 'val': '7'}, {'txt': '8 hours', 'val': '8'}];

	$scope.jrny_days = 0;
	$scope.m_place = null;

	$scope.m_head_title = "Itinerary Builder";

	$scope.week_name = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	$scope.month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.add_activity = function() {
		$scope.setPlace();
		if($scope.m_activity_name == "") {
			$scope.m_is_error = 1;
			$scope.m_err_msg = "Please input name of activity.";
			return;
		}

		if($scope.m_place == null) {
			$scope.m_is_error = 1;
			$scope.m_err_msg = "Please input place.";
			return;
		}

		if($scope.m_suggestion == null) {
			$scope.m_is_error = 1;
			$scope.m_err_msg = "Please input suggestion.";
			return;
		}

		var act_dt = ($( "#act_date" ).datepicker("getDate"));

		$http.post('/api/activity/add_activity', {place: $scope.m_place, iid: $scope.m_builder._id, an: $scope.m_activity_name, adt: act_dt, tm: $scope.m_time, dur: $scope.m_duration, sugg: $scope.m_suggestion}).
			success(function(data, status, headers, config) {
				location.href = "/edit-itinerary/" + $stateParams.id + "/" + $stateParams.date;
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.$watch('file_fav_photo', function () {
        //$scope.upload_fav_photo($scope.file_fav_photo);
    });

    $scope.upload_fav_photo = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                Upload.upload({
                    url: '/api/users/upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                }).error(function (err) {
                    console.log(err);
                });
            }
        }
    };


	$scope.setPlace = function() {
		$scope.m_place = sel_place;
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

       		/*$scope.jrny_days = 1;

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

       		}*/

       		$scope.cur_dt = new Date($stateParams.date);

       		$( "#act_date" ).datepicker( "setDate", $scope.month_name[$scope.cur_dt.getMonth()] + " " + $scope.cur_dt.getDate() + ", " + $scope.cur_dt.getFullYear() );
      
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
    });

});