'use strict';

angular.module('jrnyApp').controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.registerTraveler = function (form) {
        $scope.submitted = true;

        if (form.$valid) {
            Auth.createUser({
                    firstName: $scope.user.firstName,
                    lastName: $scope.user.lastName,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    /*homeTown: $scope.user.homeTown['formatted_address'],*/
                    homeTown: $scope.user.homeTown,
                    local: {
                        active: 'true',
                    }
                })
                .then(function () {
                    // Account created, redirect to home
                    $location.path('/dashboard');
                })
                .catch(function (err) {
                    err = err.data;
                    $scope.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        }
    };

    $scope.registerLocal = function (form) {
        $scope.submitted = true;

        if (form.$valid) {
            Auth.createUser({
                    firstName: $scope.user.firstName,
                    lastName: $scope.user.lastName,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    homeTown: $scope.user.homeTown,
                    /*homeTown: $scope.user.homeTown['formatted_address'],*/
                    local: {
                        active: 'false',
                    }
                })
                .then(function () {
                    // Account created, redirect to local Signup
                    $location.path('/local-signup');
                })
                .catch(function (err) {
                    err = err.data;
                    $scope.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        }
    };

    $scope.loginOauth = function (provider) {
        $window.location.href = '/auth/' + provider;
    };
});
