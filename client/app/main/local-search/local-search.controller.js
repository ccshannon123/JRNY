'use strict';

angular.module('jrnyApp').controller('localsearchCtrl', function ($scope, $http, $location, Auth) {

	$scope.getCurrentUser = Auth.getCurrentUser;
	
	$scope.month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	$scope.languageList = ['English', 'Arabic', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Korean', 'Mandarin', 'Portuguese', 'Russian', 'Spanish', 'Other'];
	$scope.ageList = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,42, 43, 44, 45];

	$scope.m_local_list = {};

	$scope.m_gender = "";
	$scope.m_age = "";
	$scope.m_lang = "";
	$scope.m_review = "";

	$scope.showProfile = function (em) {
        location.href = "/profile/" + em;
    };

    $scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

    $scope.get_local = function() {

    	$scope.m_gender = document.getElementById("txt_gen").value;
    	$scope.m_review = document.getElementById("txt_review").value;
    	$scope.m_age = document.getElementById("txt_age").value;

		$http.get('/api/user_review/get_local').
		//$http.get('/api/user_review/get_user/1').
	      success(function(data, status, headers, config) { 

	      	$scope.m_local_list = [];
	      	var tmp_list = data;

	        tmp_list.forEach(function(local) {

		        $http.post('/api/user_review/get_review', {email:local.email, ptype:2}).
			      success(function(data, status, headers, config) { 

				      	var total_review = 0;

				      	if(data.result == undefined) {
						    data.forEach(function(review) {

					        	total_review += eval(review.review);		        	
					        	
					        });

					        local.avg_review_org = parseInt((total_review / data.length) * 10) / 10;
					        local.avg_review_int = parseInt(local.avg_review_org);
						}
						else {
					    	local.avg_review_org = 0;
					    	local.avg_review_int = 0;
					    }
					    if($scope.m_gender == "" || $scope.m_gender == local.gender) {
					    	if($scope.m_age == "" || $scope.m_age != "") {
					    		if($scope.m_review == "" || parseInt($scope.m_review) <= local.avg_review_org) {
					    			$scope.m_local_list.push(local);
					    		}
					    	}
					    }


				  }).
			      error(function(data, status, headers, config) {
			      });
			  });

	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.get_local();
});