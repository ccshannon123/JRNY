'use strict';

angular.module('jrnyApp').controller('usersettingCtrl', function ($scope, $http, $location, Auth, User) {
	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.m_country = "";  
  $scope.m_head_title = "Account";

    var user_obj = $scope.getCurrentUser();
    $scope.uemail = user_obj.email;
    $scope.uid = user_obj._id;

    $scope.logout = function () {
        Auth.logout();
        $location.path('/login');
    };

	$scope.noti_get = function() {
        $http.get('/api/user_account/' + $scope.uemail).
          success(function(data, status, headers, config) { 
            $scope.m_country = data.country_residence;

          }).
          error(function(data, status, headers, config) {
            alert(error);
          });
    };

    $scope.cancel_account = function() {
    	//var obj = {email:$scope.getCurrentUser().email, rmft:$scope.m_rmft,or:$scope.m_or,rrft:$scope.m_rrft,cmma:$scope.m_cmma,tu:$scope.m_tu,tm:$scope.m_tm,gu:$scope.m_gu,rrr:$scope.m_rrr};
        var r = confirm("Are you sure to cancel your account?");
	    if (r == true) {
	        $http.delete('/api/user_account/' + $scope.uemail).
	          success(function(data, status, headers, config) {
	          }).
	          error(function(data, status, headers, config) {
	          });
	          $scope.logout();
	    } else {
	        
	    }
	    
        
    };

    $scope.noti_update = function() {
        $http.post('/api/user_account', {ptype:2, email:$scope.uemail, cr:$scope.m_country}).
          success(function(data, status, headers, config) {
          }).
          error(function(data, status, headers, config) {
          });
    };

        

    angular.element(document).ready(function () {

    $scope.$watch(function(scope){return scope.getCurrentUser().email}, function(){
      if($scope.getCurrentUser().email!=undefined){
          $scope.noti_get();
      }
    })
    });
});
