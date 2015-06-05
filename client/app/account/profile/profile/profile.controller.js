'use strict';

angular.module('jrnyApp').controller('profileCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.received_reviews = {};
	$scope.total_review = 0;
	$scope.avg_review_int = 0;
	$scope.avg_review_org = 0.0;

	$scope.m_user_detail = {};
	$scope.m_user_email = "";

	
	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};
	
	$scope.abc = function() {

		$http.get('/api/user_review/set_local/' + $scope.m_user_detail.email).
		success(function(data, status, headers, config) { 
		}).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.get_review = function(tp) {
		var month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		$http.get('/api/user_review/get_user_detail_by_id/' + $stateParams.id).
	      success(function(data, status, headers, config) { 
	        $scope.m_user_detail = data;

	        $scope.m_user_email = data.email;

	        $http.post('/api/user_review/get_review', {email:$scope.m_user_email, ptype:tp}).
		      success(function(data, status, headers, config) { 	        
			    if(tp == 2) {

			    	if(data.result == undefined) {
					    $scope.received_reviews = data;

				    	$scope.received_reviews.forEach(function(review) {

				        	review.description = review.description.replace("\n", "<br />");
				        	review.rdate = review.rdate.substr(8,2) + "/" + review.rdate.substr(5,2) + "/" + review.rdate.substr(0,4);

				        	$scope.total_review += eval(review.review);

				        	$http.get('/api/user_review/get_user_detail/' + review.sender).
						      success(function(data, status, headers, config) { 

						        review.firstName = data.firstName;
						        review.lastName = data.lastName;
						        review.provider = data.provider;
						        review.photoUrl = data.photoUrl;
						        review.uid = data._id;

						      }).
						      error(function(data, status, headers, config) {
						      });
				        	
				        });
				        $scope.avg_review_org = parseInt(($scope.total_review / $scope.received_reviews.length) * 10) / 10;
				        $scope.avg_review_int = parseInt($scope.avg_review_org);
					}
					else {
				    	$scope.avg_review_org = 0;
				    	$scope.avg_review_int = 0;
				    }

			    	
			    }

			  }).
		      error(function(data, status, headers, config) {
		      });
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {
		$scope.get_review(2);
    });

});