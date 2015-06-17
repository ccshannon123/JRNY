'use strict';

angular.module('jrnyApp')
    .controller('favoriteCtrl', function ($scope, $http, $stateParams, Auth, User) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	
	$scope.m_category = "Restaurant";
	$scope.m_name = "";
	$scope.m_location = "";
	$scope.m_phone = "";
	$scope.m_website = "";

	$scope.m_search = "";

	$scope.m_favorites = [];

	$scope.m_head_title = "Your Favorites";

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.setPlace = function() {
	
    	$scope.m_name = sel_place.name;
    	$scope.m_phone = sel_place.formatted_phone_number;
    	$scope.m_website = sel_place.website;
    	$scope.m_location = sel_place.formatted_address;
    	//alert(JSON.stringify(sel_place));
    	$scope.add_favorite();
    	//document.getElementById("abc").innerHTML = JSON.stringify(place);	
	};

	$scope.get_favorite = function() {
		$http.get('/api/favorite/get_favorite/' + $scope.getCurrentUser()._id).
	      success(function(data, status, headers, config) {
	      		$scope.m_favorites = data;
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.remove_favorite = function(idx) {
		$http.get('/api/favorite/remove_favorite/' + idx).
	      success(function(data, status, headers, config) {
	      		$scope.get_favorite();
	      }).
	      error(function(data, status, headers, config) {
	      });
	};	

	$scope.edit_favorite = function(nm, lo, ph, we, ca, id) {
		if(nm == "") {
			alert("Please input name.");
			return;
		}
		if(ph == "") {
			alert("Please input phone.");
			return;
		}
		if(we == "") {
			alert("Please input website.");
			return;
		}
		if(lo == "") {
			alert("Please input location.");
			return;
		}
		$http.post('/api/favorite/edit_favorite', {nm: nm, ca: ca, lo: lo, ph: ph, we: we, id: id}).
	      success(function(data, status, headers, config) { 
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	$scope.add_favorite = function() {
		$http.post('/api/favorite/add_favorite', {nm: $scope.m_name, ca: $scope.m_category, lo: $scope.m_location, ph: $scope.m_phone, we: $scope.m_website, uid: $scope.getCurrentUser()._id}).
	      success(function(data, status, headers, config) { 
	      	$scope.m_phone = "";
	      	$scope.m_website = "";
	      	$scope.m_location = "";
	      	$scope.get_favorite();
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {
		if($stateParams.category != "")
			$scope.m_category = $stateParams.category;
		$scope.get_favorite();
    });

	
});