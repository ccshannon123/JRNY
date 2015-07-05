'use strict';

angular.module('jrnyApp')
    .controller('userDetailsCtrl', function ($scope, $http, Auth, User, $stateParams, $filter) {


        $scope.get_user = function () { //{ $query: {receiver: em, rdelete:'0'}, $orderby: { mdate: -1 }}

            $scope.Users = User.query();

            $scope.filterBy = [$stateParams.id];

            $scope.filteredUsers = function () {
                return $scope.Users.filter(function (user) {
                    return $scope.filterBy.indexOf(user._id) !== -1;
                });
            };


        };

        angular.element(document).ready(function () {
            $scope.get_user();
        });
    });