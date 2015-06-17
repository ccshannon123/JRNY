'use strict';

angular.module('jrnyApp')
    .controller('traveleritineraryCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_builder = {};
	$scope.m_itinerary = [];
	$scope.arr_dt;
	$scope.dep_dt;

	$scope.m_messages = [];
	$scope.m_msg = "";

	$scope.jrny_days = 0;

	$scope.m_head_title = "";

	$scope.m_page = 1;
	$scope.m_cur_cnt;
	$scope.m_off_date;
	$scope.m_offset = 0;

	$scope.week_name = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	$scope.month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	$scope.go_next = function() {

		var fpg_cnt;
		if($scope.arr_dt.getDay() + $scope.jrny_days > 14)
       			fpg_cnt = 14 - $scope.arr_dt.getDay();
       		else
       			fpg_cnt = $scope.jrny_days;

       	if($scope.jrny_days - fpg_cnt - ($scope.m_page - 1) * 14 <= 0)
			return;

		$scope.m_offset = fpg_cnt + ($scope.m_page - 1) * 14;
		$scope.m_off_date.setDate($scope.m_off_date.getDate() + $scope.m_cur_cnt);

       	if(fpg_cnt + ($scope.m_page - 1) * 14 < $scope.jrny_days) {
       		if($scope.jrny_days - fpg_cnt - ($scope.m_page - 1) * 14 <= 14)
       			$scope.m_cur_cnt = $scope.jrny_days - fpg_cnt - ($scope.m_page - 1) * 14;
       		else
       			$scope.m_cur_cnt = 14;
       	}

		$scope.m_page++;
	};

	$scope.go_prev = function() {

		if($scope.m_page == 1)
			return;

		var fpg_cnt;
		if($scope.arr_dt.getDay() + $scope.jrny_days > 14)
       			fpg_cnt = 14 - $scope.arr_dt.getDay();
       		else
       			fpg_cnt = $scope.jrny_days;

		if($scope.m_page == 2)
			$scope.m_offset = 0;
		else
       		$scope.m_offset = fpg_cnt + ($scope.m_page - 3) * 14;

       	if($scope.m_page == 2) {
       		$scope.m_cur_cnt = fpg_cnt;
       		$scope.m_off_date = new Date($scope.arr_dt.getFullYear(), $scope.arr_dt.getMonth(), $scope.arr_dt.getDate(), 0, 0, 0, 0);
       	}
       	else {
       		$scope.m_off_date.setDate($scope.m_off_date.getDate() - 14);
       		$scope.m_cur_cnt = 14;
       	}

		$scope.m_page--;
	};

	$scope.send_msg = function() {

		var dt = new Date();
		if($scope.m_msg == "")
			return;

		$http.post('/api/message/send', {semail:$scope.getCurrentUser().email, remail:$stateParams.id, ct:$scope.m_msg, dt:dt, ic:"1"}).
		  success(function(data, status, headers, config) { 
		  }).
		  error(function(data, status, headers, config) {
		  });
	};

	$scope.get_msg = function() {
		$http.get('/api/message/chat_inbox/' + $stateParams.id).
	      success(function(data, status, headers, config) {
	      	if(data.result != undefined) {
	      		$scope.m_messages = [];
		      	return;
		      }

	        var month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	       	
	       	var prev_sender = "";
	       	var flag = 0;
	       	var msg_cnt = 1;

	        data.forEach(function(msg) {
	        	
	        	if(prev_sender != msg.sender) {
	        		flag++;
	        		msg.isnext = flag % 2;
	        	}
	        	else
	        		msg.isnext = flag % 2;

	        	msg.mdate = month_name[parseInt(msg.mdate.substr(5,2)) - 1] + " " + msg.mdate.substr(8,2) + " " + msg.mdate.substr(11,2) + ":" + msg.mdate.substr(14,2);
	        	$http.get('/api/user_review/get_user_detail/' + msg.sender).
			      success(function(data, status, headers, config) { 
			        msg.firstName = data.firstName;
			        msg.lastName = data.lastName;
			        msg.photoUrl = data.photoUrl;
			      }).
			      error(function(data, status, headers, config) {
			      });
			      prev_sender = msg.sender;

			      if(msg_cnt > $scope.m_messages.length) {
			      	$scope.m_messages.push(msg);
			      }

				  msg_cnt++;
	        	
	        });	        

	        chat_thread_id = setTimeout($scope.get_msg, 3000);	   



	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.set_scroll_position = function() {
		var objDiv = document.getElementById("div_chat_box");
		objDiv.scrollTop = objDiv.scrollHeight;
	};


	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.approve_itinerary = function() {
		$http.get('/api/traveler_survey/approve_itinerary/' + $stateParams.id).
			success(function(data, status, headers, config) { 
				$scope.m_builder.isaccept = "2";
			}).
			error(function(data, status, headers, config) {
	    });
	};

	$scope.fgo_traveler_itinerary = function(a, b) {
		location.href = "/itinerary-view/" + a + "/" + b;
	}
	$scope.get_builder = function() {

		$http.get('/api/traveler_survey/get_itinerary/' + $stateParams.id).
	      success(function(data, status, headers, config) { 

	      	if(data.Result == undefined)
	        	$scope.m_builder = data;
	        else
	        	return;

       		$scope.arr_dt = new Date($scope.m_builder.basic.arrival_date);
       		$scope.dep_dt = new Date($scope.m_builder.basic.departure_date);

       		var arr_tmp_dt = $scope.arr_dt;
       		var dep_tmp_dt = $scope.dep_dt;

       		arr_tmp_dt.setHours(0); arr_tmp_dt.setMinutes(0); arr_tmp_dt.setSeconds(0);
       		dep_tmp_dt.setHours(0); dep_tmp_dt.setMinutes(0); dep_tmp_dt.setSeconds(0);

       		$scope.m_off_date = new Date($scope.arr_dt.getFullYear(), $scope.arr_dt.getMonth(), $scope.arr_dt.getDate(), 0, 0, 0, 0);
       		
       		$scope.jrny_days = (dep_tmp_dt - arr_tmp_dt) / (3600 * 24 * 1000) + 1;

       		$scope.m_itinerary = new Array($scope.jrny_days);
       		for(var i = 0; i < $scope.jrny_days; i++)
       			$scope.m_itinerary[i] = [];

       		if($scope.arr_dt.getDay() + $scope.jrny_days > 14)
       			$scope.m_cur_cnt = 14 - $scope.arr_dt.getDay();
       		else
       			$scope.m_cur_cnt = $scope.jrny_days;

       		$http.post('/api/activity/get_activity', {iid: $stateParams.id, adt:''}).
	      		success(function(data, status, headers, config) { 
		      		data.forEach(function(act) {
		      			if(act.adate != undefined) {
			      		 	for(var i = 0; i < $scope.jrny_days; i++) {
				       			var tmp_dt = new Date(arr_tmp_dt.getFullYear(), arr_tmp_dt.getMonth(), arr_tmp_dt.getDate(), 0, 0, 0, 0);
				       			tmp_dt.setDate(tmp_dt.getDate() + i);

				       			var str_dt = tmp_dt.getFullYear() + "-";
				       			if(tmp_dt.getMonth() <= 8)
				       				str_dt = str_dt + "0" + (tmp_dt.getMonth() + 1);
				       			else
				       				str_dt = str_dt + (tmp_dt.getMonth() + 1);

				       			str_dt = str_dt + "-";
				       			if(tmp_dt.getDate() <= 9)
				       				str_dt = str_dt + "0" + (tmp_dt.getDate());
				       			else
				       				str_dt = str_dt + (tmp_dt.getDate());
				       			if(act.adate.substr(0, 10) == str_dt) {
			      		 			$scope.m_itinerary[i].push(act);
			      		 		}
			      		 	}
			      		 }
		      		 });
			      }).
			      error(function(data, status, headers, config) {
			      });
       		
       		$scope.m_builder.str_period = $scope.week_name[$scope.arr_dt.getDay()] + ", " + $scope.month_name[$scope.arr_dt.getMonth()].substr(0, 3) + " " + $scope.arr_dt.getDate() + " - " + 
       							$scope.week_name[$scope.dep_dt.getDay()] + ", " + $scope.month_name[$scope.dep_dt.getMonth()].substr(0, 3) + " " + $scope.dep_dt.getDate();


		     $http.get('/api/user_review/get_user_detail_by_id/' + $scope.m_builder.local).
		      success(function(data, status, headers, config) { 

		        $scope.m_head_title = "Your Itinerary for (" + data.homeTown.formatted_address + ")";

		      }).
		      error(function(data, status, headers, config) {
		      });
	        
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {
        $scope.get_builder();
        $scope.get_msg();
    });

	
});