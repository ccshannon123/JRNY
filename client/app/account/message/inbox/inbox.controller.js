'use strict';

angular.module('jrnyApp')
    .controller('inboxCtrl', function ($scope, $http, Auth, User) {
    	$scope.getCurrentUser = Auth.getCurrentUser;
    	$scope.m_messages = {};

    	$scope.m_chb = {};
    	$scope.m_chb_all = false;
    	$scope.m_list_detail = 0;
    	$scope.m_detail_msg = {};
    	$scope.m_keyword = "";

    	$scope.write_mail = function() {
    		location.href = "/message_write/new";
    	};

    	$scope.delete_mail = function() {
    		var mids = "";

    		if($scope.m_list_detail == 0) {
		        for(var i = 0; i < $scope.m_messages.length; i++) {
		        	if($scope.m_chb[i] == true) {
		        		mids += $scope.m_messages[i]._id + ',';
		        	}
		        }
		    }
		    else if($scope.m_list_detail == 1)
		    	mids = $scope.m_detail_msg._id + ',';

	        if(mids == "") {
	        	return;
	        }

    		$http.get('/api/message/rdelete/' + mids).
		      success(function(data, status, headers, config) { 
		      		$scope.get_inbox();
		      }).
		      error(function(data, status, headers, config) {
		      });
    	};

    	$scope.chb_all = function() {
	        for(var i = 0; i < $scope.m_messages.length; i++) {
	        	$scope.m_chb[i] = $scope.m_chb_all;
	        }
    	};

    	$scope.search = function() {
    		$scope.m_list_detail = 0;
			$http.post('/api/message/rsearch', {email: $scope.getCurrentUser().email, kwd: $scope.m_keyword}).
		      success(function(data, status, headers, config) {
		      	if(data.result != undefined) {
		      		$scope.m_messages = {};
			      	return;
			      }

		        $scope.m_messages = data;
		        var month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		        for(var i = 0; i < $scope.m_messages.length; i++) {
		        	$scope.m_chb[i] = false;
		        }

		        $scope.m_messages.forEach(function(msg) {
		        	msg.mdate = month_name[parseInt(msg.mdate.substr(5,2)) - 1] + " " + msg.mdate.substr(8,2);

		        	$http.get('/api/user_review/get_user_detail/' + msg.sender).
				      success(function(data, status, headers, config) { 
				        msg.firstName = data.firstName;
				        msg.lastName = data.lastName;
				      }).
				      error(function(data, status, headers, config) {
				      });
		        	
		        });

		      }).
		      error(function(data, status, headers, config) {
		      });
		};

    	$scope.get_inbox = function() {
    		$scope.m_list_detail = 0;
			$http.get('/api/message/inbox/' + $scope.getCurrentUser().email).
		      success(function(data, status, headers, config) {
		      	if(data.result != undefined) {
		      		$scope.m_messages = {};
			      	return;
			      }


		        $scope.m_messages = data;
		        var month_name = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		        for(var i = 0; i < $scope.m_messages.length; i++) {
		        	$scope.m_chb[i] = false;
		        }

		        $scope.m_messages.forEach(function(msg) {
		        	msg.mdate = month_name[parseInt(msg.mdate.substr(5,2)) - 1] + " " + msg.mdate.substr(8,2);

		        	$http.get('/api/user_review/get_user_detail/' + msg.sender).
				      success(function(data, status, headers, config) { 
				        msg.firstName = data.firstName;
				        msg.lastName = data.lastName;
				      }).
				      error(function(data, status, headers, config) {
				      });
		        	
		        });

		      }).
		      error(function(data, status, headers, config) {
		      });
		};

		$scope.show_msg = function(mid, idx) {

			$scope.m_list_detail = 1;
			$scope.m_detail_msg = $scope.m_messages[idx];
		     $scope.m_detail_msg.content = $scope.m_detail_msg.content.replace("\n", "<br />");

			$http.get('/api/message/show/' + mid).
		      success(function(data, status, headers, config) {

		      }).
		      error(function(data, status, headers, config) {
		      });
		}

		$scope.freset = function() {			
			$http.get('/api/message/mreset').
		      success(function(data, status, headers, config) {

		      }).
		      error(function(data, status, headers, config) {
		      });
		};

		angular.element(document).ready(function () {

		
	    $scope.$watch(function(scope){return scope.getCurrentUser().email}, function(){
	      if($scope.getCurrentUser().email!=undefined){
	          $scope.get_inbox();
	      }
	    })
	    });

    });