'use strict';

angular.module('jrnyApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.searchUser = ''; // set the default search/filter term

        // Use the User $resource to fetch all users
        $scope.users = User.query();

        $scope.edit = function (user) {
            User.query({
                id: user._id
            });
            location.href = "/user-details/" + user._id;
        };

        $scope.confirmDelete = function (user) {
            var txt;
            var r = confirm("Are you sure you want to delete this user");
            if (r == true) {
                User.remove({
                    id: user._id
                });
                angular.forEach($scope.users, function (u, i) {
                    if (u === user) {
                        $scope.users.splice(i, 1);
                    }
                });
            }
        }


    });