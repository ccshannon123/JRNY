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
	$scope.bFromAdd = 0;

	$scope.m_cat = "";
	$scope.m_rev = "";

	$scope.m_favorites = [];

	$scope.m_head_title = "Your Favorites";

	$scope.getNumber = function(num) {
		num = eval(num);
	    return new Array(num);   
	};

	$scope.getInteger = function(num) {
		return parseInt(num);
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

	$scope.fgo_add = function(url, pid) {
		location.href = url + $stateParams.iid + "/" + $stateParams.date + "/" + pid;
	};

	$scope.get_favorite = function() {
		var rev = document.getElementById("txt_review").value;
		var cat = document.getElementById("txt_cat").value;
		$http.get('/api/favorite/get_favorite/' + $scope.getCurrentUser()._id).
	      success(function(data, status, headers, config) {
	      		$scope.m_favorites = [];
	      		data.forEach(function(fav) {
	      			var flg = 0;
	      			for(var i = 0; i < fav.place.types.length; i++) {
	      				if(fav.place.types[i].toLowerCase() == cat.toLowerCase()) {
	      					flg = 1;
	      					break;
	      				}
	      			}
	      			if((rev == "" || parseInt(rev) <= fav.place.rating) && (cat == "" || flg == 1))
	      			{
		      			var pnt = fav.place.opening_hours.weekday_text[0].indexOf(":");	      			
		      			fav.place.opening_hours.weekday_text[0] = fav.place.opening_hours.weekday_text[0].substr(pnt + 2, fav.place.opening_hours.weekday_text[0].length - pnt - 2);
		      			$scope.m_favorites.push(fav);
		      		}
	      		});
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
		$http.post('/api/favorite/add_favorite', {nm: $scope.m_name, ca: $scope.m_category, lo: $scope.m_location, ph: $scope.m_phone, we: $scope.m_website, uid: $scope.getCurrentUser()._id, place: sel_place}).
	      success(function(data, status, headers, config) { 
	      	$scope.get_favorite();
	      }).
	      error(function(data, status, headers, config) {
	      });
	};

	angular.element(document).ready(function () {
		if($stateParams.category != "") {
			if($stateParams.category[0] == "_") {
				$scope.bFromAdd = 1;
				$scope.m_category = $stateParams.category.substr(1, $stateParams.category.length - 1);
			}
			else
				$scope.m_category = $stateParams.category;
		}
		$scope.get_favorite();
    });

	
});