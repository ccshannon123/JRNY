'use strict';

angular.module('jrnyApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User) {

        // Use the User $resource to fetch all users
        $scope.users = User.query();

        $scope.delete = function (user) {
            User.remove({
                id: user._id
            });
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        };

        $scope.edit = function (user) {
            User.query({
                id: user._id
            });
            location.href = "/user-details/" + user._id;
        };


        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.searchFish = ''; // set the default search/filter term

        // create the list of sushi rolls 
        $scope.sushi = [
            {
                name: 'Cali Roll',
                fish: 'Crab',
                tastiness: 2
            },
            {
                name: 'Philly',
                fish: 'Tuna',
                tastiness: 4
            },
            {
                name: 'Tiger',
                fish: 'Eel',
                tastiness: 7
            },
            {
                name: 'Rainbow',
                fish: 'Variety',
                tastiness: 6
            }
  ];


    });