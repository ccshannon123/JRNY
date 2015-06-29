'use strict';

angular.module('jrnyApp')
    .controller('userDetailsCtrl', function ($scope, $http, Auth, User) {

        // Use the User $resource to fetch all users
        $scope.user = User.show();


    });