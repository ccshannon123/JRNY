'use strict';

angular.module('jrnyApp').controller('profileCtrl', function ($scope, $http, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.received_reviews = {};
	$scope.total_review = 0;
	$scope.avg_review_int = 0;
	$scope.avg_review_org = 0.0;

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	}
	
	$scope.get_review = function(tp) {
		var month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

		$http.post('/api/user_review/get_review', {email:$scope.getCurrentUser().email, ptype:tp}).
	      success(function(data, status, headers, config) { 	        
		    if(tp == 2) {
		    	$scope.received_reviews = data;

		    	$scope.received_reviews.forEach(function(review) {

		        	review.description = review.description.replace("\n", "<br />");
		        	review.rdate = month_name[parseInt(review.rdate.substr(5,2)) - 1] + " " + review.rdate.substr(0,4);

		        	$scope.total_review += eval(review.review);

		        	$http.get('/api/user_review/get_user_detail/' + review.sender).
				      success(function(data, status, headers, config) { 

				        review.firstName = data.firstName;
				        review.lastName = data.lastName;
				        review.provider = data.provider;
				        review.photoUrl = data.photoUrl;

				      }).
				      error(function(data, status, headers, config) {
				      });
		        	
		        });

		        $scope.avg_review_org = parseInt(($scope.total_review / $scope.received_reviews.length) * 10) / 10;
		        $scope.avg_review_int = parseInt($scope.avg_review_org);
		    }

		  }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {
    	if($scope.getCurrentUser().email == undefined) {
    		location.href = '/profile';
    	}
		$scope.get_review(2);
    });

});