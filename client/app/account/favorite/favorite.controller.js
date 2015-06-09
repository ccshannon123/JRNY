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
	//$scope.m_search = document.getElementById("txtsearch").value;

	 var request = {
	    location: {lat: 39.7392358, lng: -104.990251},
	    radius: '500',
	    query: $scope.m_search //ChIJY8CFChN6bIcRyOnj17695ow 
	  };
	  var service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, function(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	         var request1 = {
			    placeId: results[0].place_id
			    //
			  };

			  var service1 = new google.maps.places.PlacesService(map);

			  service1.getDetails(request1, function(place, status) {
			    if (status == google.maps.places.PlacesServiceStatus.OK) {
			    	$scope.m_name = $scope.m_search;
			    	$scope.m_phone = place.formatted_phone_number;
			    	$scope.m_website = place.website;
			    	$scope.m_location = place.formatted_address;
			    	$scope.add_favorite();
			    }
			  });
	    }

	  });

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