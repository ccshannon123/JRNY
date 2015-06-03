'use strict';

angular.module('jrnyApp').controller('localsearchCtrl', function ($scope, $http, $location, Auth) {

	$scope.getCurrentUser = Auth.getCurrentUser;
	
	$scope.month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

	$scope.m_local_list = {};

	$scope.showProfile = function (em) {
        location.href = "/profile/" + em;
    };

    $scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

    $scope.get_local = function() {
		$http.get('/api/user_review/get_local').
		//$http.get('/api/user_review/get_user/1').
	      success(function(data, status, headers, config) { 

	        $scope.m_local_list = data;

	        $scope.m_local_list.forEach(function(local) {

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