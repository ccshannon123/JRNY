'use strict';

angular.module('jrnyApp').controller('localSignupCtrl', function ($scope, User, $location, Auth) {

    $scope.errors = {};

    $scope.localApplication = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Auth.localApplication($scope.user.Gender)
                .then(function () {
                    $scope.message = 'Password successfully changed.';
                    console.log('Saved');
                })
                .catch(function () {
                    //form.password.$setValidity('mongoose', false);
                    $scope.errors.other = 'Incorrect password';
                    $scope.message = '';
                });
        }
    };

});