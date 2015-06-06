'use strict';

angular.module('jrnyApp').controller('editProfileCtrl', function ($scope, User) {
	$scope.setPlace = function() {
		alert('d');
	 /*var request = {
	    location: map.getCenter(),
	    radius: '500',
	    query: $scope.m_favorite
	  };

	  var service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, function(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	        var marker = new google.maps.Marker({
	          map: map,
	          place: {
	            placeId: results[0].place_id,
	            location: results[0].geometry.location
	          }
	        });
	        $scope.m_place = results[0];
	        map.setCenter(new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F));
	    }

	  });*/

	};
});
