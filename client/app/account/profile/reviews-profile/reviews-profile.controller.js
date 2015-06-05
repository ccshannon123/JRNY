'use strict';

angular.module('jrnyApp').controller('reviewsProfileCtrl', function ($scope, $http, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.users = {};
	$scope.sent_reviews = {};
	$scope.received_reviews = {};
	$scope.total_review = 0;
	$scope.avg_review_int = 0;
	$scope.avg_review_org = 0.0;

	$scope.m_alert_box = false;
	$scope.m_alert_text = "";

	$scope.m_rate = 0;

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};


	$scope.get_user = function() {
		$http.get('/api/user_review/get_user/' + $scope.getCurrentUser().email).
	      success(function(data, status, headers, config) { 
	        $scope.users = data;
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.get_review = function(tp) {
		var month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

		$http.post('/api/user_review/get_review', {email:$scope.getCurrentUser().email, ptype:tp}).
	      success(function(data, status, headers, config) { 
	        if(tp == 1) {
	        	if(data.result != undefined)
			      		return;

	        	$scope.sent_reviews = data;        	

	        	$scope.sent_reviews.forEach(function(review) {
			      	

		        	review.description = review.description.replace("\n", "<br />");
		        	review.rdate = month_name[parseInt(review.rdate.substr(5,2)) - 1] + " " + review.rdate.substr(0,4);

		        	$http.get('/api/user_review/get_user_detail/' + review.receiver).
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
		    }
		    if(tp == 2) {

		    	if(data.result != undefined)
			      		return;

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
				        review.uid = data._id;

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

	$scope.add_review = function(rt, de, em) {
		if(rt == $scope.m_rate) {
			$scope.m_alert_box = true;
			$scope.m_alert_text = "Please select star rating 1-5.";
			return;
		}
		var dt = new Date();
		var review_date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
		$http.post('/api/user_review/add_review', {sender:$scope.getCurrentUser().email, receiver:em, rate:$scope.m_rate, desc:de, rdate:review_date}).
          success(function(data, status, headers, config) {
          	$scope.m_alert_box = true;
			$scope.m_alert_text = "Successfully review added.";
          	$scope.get_review(1);
          }).
          error(function(data, status, headers, config) {
          });
	};

	$(".rating-tooltip").change(function(){
		//alert(jQuery(this).val());
		$scope.m_rate = jQuery(this).val();
	});

	angular.element(document).ready(function () {

	    $scope.$watch(function(scope){return scope.getCurrentUser().email}, function(){
	      if($scope.getCurrentUser().email!=undefined){
	        $scope.get_user();
			$scope.get_review(1);
			$scope.get_review(2);
	      }
	    })
	});

});
