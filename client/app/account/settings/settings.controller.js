'use strict';

angular.module('jrnyApp')
    .controller('SettingsCtrl', function ($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.message = 'Password successfully changed.';
                        toastr.success('Password successfully changed.', 'Saved!')
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
    });