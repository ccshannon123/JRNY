'use strict';

angular.module('jrnyApp')
    .controller('jrnybasicsCtrl', function ($scope, $http, $stateParams, $location, User, Auth) {
    	$scope.m_head_title = "Jrny Basics";
    	  $scope.open = function($event) {
    	  	alert('d');
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened = true;
		  };
    });